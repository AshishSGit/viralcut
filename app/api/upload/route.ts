import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { createAdminClient } from "@/utils/supabase/admin";
import { uploadToR2 } from "@/utils/r2";

export const maxDuration = 120;
export const config = { api: { bodyParser: false } };

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();

  // Check usage limits
  const { data: plan } = await admin
    .from("user_plans")
    .select("plan, monthly_usage, usage_reset_at")
    .eq("user_id", user.id)
    .single();

  const currentPlan = plan?.plan || "free";
  const usage = plan?.monthly_usage || 0;
  const limits: Record<string, number> = { free: 1, pro: 10, unlimited: 999999 };
  const maxVideos = limits[currentPlan] || 1;

  // Reset monthly usage if needed
  const now = new Date();
  const resetAt = plan?.usage_reset_at ? new Date(plan.usage_reset_at) : null;
  const needsReset = !resetAt || now > resetAt;
  const effectiveUsage = needsReset ? 0 : usage;

  if (effectiveUsage >= maxVideos) {
    return NextResponse.json(
      { error: "Monthly limit reached. Upgrade your plan for more videos." },
      { status: 429 }
    );
  }

  // Parse request
  const formData = await request.formData();
  const sourceType = formData.get("source_type") as string; // "url" or "upload"
  const sourceUrl = formData.get("source_url") as string | null;
  const file = formData.get("file") as File | null;
  const includeCaptions = formData.get("include_captions") !== "false"; // default true

  if (sourceType === "url" && !sourceUrl) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  // Validate URL to prevent SSRF
  if (sourceType === "url" && sourceUrl) {
    try {
      const parsed = new URL(sourceUrl);
      const allowedHosts = ["youtube.com", "www.youtube.com", "youtu.be", "m.youtube.com", "tiktok.com", "www.tiktok.com", "vm.tiktok.com"];
      if (!allowedHosts.some(h => parsed.hostname === h || parsed.hostname.endsWith(`.${h}`))) {
        return NextResponse.json({ error: "Only YouTube and TikTok URLs are supported" }, { status: 400 });
      }
      if (parsed.protocol !== "https:") {
        return NextResponse.json({ error: "Only HTTPS URLs are allowed" }, { status: 400 });
      }
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
    }
  }
  if (sourceType === "upload" && !file) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  // Validate file type and size server-side
  if (sourceType === "upload" && file) {
    const allowedTypes = ["video/mp4", "video/quicktime", "video/webm", "video/x-msvideo", "video/x-matroska"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Only video files are allowed (MP4, MOV, WEBM)" }, { status: 400 });
    }
    const maxSize = 2 * 1024 * 1024 * 1024; // 2GB
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File exceeds 2GB limit" }, { status: 413 });
    }
  }

  let sourceR2Key: string | null = null;

  // If file upload, store in R2
  if (sourceType === "upload" && file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 100);
    const key = `uploads/${user.id}/${Date.now()}-${safeName}`;
    await uploadToR2(key, buffer, file.type);
    sourceR2Key = key;
  }

  // Create job in Supabase
  const { data: job, error: jobError } = await admin
    .from("jobs")
    .insert({
      user_id: user.id,
      status: "pending",
      source_type: sourceType,
      source_url: sourceUrl || null,
      source_r2_key: sourceR2Key,
      include_captions: includeCaptions,
    })
    .select("id")
    .single();

  if (jobError || !job) {
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }

  // Usage is tracked in the worker AFTER successful completion
  // This ensures failed jobs don't consume the user's quota

  // Fire worker (fire-and-forget) — use internal secret, never send service role key
  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
  const workerSecret = process.env.WORKER_SECRET;
  if (!workerSecret) {
    console.error("WORKER_SECRET not configured");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }
  fetch(`${baseUrl}/api/worker`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${workerSecret}` },
    body: JSON.stringify({ job_id: job.id }),
  }).catch((err) => console.error("Worker fire failed:", err));

  return NextResponse.json({ job_id: job.id });
}
