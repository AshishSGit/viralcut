"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import {
  Scissors,
  Download,
  Loader2,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Clock,
  Sparkles,
  Wifi,
  Search,
  Film,
  Play,
  Menu,
  X,
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});
  const [playingClip, setPlayingClip] = useState<string | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  useEffect(() => {
    if (!id) return;

    const poll = async () => {
      const res = await fetch(`/api/job-status?id=${id}`);
      if (res.ok) {
        const data = await res.json();
        setJob(data);
        if (data.status === "completed" && data.clips) {
          // Auto-load all preview URLs on completion
          loadAllPreviews(data.clips);
        }
        if (data.status !== "completed" && data.status !== "failed") {
          setTimeout(poll, 3000);
        }
      }
    };

    poll();
  }, [id]);

  async function loadAllPreviews(clips: Clip[]) {
    const urls: Record<string, string> = {};
    await Promise.all(
      clips.map(async (clip) => {
        if (clip.r2_key) {
          const res = await fetch(`/api/download?key=${encodeURIComponent(clip.r2_key)}`);
          const { url } = await res.json();
          urls[clip.r2_key] = url;
        }
      })
    );
    setPreviewUrls(urls);
  }

  async function handleDownload(clip: Clip) {
    if (!clip.r2_key) return;
    setDownloading(clip.r2_key);

    try {
      const filename = `${clip.title.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, "_").slice(0, 50)}.mp4`;
      const a = document.createElement("a");
      a.href = `/api/download?key=${encodeURIComponent(clip.r2_key)}&stream=true&name=${encodeURIComponent(filename)}`;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Download failed. Please try again.");
    }

    setTimeout(() => setDownloading(null), 2000);
  }

  function handleDownloadAll() {
    if (!sortedClips.length) return;
    sortedClips.forEach((clip, i) => {
      setTimeout(() => handleDownload(clip), i * 1500);
    });
  }

  function handlePlay(r2Key: string) {
    const video = videoRefs.current[r2Key];
    if (!video) return;

    // Pause any other playing video
    if (playingClip && playingClip !== r2Key) {
      const other = videoRefs.current[playingClip];
      if (other) { other.pause(); other.currentTime = 0; }
    }

    if (video.paused) {
      video.play();
      setPlayingClip(r2Key);
    } else {
      video.pause();
      setPlayingClip(null);
    }
  }

  const currentStageIdx = STATUS_STAGES.findIndex((s) => s.key === job?.status);
  const progressPercent = Math.max(0, Math.min(100, ((currentStageIdx >= 0 ? currentStageIdx : 0) / (STATUS_STAGES.length - 1)) * 100));

  // Sort clips by virality score (highest first)
  const sortedClips = job?.clips ? [...job.clips].sort((a, b) => b.virality_score - a.virality_score) : [];

  return (
    <div className="min-h-screen relative">
      {/* Background ambient glow */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-brand-500/[0.07] blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[300px] rounded-full bg-brand-600/[0.04] blur-[100px]" />
      </div>

      <nav className="glass fixed top-0 w-full z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
          <a href="/" className="flex items-center gap-2">
            <Scissors className="w-6 h-6 text-brand-500" />
            <span className="font-display text-xl font-bold text-white">
              Clippi<span className="text-brand-400">fied</span>
            </span>
          </a>

          {/* Center nav tabs */}
          <div className="hidden md:flex items-center bg-white/[0.04] rounded-xl border border-white/[0.06] p-1">
            <a href="/dashboard" className="text-sm text-white/50 hover:text-white px-4 py-2 rounded-lg hover:bg-white/[0.06] transition-all">
              Dashboard
            </a>
            <a href="/clip" className="text-sm text-white/50 hover:text-white px-4 py-2 rounded-lg hover:bg-white/[0.06] transition-all">
              Create
            </a>
            <a href="/pricing" className="text-sm text-white/50 hover:text-white px-4 py-2 rounded-lg hover:bg-white/[0.06] transition-all">
              Pricing
            </a>
            <a href="/blog" className="text-sm text-white/50 hover:text-white px-4 py-2 rounded-lg hover:bg-white/[0.06] transition-all">
              Blog
            </a>
            <a href="/contact" className="text-sm text-white/50 hover:text-white px-4 py-2 rounded-lg hover:bg-white/[0.06] transition-all">
              Contact
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white/60 hover:text-white p-2"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="hidden md:flex items-center gap-3">
            <a href="/clip" className="btn-primary text-sm !py-2 !px-4 flex items-center gap-1.5">
              <Scissors className="w-3.5 h-3.5" /> New Clip
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile nav menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/60" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed top-0 right-0 w-64 h-full z-50 p-6 pt-20" style={{ background: "#111318" }}>
            <div className="space-y-1">
              <a href="/dashboard" className="block px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg">Dashboard</a>
              <a href="/clip" className="block px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg">Create</a>
              <a href="/pricing" className="block px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg">Pricing</a>
              <a href="/blog" className="block px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg">Blog</a>
              <a href="/contact" className="block px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg">Contact</a>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10">
              <a href="/signin" className="block px-4 py-3 text-sm text-hot-400 hover:bg-hot-500/10 rounded-lg">Sign Out</a>
            </div>
          </div>
        </div>
      )}

      <div className="relative pt-28 pb-20 px-6 max-w-6xl mx-auto">
        {!job ? (
          <div className="text-center py-20">
            <Loader2 className="w-8 h-8 text-brand-500 animate-spin mx-auto mb-4" />
            <p className="text-white/60">Loading job...</p>
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
                <Scissors className="w-4 h-4" /> Try Again
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
              <p className="text-white/60 text-sm">Sit tight — the magic is happening</p>
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
                          : "text-white/40"
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

            <p className="mt-6 text-center text-sm text-white/45">
              Usually takes 2-4 minutes for a 60-minute video.
            </p>
          </div>
        ) : (
          /* Completed — show clips */
          <div>
            {/* Celebration header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 badge badge-neon mb-5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Ready to post
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
                {sortedClips.length} Viral Clips Found
              </h2>
              <p className="text-white/50 text-sm md:text-lg max-w-lg mx-auto">
                {job.duration_seconds ? `From your ${Math.round(job.duration_seconds / 60)}-minute video — ` : ""}
                ranked by virality score. Preview, then download.
              </p>

              {/* Quick stats */}
              <div className="flex items-center justify-center gap-3 md:gap-6 flex-wrap mt-6">
                <div className="flex items-center gap-2 text-sm text-white/50">
                  <Film className="w-4 h-4 text-brand-400" />
                  <span>{sortedClips.length} clips</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/50">
                  <Clock className="w-4 h-4 text-brand-400" />
                  <span>{sortedClips.reduce((acc, c) => acc + Math.round(c.end_time - c.start_time), 0)}s total</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/50">
                  <TrendingUp className="w-4 h-4 text-neon-400" />
                  <span>Top score: {sortedClips[0]?.virality_score}/10</span>
                </div>
              </div>
            </div>

            {/* Download All */}
            {sortedClips.length > 1 && (
              <div className="flex justify-center mb-6 md:mb-10">
                <button
                  onClick={handleDownloadAll}
                  className="btn-primary text-sm !py-2.5 !px-6 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download All {sortedClips.length} Clips
                </button>
              </div>
            )}

            {/* Clip grid — vertical phone-frame cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {sortedClips.map((clip, i) => {
                const r2Key = clip.r2_key || "";
                const hasPreview = !!previewUrls[r2Key];
                const isPlaying = playingClip === r2Key;

                return (
                  <div key={i} className="group flex flex-col">
                    {/* Video container — 9:16 vertical phone frame */}
                    <div
                      className="clip-card relative cursor-pointer"
                      style={{ aspectRatio: "9/16" }}
                      onClick={() => hasPreview && handlePlay(r2Key)}
                    >
                      {hasPreview ? (
                        <>
                          <video
                            ref={(el) => { videoRefs.current[r2Key] = el; }}
                            src={previewUrls[r2Key]}
                            playsInline
                            preload="metadata"
                            onEnded={() => setPlayingClip(null)}
                            className="w-full h-full object-cover"
                          />
                          {!isPlaying && (
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-center justify-center transition-opacity group-hover:from-black/40">
                              <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/25 group-hover:scale-110 group-hover:bg-white/25 transition-all duration-300 shadow-lg">
                                <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-dark-800 to-dark-900">
                          <Loader2 className="w-6 h-6 text-brand-400/40 animate-spin" />
                          <span className="text-[10px] text-white/30">Loading preview</span>
                        </div>
                      )}

                      {/* Top badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md shadow-sm ${
                          clip.virality_score >= 8
                            ? "bg-brand-500 text-dark-950"
                            : clip.virality_score >= 6
                            ? "bg-white/20 text-white"
                            : "bg-black/50 text-white/70"
                        }`}>
                          {clip.virality_score}/10
                        </span>
                        <span className="text-[11px] font-mono text-white bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg">
                          {Math.round(clip.end_time - clip.start_time)}s
                        </span>
                      </div>

                      {/* Rank badge */}
                      {i === 0 && (
                        <div className="absolute bottom-3 left-3 pointer-events-none">
                          <span className="text-[10px] font-bold bg-gradient-to-r from-brand-500 to-brand-300 text-dark-950 px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-lg shadow-brand-500/30">
                            <TrendingUp className="w-3 h-3" /> Best Clip
                          </span>
                        </div>
                      )}
                      {i === 1 && sortedClips.length > 2 && (
                        <div className="absolute bottom-3 left-3 pointer-events-none">
                          <span className="text-[10px] font-bold bg-white/15 backdrop-blur-md text-white px-3 py-1.5 rounded-lg">#2</span>
                        </div>
                      )}
                    </div>

                    {/* Info + download */}
                    <div className="mt-3.5 px-0.5">
                      <p className="text-xs text-white/40 mb-1 font-medium">
                        Clip {i + 1} of {sortedClips.length}
                      </p>
                      <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2 mb-3 group-hover:text-brand-300 transition-colors">
                        {clip.title}
                      </h3>
                      <button
                        onClick={() => handleDownload(clip)}
                        disabled={downloading === clip.r2_key}
                        className="group/dl w-full flex items-center justify-center gap-2 text-xs font-bold py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-400 text-dark-950 hover:from-brand-400 hover:to-brand-300 transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/25 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                      >
                        {downloading === clip.r2_key ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Download className="w-3.5 h-3.5 group-hover/dl:animate-bounce" />
                        )}
                        {downloading === clip.r2_key ? "Saving..." : "Download MP4"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom actions */}
            <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/clip" className="btn-primary inline-flex items-center gap-2 text-sm !py-3 !px-6">
                <Scissors className="w-4 h-4" /> Clip Another Video
              </a>
              <a href="/dashboard" className="btn-ghost inline-flex items-center gap-2 text-sm">
                View All Clips
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
