"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Scissors,
  Download,
  Loader2,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  TrendingUp,
  Clock,
  Sparkles,
  Wifi,
  Search,
  Film,
  DownloadCloud,
  Play,
} from "lucide-react";

interface Clip {
  title: string;
  hook_text: string;
  start_time: number;
  end_time: number;
  virality_score: number;
  r2_key?: string;
}

interface Job {
  id: string;
  status: string;
  clips: Clip[] | null;
  error: string | null;
  duration_seconds: number | null;
  created_at: string;
  completed_at: string | null;
}

const STATUS_STAGES = [
  { key: "pending", label: "Preparing...", icon: Clock },
  { key: "downloading", label: "Downloading video", icon: Wifi },
  { key: "transcribing", label: "Transcribing audio", icon: Search },
  { key: "analyzing", label: "Finding viral moments", icon: Sparkles },
  { key: "clipping", label: "Creating clips", icon: Film },
  { key: "completed", label: "Done!", icon: CheckCircle2 },
];

export default function JobResultPage() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [downloadingAll, setDownloadingAll] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});
  const [loadingPreview, setLoadingPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const poll = async () => {
      const res = await fetch(`/api/job-status?id=${id}`);
      if (res.ok) {
        const data = await res.json();
        setJob(data);
        if (data.status !== "completed" && data.status !== "failed") {
          setTimeout(poll, 3000);
        }
      }
    };

    poll();
  }, [id]);

  async function getPresignedUrl(r2Key: string) {
    const res = await fetch(`/api/download?key=${encodeURIComponent(r2Key)}`);
    const { url } = await res.json();
    return url;
  }

  async function handleDownload(clip: Clip) {
    if (!clip.r2_key) return;
    setDownloading(clip.r2_key);

    const url = await getPresignedUrl(clip.r2_key);
    const blob = await fetch(url).then(r => r.blob());
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = `${clip.title.replace(/[^a-zA-Z0-9]/g, "_")}.mp4`;
    a.click();
    URL.revokeObjectURL(blobUrl);

    setDownloading(null);
  }

  async function handlePreview(clip: Clip) {
    if (!clip.r2_key || previewUrls[clip.r2_key]) return;
    setLoadingPreview(clip.r2_key);
    const url = await getPresignedUrl(clip.r2_key);
    setPreviewUrls(prev => ({ ...prev, [clip.r2_key!]: url }));
    setLoadingPreview(null);
  }

  async function handleDownloadAll() {
    if (!job?.clips) return;
    setDownloadingAll(true);

    for (let i = 0; i < job.clips.length; i++) {
      const clip = job.clips[i];
      if (clip.r2_key) {
        const res = await fetch(`/api/download?key=${encodeURIComponent(clip.r2_key)}`);
        const { url } = await res.json();

        // Fetch the file as blob then trigger download — avoids browser blocking
        const blob = await fetch(url).then(r => r.blob());
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = `clip_${i + 1}_${clip.title.replace(/[^a-zA-Z0-9]/g, "_").slice(0, 50)}.mp4`;
        a.click();
        URL.revokeObjectURL(blobUrl);
        await new Promise(r => setTimeout(r, 1500));
      }
    }

    setDownloadingAll(false);
  }

  const currentStageIdx = STATUS_STAGES.findIndex((s) => s.key === job?.status);

  const progressPercent = Math.max(0, Math.min(100, ((currentStageIdx >= 0 ? currentStageIdx : 0) / (STATUS_STAGES.length - 1)) * 100));

  return (
    <div className="min-h-screen relative">
      {/* Background ambient glow */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-brand-500/[0.07] blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[300px] rounded-full bg-brand-600/[0.04] blur-[100px]" />
      </div>

      <nav className="glass fixed top-0 w-full z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-2">
            <Scissors className="w-6 h-6 text-brand-500" />
            <span className="font-display text-xl font-bold text-white">
              Clippi<span className="text-brand-400">fied</span>
            </span>
          </a>
          <div className="flex items-center gap-3">
            <a href="/dashboard" className="text-sm text-white/70 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5">
              Dashboard
            </a>
            <a href="/clip" className="text-sm font-medium text-dark-950 bg-brand-500 hover:bg-brand-400 transition-all px-4 py-1.5 rounded-lg flex items-center gap-1.5">
              <Scissors className="w-3.5 h-3.5" /> New Clip
            </a>
          </div>
        </div>
      </nav>

      <div className="relative pt-28 pb-20 px-6 max-w-4xl mx-auto">
        {!job ? (
          <div className="text-center py-20">
            <Loader2 className="w-8 h-8 text-brand-500 animate-spin mx-auto mb-4" />
            <p className="text-white/40">Loading job...</p>
          </div>
        ) : job.status === "failed" ? (
          <div className="card p-10 text-center max-w-lg mx-auto border-hot-500/15">
            <div className="w-16 h-16 rounded-2xl bg-hot-500/10 flex items-center justify-center mx-auto mb-5">
              <XCircle className="w-8 h-8 text-hot-500" />
            </div>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Processing Failed</h2>
            <p className="text-white/50 mb-8 text-base leading-relaxed">{job.error || "An unknown error occurred."}</p>
            <div className="flex items-center justify-center gap-3">
              <a href="/clip" className="btn-primary inline-flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Try Again
              </a>
            </div>
          </div>
        ) : job.status !== "completed" ? (
          /* Processing progress */
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center mx-auto mb-5 animate-pulse-glow">
                <Scissors className="w-8 h-8 text-brand-400" />
              </div>
              <h2 className="font-display text-3xl font-bold text-white mb-2">
                Processing Your Video
              </h2>
              <p className="text-white/40 text-sm">Sit tight — the magic is happening</p>
            </div>

            {/* Progress bar */}
            <div className="mb-8">
              <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-brand-500 to-brand-400 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                  style={{ width: `${progressPercent}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </div>
              </div>
            </div>

            <div className="card p-6 space-y-1">
              {STATUS_STAGES.map((stage, i) => {
                const isActive = stage.key === job.status;
                const isComplete = i < currentStageIdx;
                const Icon = stage.icon;

                return (
                  <div
                    key={stage.key}
                    className={`flex items-center gap-4 p-3.5 rounded-xl transition-all ${
                      isActive
                        ? "bg-brand-500/[0.08] border border-brand-500/20"
                        : ""
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        isComplete
                          ? "bg-neon-500/15 text-neon-400"
                          : isActive
                          ? "bg-brand-500/15 text-brand-400"
                          : "bg-white/[0.03] text-white/15"
                      }`}
                    >
                      {isActive ? (
                        <Loader2 className="w-4.5 h-4.5 animate-spin" />
                      ) : isComplete ? (
                        <CheckCircle2 className="w-4.5 h-4.5" />
                      ) : (
                        <Icon className="w-4.5 h-4.5" />
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        isComplete
                          ? "text-neon-400"
                          : isActive
                          ? "text-white"
                          : "text-white/20"
                      }`}
                    >
                      {stage.label}
                    </span>
                    {isComplete && (
                      <span className="ml-auto text-xs text-neon-400/50 font-medium">Done</span>
                    )}
                  </div>
                );
              })}
            </div>

            <p className="mt-6 text-center text-sm text-white/25">
              Usually takes 2-4 minutes for a 60-minute video.
            </p>
          </div>
        ) : (
          /* Completed — show clips */
          <div>
            <div className="text-center mb-10">
              <CheckCircle2 className="w-12 h-12 text-neon-400 mx-auto mb-4" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
                Your Clips Are Ready
              </h2>
              <p className="text-white/50 text-lg">
                {job.clips?.length || 0} clips found from your{" "}
                {job.duration_seconds
                  ? `${Math.round(job.duration_seconds / 60)}-minute`
                  : ""}{" "}
                video
              </p>
            </div>

            {/* Download All */}
            {job.clips && job.clips.length > 1 && (
              <div className="flex justify-center mb-8">
                <button
                  onClick={handleDownloadAll}
                  disabled={downloadingAll}
                  className="btn-ghost flex items-center gap-2 text-sm"
                >
                  {downloadingAll ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <DownloadCloud className="w-4 h-4" />
                  )}
                  {downloadingAll ? "Downloading..." : "Download All Clips"}
                </button>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {job.clips?.map((clip, i) => (
                <div key={i} className="card overflow-hidden flex flex-col">
                  {/* Video preview */}
                  <div className="relative bg-dark-900 aspect-video">
                    {clip.r2_key && previewUrls[clip.r2_key] ? (
                      <video
                        src={previewUrls[clip.r2_key]}
                        controls
                        playsInline
                        className="w-full h-full object-contain bg-black"
                      />
                    ) : (
                      <button
                        onClick={() => handlePreview(clip)}
                        disabled={loadingPreview === clip.r2_key}
                        className="w-full h-full flex flex-col items-center justify-center gap-3 hover:bg-white/[0.02] transition-colors"
                      >
                        {loadingPreview === clip.r2_key ? (
                          <Loader2 className="w-10 h-10 text-brand-400 animate-spin" />
                        ) : (
                          <div className="w-14 h-14 rounded-full bg-brand-500/15 border border-brand-500/25 flex items-center justify-center">
                            <Play className="w-6 h-6 text-brand-400 ml-0.5" />
                          </div>
                        )}
                        <span className="text-xs text-white/30">
                          {loadingPreview === clip.r2_key ? "Loading preview..." : "Click to preview"}
                        </span>
                      </button>
                    )}
                    {/* Virality badge overlay */}
                    <div className="absolute top-3 left-3">
                      <span className="badge badge-hot flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {clip.virality_score}/10
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="text-xs text-white/70 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md font-mono">
                        {Math.round(clip.end_time - clip.start_time)}s
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-base font-bold text-white mb-1.5 leading-snug">{clip.title}</h3>
                    <p className="text-sm text-white/35 mb-4 flex-1 italic leading-relaxed line-clamp-2">
                      &ldquo;{clip.hook_text}&rdquo;
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDownload(clip)}
                        disabled={downloading === clip.r2_key}
                        className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm !py-2.5"
                      >
                        {downloading === clip.r2_key ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Download className="w-4 h-4" />
                        )}
                        {downloading === clip.r2_key ? "Saving..." : "Download"}
                      </button>
                      {clip.r2_key && !previewUrls[clip.r2_key] && (
                        <button
                          onClick={() => handlePreview(clip)}
                          disabled={loadingPreview === clip.r2_key}
                          className="btn-ghost flex items-center justify-center gap-2 text-sm !py-2.5 !px-4"
                        >
                          {loadingPreview === clip.r2_key ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <a href="/clip" className="btn-ghost inline-flex items-center gap-2">
                <Scissors className="w-4 h-4" /> Clip Another Video
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function formatTimestamp(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
