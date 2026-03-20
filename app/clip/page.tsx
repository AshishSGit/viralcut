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
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function ClipPage() {
  const [tab, setTab] = useState<"url" | "upload">("url");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPlan, setUserPlan] = useState("free");
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

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Upload failed");

      router.push(`/clip/${data.job_id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
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
    <div className="min-h-screen">
      {/* Top nav */}
      <nav className="glass fixed top-0 w-full z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-2">
            <Scissors className="w-6 h-6 text-brand-500" />
            <span className="font-display text-xl font-bold text-white">
              Clippi<span className="text-brand-400">fied</span>
            </span>
          </a>
          <div className="flex items-center gap-3">
            <a href="/dashboard" className="text-sm text-white/60 hover:text-white transition-colors hidden sm:block">
              Dashboard
            </a>

            {/* User menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="w-7 h-7 rounded-lg bg-brand-500/20 flex items-center justify-center text-brand-400 text-xs font-bold">
                  {initials}
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-white/40 transition-transform ${menuOpen ? "rotate-180" : ""}`} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-64 p-2 border border-white/10 shadow-2xl z-[60] rounded-2xl" style={{ background: "#111318", backdropFilter: "blur(20px)" }}>
                  {/* User info */}
                  <div className="px-3 py-3 border-b border-white/5">
                    <p className="text-sm font-medium text-white truncate">{userEmail}</p>
                    <p className="text-xs text-white/30 mt-0.5 capitalize">{userPlan} plan</p>
                  </div>

                  {/* Menu items */}
                  <div className="py-1">
                    <a
                      href="/dashboard"
                      className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </a>
                    <a
                      href="/pricing"
                      className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <Sparkles className="w-4 h-4" />
                      {userPlan === "free" ? "Upgrade Plan" : "Manage Plan"}
                    </a>
                    <a
                      href="/contact"
                      className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Contact Support
                    </a>
                  </div>

                  {/* Sign out */}
                  <div className="border-t border-white/5 pt-1">
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm text-hot-400 hover:bg-hot-500/10 rounded-lg transition-colors w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-28 pb-20 px-6 max-w-2xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white text-center mb-3">
          Create Viral Clips
        </h1>
        <p className="text-lg text-white/60 text-center mb-12">
          Paste a YouTube URL or upload a video to get started.
        </p>

        {/* Tab toggle */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <button
            onClick={() => setTab("url")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold transition-all ${
              tab === "url"
                ? "bg-brand-500/15 text-white border border-brand-500/30"
                : "text-white/80 hover:text-white border border-white/15 hover:border-white/25 bg-white/5"
            }`}
          >
            <Link2 className="w-5 h-5" /> Paste URL
          </button>
          <button
            onClick={() => setTab("upload")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold transition-all ${
              tab === "upload"
                ? "bg-brand-500/15 text-white border border-brand-500/30"
                : "text-white/80 hover:text-white border border-white/15 hover:border-white/25 bg-white/5"
            }`}
          >
            <Upload className="w-5 h-5" /> Upload Video
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {tab === "url" ? (
            <div className="card p-8">
              <label className="text-base text-white/70 mb-3 block font-medium">YouTube or Video URL</label>
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
              <p className="text-sm text-white/30 mt-3">
                YouTube downloads may occasionally fail due to platform restrictions. If so, download the video and upload it directly.
              </p>
            </div>
          ) : (
            <div
              className={`card p-10 text-center transition-all ${
                dragOver ? "border-brand-500 bg-brand-500/10" : ""
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              {file ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileVideo className="w-10 h-10 text-brand-500" />
                    <div className="text-left">
                      <p className="text-white font-semibold text-lg">{file.name}</p>
                      <p className="text-base text-white/40">
                        {(file.size / (1024 * 1024)).toFixed(1)} MB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="text-white/40 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary flex items-center gap-2 text-base !py-4 !px-8"
                    >
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                      {loading ? "Processing..." : "Clip It"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-4">
                  <Upload className="w-14 h-14 text-white/20 mx-auto mb-4" />
                  <p className="text-white font-semibold text-lg mb-2">
                    Drop your video here
                  </p>
                  <p className="text-base text-white/40 mb-5">MP4, MOV, WEBM — up to 2GB</p>
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="btn-primary inline-flex items-center gap-2 text-base !py-3 !px-8"
                  >
                    <Upload className="w-5 h-5" /> Browse Files
                  </button>
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
          )}

          {error && (
            <div className="mt-4 p-4 rounded-xl bg-hot-500/10 border border-hot-500/20 text-hot-400 text-base">
              {error}
            </div>
          )}
        </form>

        {/* Trust signals */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm text-white/40">
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

        <p className="mt-4 text-center text-sm text-white/25">
          Supports YouTube URLs and MP4, MOV, WEBM uploads. Max 2 hours.
        </p>
      </div>
    </div>
  );
}
