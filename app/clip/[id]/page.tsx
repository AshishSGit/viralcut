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

  async function handleDownload(clip: Clip) {
    if (!clip.r2_key) return;
    setDownloading(clip.r2_key);

    const res = await fetch(`/api/download?key=${encodeURIComponent(clip.r2_key)}`);
    const { url } = await res.json();

    const a = document.createElement("a");
    a.href = url;
    a.download = `${clip.title.replace(/[^a-zA-Z0-9]/g, "_")}.mp4`;
    a.click();

    setDownloading(null);
  }

  const currentStageIdx = STATUS_STAGES.findIndex((s) => s.key === job?.status);

  return (
    <div className="min-h-screen">
      <nav className="glass fixed top-0 w-full z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-2">
            <Scissors className="w-6 h-6 text-brand-500" />
            <span className="font-display text-xl font-bold text-white">
              Clippi<span className="text-brand-400">fied</span>
            </span>
          </a>
          <a
            href="/clip"
            className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> New Clip
          </a>
        </div>
      </nav>

      <div className="pt-28 pb-20 px-6 max-w-4xl mx-auto">
        {!job ? (
          <div className="text-center py-20">
            <Loader2 className="w-8 h-8 text-brand-500 animate-spin mx-auto mb-4" />
            <p className="text-slate-400">Loading job...</p>
          </div>
        ) : job.status === "failed" ? (
          <div className="card p-8 text-center">
            <XCircle className="w-12 h-12 text-hot-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Processing Failed</h2>
            <p className="text-slate-400 mb-6">{job.error || "An unknown error occurred."}</p>
            <a href="/clip" className="btn-primary inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Try Again
            </a>
          </div>
        ) : job.status !== "completed" ? (
          /* Processing progress */
          <div className="card p-8 max-w-lg mx-auto">
            <h2 className="font-display text-2xl font-bold text-white text-center mb-8">
              Processing Your Video
            </h2>

            <div className="space-y-4">
              {STATUS_STAGES.map((stage, i) => {
                const isActive = stage.key === job.status;
                const isComplete = i < currentStageIdx;
                const isPending = i > currentStageIdx;
                const Icon = stage.icon;

                return (
                  <div
                    key={stage.key}
                    className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-brand-500/10 border border-brand-500/20"
                        : ""
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isComplete
                          ? "bg-neon-500/20 text-neon-400"
                          : isActive
                          ? "bg-brand-500/15 text-brand-400"
                          : "bg-dark-700 text-slate-600"
                      }`}
                    >
                      {isActive ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : isComplete ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        isComplete
                          ? "text-neon-400"
                          : isActive
                          ? "text-white"
                          : "text-slate-600"
                      }`}
                    >
                      {stage.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="mt-8 text-center text-xs text-slate-600">
              This usually takes 2-4 minutes for a 60-minute video.
            </p>
          </div>
        ) : (
          /* Completed — show clips */
          <div>
            <div className="text-center mb-10">
              <CheckCircle2 className="w-10 h-10 text-neon-400 mx-auto mb-3" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                Your Clips Are Ready!
              </h2>
              <p className="text-slate-400">
                {job.clips?.length || 0} viral clips found from your{" "}
                {job.duration_seconds
                  ? `${Math.round(job.duration_seconds / 60)}-minute`
                  : ""}{" "}
                video.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {job.clips?.map((clip, i) => (
                <div key={i} className="card p-5 flex flex-col">
                  {/* Virality score badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="badge badge-hot flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {clip.virality_score}/10
                    </span>
                    <span className="text-xs text-slate-500">
                      {Math.round(clip.end_time - clip.start_time)}s
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white mb-2">{clip.title}</h3>

                  {/* Hook preview */}
                  <p className="text-sm text-slate-400 mb-4 flex-1 italic">
                    &ldquo;{clip.hook_text}&rdquo;
                  </p>

                  {/* Timestamp */}
                  <p className="text-xs text-slate-600 mb-4">
                    {formatTimestamp(clip.start_time)} — {formatTimestamp(clip.end_time)}
                  </p>

                  {/* Download button */}
                  <button
                    onClick={() => handleDownload(clip)}
                    disabled={downloading === clip.r2_key}
                    className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
                  >
                    {downloading === clip.r2_key ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                    Download Clip
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
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
