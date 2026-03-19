"use client";

import { useState, useRef, useCallback } from "react";
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
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function ClipPage() {
  const [tab, setTab] = useState<"url" | "upload">("url");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const supabase = createClient();

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
          <div className="flex items-center gap-4">
            <a href="/dashboard" className="text-sm text-white/70 hover:text-white transition-colors">
              Dashboard
            </a>
            <a href="/pricing" className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-1">
              <Sparkles className="w-4 h-4" /> Upgrade
            </a>
            <button
              onClick={handleSignOut}
              className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-1"
            >
              <LogOut className="w-4 h-4" />
            </button>
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
                : "text-white/50 hover:text-white border border-white/10 hover:border-white/20"
            }`}
          >
            <Link2 className="w-5 h-5" /> Paste URL
          </button>
          <button
            onClick={() => setTab("upload")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold transition-all ${
              tab === "upload"
                ? "bg-brand-500/15 text-white border border-brand-500/30"
                : "text-white/50 hover:text-white border border-white/10 hover:border-white/20"
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
                <div
                  className="cursor-pointer py-4"
                  onClick={() => fileRef.current?.click()}
                >
                  <Upload className="w-14 h-14 text-white/20 mx-auto mb-4" />
                  <p className="text-white font-semibold text-lg mb-2">
                    Drop your video here or click to browse
                  </p>
                  <p className="text-base text-white/40">MP4, MOV, WEBM — up to 2GB</p>
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
        <div className="mt-10 flex items-center justify-center gap-8 text-sm text-white/40">
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
          Supports YouTube, TikTok, and direct video URLs. Max 2 hours.
        </p>
      </div>
    </div>
  );
}
