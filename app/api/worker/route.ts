import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/admin";
import { uploadToR2 } from "@/utils/r2";
import { execFile } from "child_process";
import { promisify } from "util";
import { readFile, writeFile, unlink, mkdir } from "fs/promises";
import path from "path";
import os from "os";
import Anthropic from "@anthropic-ai/sdk";

const execFileAsync = promisify(execFile);

export const maxDuration = 300; // 5 minutes

interface ClipResult {
  title: string;
  hook_text: string;
  start_time: number;
  end_time: number;
  virality_score: number;
  r2_key?: string;
}

export async function POST(request: NextRequest) {
  // Auth: verify bearer token matches worker secret
  const authHeader = request.headers.get("authorization");
  const expectedSecret = process.env.WORKER_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!authHeader || authHeader !== `Bearer ${expectedSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { job_id } = await request.json();

  const admin = createAdminClient();
  const tmpDir = path.join(os.tmpdir(), `viralcut-${job_id}`);
  await mkdir(tmpDir, { recursive: true });

  try {
    // Get job info
    const { data: job } = await admin
      .from("jobs")
      .select("*")
      .eq("id", job_id)
      .single();

    if (!job || job.status !== "pending") {
      return NextResponse.json({ error: "Invalid job" }, { status: 400 });
    }

    // Get user plan for watermark decision
    const { data: plan } = await admin
      .from("user_plans")
      .select("plan")
      .eq("user_id", job.user_id)
      .single();
    const needsWatermark = !plan || plan.plan === "free";

    // ── STEP 1: Download video ──
    await updateStatus(admin, job_id, "downloading");
    const videoPath = path.join(tmpDir, "input.mp4");

    if (job.source_type === "url") {
      // Find yt-dlp: check local binary first, then PATH
      const localYtdlp = path.join(process.cwd(), "yt-dlp");
      let ytdlpBin = "yt-dlp";
      try {
        const { accessSync } = require("fs");
        accessSync(localYtdlp);
        ytdlpBin = localYtdlp;
      } catch {
        // fall back to PATH
      }

      // Update yt-dlp before each run to stay ahead of YouTube's bot detection
      try {
        await execFileAsync(ytdlpBin, ["-U"], { timeout: 30000 });
      } catch {}

      await execFileAsync(ytdlpBin, [
        "--js-runtimes", "node",
        "--extractor-args", "youtube:player_client=web,mweb",
        "-f", "bestvideo[height<=1080]+bestaudio/best[height<=1080]",
        "--merge-output-format", "mp4",
        "-o", videoPath,
        "--no-playlist",
        "--max-filesize", "2G",
        job.source_url,
      ], { timeout: 120000 });
    } else {
      // Download from R2
      const { S3Client, GetObjectCommand } = await import("@aws-sdk/client-s3");
      const r2 = new S3Client({
        region: "auto",
        endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID!,
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
        },
      });
      const resp = await r2.send(new GetObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: job.source_r2_key,
      }));
      const chunks: Uint8Array[] = [];
      const stream = resp.Body as AsyncIterable<Uint8Array>;
      for await (const chunk of stream) {
        chunks.push(chunk);
      }
      await writeFile(videoPath, Buffer.concat(chunks));
    }

    // Get video duration
    const { stdout: durationOut } = await execFileAsync("ffprobe", [
      "-v", "error", "-show_entries", "format=duration",
      "-of", "default=noprint_wrappers=1:nokey=1", videoPath,
    ]);
    const durationSec = Math.round(parseFloat(durationOut.trim()));
    await admin.from("jobs").update({ duration_seconds: durationSec }).eq("id", job_id);

    // ── STEP 2: Extract audio ──
    await updateStatus(admin, job_id, "transcribing");
    const audioPath = path.join(tmpDir, "audio.wav");
    await execFileAsync("ffmpeg", [
      "-i", videoPath, "-vn", "-ar", "16000", "-ac", "1", "-f", "wav", audioPath,
    ], { timeout: 60000 });

    // ── STEP 3: Transcribe with Deepgram ──
    const audioBuffer = await readFile(audioPath);
    const dgResponse = await fetch("https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true&diarize=true&punctuate=true&utterances=true", {
      method: "POST",
      headers: {
        "Authorization": `Token ${process.env.DEEPGRAM_API_KEY}`,
        "Content-Type": "audio/wav",
      },
      body: audioBuffer,
    });

    if (!dgResponse.ok) {
      throw new Error(`Deepgram error: ${dgResponse.status} ${await dgResponse.text()}`);
    }

    const dgResult = await dgResponse.json();
    const words = dgResult.results?.channels?.[0]?.alternatives?.[0]?.words || [];
    const transcript = dgResult.results?.channels?.[0]?.alternatives?.[0]?.transcript || "";

    if (!transcript || transcript.length < 50) {
      throw new Error("Transcript too short or empty. Video may not contain speech.");
    }

    // ── STEP 4: Find viral clips with Claude ──
    await updateStatus(admin, job_id, "analyzing");
    const anthropic = new Anthropic();

    // Build transcript with timestamps
    const formattedTranscript = words.reduce((acc: string, w: { word: string; start: number; end: number; speaker?: number }, i: number) => {
      const timestamp = `[${formatTime(w.start)}]`;
      const speakerChange = i > 0 && w.speaker !== words[i - 1].speaker;
      const prefix = speakerChange ? `\n\nSpeaker ${w.speaker}: ${timestamp} ` : (i === 0 ? `Speaker ${w.speaker || 0}: ${timestamp} ` : " ");
      return acc + prefix + w.word;
    }, "");

    // Determine ideal clip length based on video duration
    const isShortVideo = durationSec <= 120;
    const clipGuidance = isShortVideo
      ? `The video is only ${durationSec} seconds long. Find 1-3 clips (15-${Math.min(60, durationSec)} seconds each). All timestamps MUST be between 0 and ${durationSec}. Do NOT exceed ${durationSec} seconds.`
      : `The video is ${Math.round(durationSec / 60)} minutes long. Find 3-5 clips (30-90 seconds each). All timestamps MUST be between 0 and ${durationSec}.`;

    const clipResponse = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      messages: [
        {
          role: "user",
          content: `Analyze this podcast transcript and find viral clips for TikTok/Instagram Reels. Focus on:
- Strong hooks / cold opens
- Hot takes / controversial opinions
- Emotional peaks / vulnerability
- Funny moments
- Quotable soundbites / aha moments
- Storytelling moments with payoff

${clipGuidance}

Return ONLY a JSON array (no other text) with objects containing:
- "title": catchy 5-8 word title for the clip
- "hook_text": the opening hook text (first sentence)
- "start_time": start time in seconds (number)
- "end_time": end time in seconds (number, MUST NOT exceed ${durationSec})
- "virality_score": 1-10 score of viral potential

Make sure clips don't overlap. Prefer clips that start with a strong hook.

TRANSCRIPT:
${formattedTranscript.slice(0, 30000)}`,
        },
      ],
    });

    const clipText = clipResponse.content[0].type === "text" ? clipResponse.content[0].text : "";
    // Extract JSON array from response
    const jsonMatch = clipText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error("Failed to parse clip suggestions from AI");

    const rawClips: ClipResult[] = JSON.parse(jsonMatch[0]);

    // Validate and clamp timestamps to actual video duration
    const clips = rawClips
      .map(clip => ({
        ...clip,
        start_time: Math.max(0, clip.start_time),
        end_time: Math.min(clip.end_time, durationSec),
      }))
      .filter(clip => (clip.end_time - clip.start_time) >= 10); // Skip clips shorter than 10s

    if (clips.length === 0) {
      throw new Error("No valid clips found. The video may be too short.");
    }

    // ── STEP 5: Generate clips ──
    await updateStatus(admin, job_id, "clipping");

    const processedClips: ClipResult[] = [];

    for (let i = 0; i < clips.length; i++) {
      const clip = clips[i];
      const clipPath = path.join(tmpDir, `clip_${i}.mp4`);
      const finalPath = path.join(tmpDir, `final_${i}.mp4`);

      // 5a. Extract clip segment
      await execFileAsync("ffmpeg", [
        "-ss", String(clip.start_time),
        "-to", String(clip.end_time),
        "-i", videoPath,
        "-c", "copy",
        "-y", clipPath,
      ], { timeout: 30000 });

      // 5b. Get words for this clip's captions
      const clipWords = words.filter(
        (w: { start: number; end: number }) => w.start >= clip.start_time && w.end <= clip.end_time
      );

      // 5c. Crop to 9:16 + burn captions + optional watermark
      // Check if drawtext filter is available (needs freetype — available on Railway/Linux, not always on macOS)
      let hasDrawtext = false;
      try {
        const { stdout: filters } = await execFileAsync("ffmpeg", ["-filters"], { timeout: 5000 });
        hasDrawtext = filters.includes("drawtext");
      } catch {}

      // Detect input aspect ratio to decide crop
      let inputWidth = 1920, inputHeight = 1080;
      try {
        const { stdout: probeOut } = await execFileAsync("ffprobe", [
          "-v", "error", "-select_streams", "v:0",
          "-show_entries", "stream=width,height",
          "-of", "csv=p=0", clipPath,
        ], { timeout: 5000 });
        const [w, h] = probeOut.trim().split(",").map(Number);
        if (w && h) { inputWidth = w; inputHeight = h; }
      } catch {}

      // Only crop if video is wider than 9:16
      const targetRatio = 9 / 16;
      const inputRatio = inputWidth / inputHeight;
      const cropFilter = inputRatio > targetRatio
        ? "crop=ih*9/16:ih"
        : "crop=iw:iw*16/9";
      const filterParts: string[] = [cropFilter];

      if (hasDrawtext) {
        // Build drawtext filters for word-by-word captions (groups of 4 words)
        const WORDS_PER_PHRASE = 4;
        for (let p = 0; p < clipWords.length; p += WORDS_PER_PHRASE) {
          const phraseWords = clipWords.slice(p, p + WORDS_PER_PHRASE);
          const phraseText = phraseWords.map((w: { word: string }) => w.word).join(" ")
            .replace(/\\/g, "\\\\").replace(/'/g, "\u2019").replace(/:/g, "\\:").replace(/%/g, "%%");
          const phraseStart = phraseWords[0].start - clip.start_time;
          const phraseEnd = phraseWords[phraseWords.length - 1].end - clip.start_time;
          filterParts.push(
            `drawtext=text='${phraseText}':fontsize=48:fontcolor=white:borderw=3:bordercolor=black:x=(w-text_w)/2:y=h*0.75:enable='between(t\\,${phraseStart.toFixed(2)}\\,${phraseEnd.toFixed(2)})'`
          );
        }
        if (needsWatermark) {
          filterParts.push(
            "drawtext=text='Made with Clippified':fontsize=18:fontcolor=white@0.5:x=w-tw-20:y=h-th-20"
          );
        }
      }

      // Write filter to file to avoid command line length limits
      const filterScriptPath = path.join(tmpDir, `filter_${i}.txt`);
      await writeFile(filterScriptPath, filterParts.join(",\n"));

      await execFileAsync("ffmpeg", [
        "-i", clipPath,
        "-filter_script:v", filterScriptPath,
        "-c:v", "libx264",
        "-preset", "fast",
        "-crf", "23",
        "-c:a", "aac",
        "-b:a", "128k",
        "-y", finalPath,
      ], { timeout: 120000 });

      // 5d. Upload to R2
      const finalBuffer = await readFile(finalPath);
      const r2Key = `clips/${job.user_id}/${job_id}/clip_${i}.mp4`;
      await uploadToR2(r2Key, finalBuffer, "video/mp4");

      processedClips.push({
        ...clip,
        r2_key: r2Key,
      });
    }

    // ── STEP 6: Update job as completed + track usage ──
    await admin.from("jobs").update({
      status: "completed",
      clips: processedClips,
      completed_at: new Date().toISOString(),
    }).eq("id", job_id);

    // Only count usage on SUCCESS — failed jobs don't consume quota
    const { data: userPlan } = await admin
      .from("user_plans")
      .select("monthly_usage, usage_reset_at")
      .eq("user_id", job.user_id)
      .single();

    const now = new Date();
    const resetAt = userPlan?.usage_reset_at ? new Date(userPlan.usage_reset_at) : null;
    const needsReset = !resetAt || now > resetAt;
    const currentUsage = needsReset ? 0 : (userPlan?.monthly_usage || 0);
    const nextReset = new Date(now);
    nextReset.setMonth(nextReset.getMonth() + 1);
    nextReset.setDate(1);
    nextReset.setHours(0, 0, 0, 0);

    await admin.from("user_plans").upsert({
      user_id: job.user_id,
      monthly_usage: currentUsage + 1,
      usage_reset_at: needsReset ? nextReset.toISOString() : userPlan?.usage_reset_at,
    });

    // Cleanup tmp files
    await cleanup(tmpDir);

    return NextResponse.json({ success: true, clips: processedClips.length });
  } catch (err: unknown) {
    const rawMessage = err instanceof Error ? err.message : "Unknown error";
    console.error(`Job ${job_id} failed:`, rawMessage);

    // Show user-friendly error messages instead of raw command output
    let message = rawMessage;
    if (rawMessage.includes("Sign in to confirm") || rawMessage.includes("not a bot")) {
      message = "This video requires YouTube sign-in and can't be processed. Please try a different video.";
    } else if (rawMessage.includes("Video unavailable") || rawMessage.includes("Private video")) {
      message = "This video is private or unavailable. Please check the URL and try again.";
    } else if (rawMessage.includes("Transcript too short")) {
      message = "This video doesn't contain enough speech to generate clips. Try a video with more talking.";
    } else if (rawMessage.includes("No valid clips found")) {
      message = "The video is too short to generate clips. Try a longer video (at least 1 minute).";
    } else if (rawMessage.includes("ENOENT") || rawMessage.includes("spawn")) {
      message = "A processing error occurred. Please try again or contact support.";
    } else if (rawMessage.length > 200) {
      message = "Something went wrong while processing your video. Please try a different video or contact support.";
    }

    await admin.from("jobs").update({
      status: "failed",
      error: message.slice(0, 500),
    }).eq("id", job_id);

    await cleanup(tmpDir);

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

async function updateStatus(admin: ReturnType<typeof createAdminClient>, jobId: string, status: string) {
  await admin.from("jobs").update({ status }).eq("id", jobId);
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

async function cleanup(dir: string) {
  try {
    const { readdir } = await import("fs/promises");
    const files = await readdir(dir);
    for (const f of files) {
      await unlink(path.join(dir, f)).catch(() => {});
    }
    const { rmdir } = await import("fs/promises");
    await rmdir(dir).catch(() => {});
  } catch {}
}
