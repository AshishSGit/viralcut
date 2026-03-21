"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  Link2,
  Zap,
  Loader2,
  Scissors,
  FileVideo,
  X,
  LogOut,
  Sparkles,
  Shield,
  TrendingUp,
  Clock,
  User,
  CreditCard,
  LayoutDashboard,
  ChevronDown,
  Captions,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function ClipPage() {
  const [tab, setTab] = useState<"url" | "upload">("upload");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [includeCaptions, setIncludeCaptions] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPlan, setUserPlan] = useState("free");
  const [usage, setUsage] = useState({ usage: 0, limit: 1 });
  const fileRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || "");
      }
      const res = await fetch("/api/pro-status");
      if (res.ok) {
        const data = await res.json();
        setUserPlan(data.plan);
        setUsage({ usage: data.usage, limit: data.limit });
      }
    }
    loadUser();
  }, [supabase]);

  // Close menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();

      if (tab === "url") {
        if (!url.trim()) throw new Error("Please enter a URL");
        formData.append("source_type", "url");
        formData.append("source_url", url.trim());
      } else {
        if (!file) throw new Error("Please select a file");
        formData.append("source_type", "upload");
        formData.append("file", file);
      }
      formData.append("include_captions", includeCaptions ? "true" : "false");

      // Use XMLHttpRequest for upload progress tracking
      const data = await new Promise<{ job_id: string }>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/upload");

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            setUploadProgress(Math.round((e.loaded / e.total) * 100));
          }
        };

        xhr.onload = () => {
          try {
            const resp = JSON.parse(xhr.responseText);
            if (xhr.status >= 400) {
              reject(new Error(resp.error || "Upload failed"));
            } else {
              resolve(resp);
            }
          } catch {
            reject(new Error("Upload failed — please try again"));
          }
        };

        xhr.onerror = () => reject(new Error("Upload failed — check your connection"));
        xhr.send(formData);
      });

      router.push(`/clip/${data.job_id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type.startsWith("video/")) {
      setFile(dropped);
      setTab("upload");
    }
  }, []);

  const initials = userEmail ? userEmail[0].toUpperCase() : "U";

  return (
    <div className="min-h-screen ambient-glow">
      {/* Top nav */}
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
            <a href="/clip" className="text-sm font-medium text-white px-4 py-2 rounded-lg bg-white/[0.08] border border-white/[0.08]">
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

          {/* User menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/[0.03] transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-dark-950 text-xs font-bold">
                {initials}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-medium text-white/80 leading-tight truncate max-w-[120px]">{userEmail?.split("@")[0]}</p>
                <p className="text-[10px] text-white/40 capitalize">{userPlan}</p>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-white/40 transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-72 border border-white/10 shadow-2xl z-[60] rounded-2xl overflow-hidden" style={{ background: "#111318", backdropFilter: "blur(24px)" }}>
                {/* User header */}
                <div className="px-4 py-4 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-dark-950 text-sm font-bold shrink-0">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{userEmail}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                          userPlan === "unlimited" ? "bg-brand-500/15 text-brand-400" :
                          userPlan === "pro" ? "bg-brand-500/15 text-brand-400" :
                          "bg-white/[0.06] text-white/50"
                        }`}>{userPlan}</span>
                        <span className="text-[10px] text-white/30">{usage.usage}/{usage.limit === 999999 ? "\u221E" : usage.limit} videos</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Usage bar */}
                {userPlan === "free" && (
                  <div className="px-4 py-3 border-b border-white/5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] text-white/40">Monthly usage</span>
                      <span className="text-[11px] text-white/50 font-medium">{usage.usage}/{usage.limit}</span>
                    </div>
                    <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div className="h-full bg-brand-500 rounded-full transition-all" style={{ width: `${Math.min(100, (usage.usage / usage.limit) * 100)}%` }} />
                    </div>
                  </div>
                )}

                {/* Menu items */}
                <div className="p-1.5">
                  <a href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.05] rounded-lg transition-all">
                    <LayoutDashboard className="w-4 h-4" /> My Clips
                  </a>
                  <a href="/pricing" className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.05] rounded-lg transition-all">
                    <Sparkles className="w-4 h-4" /> {userPlan === "free" ? "Upgrade to Pro" : "Manage Plan"}
                  </a>
                  <a href="/contact" className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.05] rounded-lg transition-all">
                    <User className="w-4 h-4" /> Help & Support
                  </a>
                </div>

                {/* Sign out */}
                <div className="border-t border-white/5 p-1.5">
                  <button onClick={handleSignOut} className="flex items-center gap-3 px-3 py-2.5 text-sm text-hot-400 hover:bg-hot-500/10 rounded-lg transition-all w-full text-left">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="pt-28 pb-20 px-6 max-w-2xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white text-center mb-3">
          Create Viral Clips
        </h1>
        <p className="text-lg text-white/60 text-center mb-12">
          Upload a video or paste a YouTube URL to get started.
        </p>

        {/* Tab toggle */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <button
            onClick={() => { setTab("upload"); setError(""); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold transition-all ${
              tab === "upload"
                ? "bg-brand-500/15 text-white border border-brand-500/30"
                : "text-white/80 hover:text-white border border-white/15 hover:border-white/25 bg-white/5"
            }`}
          >
            <Upload className="w-5 h-5" /> Upload Video
          </button>
          <button
            onClick={() => { setTab("url"); setError(""); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold transition-all relative ${
              tab === "url"
                ? "bg-brand-500/15 text-white border border-brand-500/30"
                : "text-white/80 hover:text-white border border-white/15 hover:border-white/25 bg-white/5"
            }`}
          >
            <Link2 className="w-5 h-5" /> Paste URL
            <span className="text-[9px] font-bold bg-brand-500/20 text-brand-400 px-1.5 py-0.5 rounded-md uppercase tracking-wider">Beta</span>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {tab === "upload" ? (
            <div
              className={`card p-10 text-center transition-all ${
                dragOver ? "border-brand-500 bg-brand-500/10" : ""
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              {file ? (
                <div className="space-y-5">
                  <div className="flex items-center gap-3 bg-white/[0.03] rounded-xl px-4 py-3 border border-white/[0.06]">
                    <div className="w-9 h-9 rounded-lg bg-brand-500/10 flex items-center justify-center shrink-0">
                      <FileVideo className="w-5 h-5 text-brand-400" />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-sm font-medium text-white truncate">{file.name}</p>
                      <p className="text-xs text-white/50">{(file.size / (1024 * 1024)).toFixed(1)} MB</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="text-white/40 hover:text-white transition-colors shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  {/* Upload progress bar */}
                  {loading && uploadProgress > 0 && uploadProgress < 100 && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-white/50">Uploading...</span>
                        <span className="text-xs text-brand-400 font-medium">{uploadProgress}%</span>
                      </div>
                      <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-brand-500 to-brand-400 rounded-full transition-all duration-300 relative overflow-hidden"
                          style={{ width: `${uploadProgress}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                        </div>
                      </div>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full text-base !py-3.5 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {uploadProgress > 0 && uploadProgress < 100 ? `Uploading ${uploadProgress}%` : "Processing..."}
                      </>
                    ) : "Clip It"}
                  </button>
                </div>
              ) : (
                <div
                  className="py-4 cursor-pointer"
                  onClick={() => fileRef.current?.click()}
                >
                  <Upload className="w-14 h-14 text-white/20 mx-auto mb-4" />
                  <p className="text-white font-semibold text-lg mb-2">
                    Drop your video here or click to browse
                  </p>
                  <p className="text-base text-white/60 mb-2">MP4, MOV, WEBM — up to 2GB</p>
                  <p className="text-sm text-brand-400 font-medium mt-3">Browse Files</p>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="card p-8">
              <div className="flex items-center gap-2 mb-4">
                <label className="text-base text-white/70 font-medium">YouTube or Video URL</label>
                <span className="text-[9px] font-bold bg-brand-500/20 text-brand-400 px-1.5 py-0.5 rounded-md uppercase tracking-wider">Beta</span>
              </div>
              <div className="flex gap-3">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="input-field flex-1 text-base !py-4"
                  placeholder="https://youtube.com/watch?v=..."
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex items-center gap-2 whitespace-nowrap text-base !py-4 !px-8"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                  {loading ? "Processing..." : "Clip It"}
                </button>
              </div>
              <p className="text-sm text-white/50 mt-3">
                YouTube URL downloads are in beta and may not work for all videos. For best results, download the video first and use the Upload tab.
              </p>
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 rounded-xl bg-hot-500/10 border border-hot-500/20 text-hot-400 text-base">
              {error}
            </div>
          )}
        </form>

        {/* Captions toggle */}
        <div className="mt-6 card p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-brand-500/10 flex items-center justify-center">
              <Captions className="w-5 h-5 text-brand-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Include captions</p>
              <p className="text-xs text-white/60 mt-0.5">Burn word-by-word captions into your clips</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIncludeCaptions(!includeCaptions)}
            className={`toggle-track ${includeCaptions ? "active" : ""}`}
            aria-label="Toggle captions"
          >
            <div className="toggle-thumb" />
          </button>
        </div>

        {/* Trust signals */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm text-white/60">
          <span className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-neon-400" /> Secure & private
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-400" /> ~2 min processing
          </span>
          <span className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-brand-400" /> 3-5 clips per video
          </span>
        </div>

        <p className="mt-4 text-center text-sm text-white/45">
          Supports YouTube URLs and MP4, MOV, WEBM uploads. Max 2 hours.
        </p>
      </div>
    </div>
  );
}
