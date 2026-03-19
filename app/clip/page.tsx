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
            <Scissors className="w-6 h-6 text-electric-500" />
            <span className="font-display text-xl font-bold text-white">
              Viral<span className="text-electric-400">Cut</span>
            </span>
          </a>
          <div className="flex items-center gap-4">
            <a href="/dashboard" className="text-sm text-slate-400 hover:text-white transition-colors">
              Dashboard
            </a>
            <a href="/pricing" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1">
              <Sparkles className="w-4 h-4" /> Upgrade
            </a>
            <button
              onClick={handleSignOut}
              className="text-sm text-slate-500 hover:text-white transition-colors flex items-center gap-1"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-28 pb-20 px-6 max-w-2xl mx-auto">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-white text-center mb-2">
          Create Viral Clips
        </h1>
        <p className="text-slate-400 text-center mb-10">
          Paste a YouTube URL or upload a video to get started.
        </p>

        {/* Tab toggle */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setTab("url")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              tab === "url"
                ? "bg-electric-600/20 text-electric-400 border border-electric-500/30"
                : "text-slate-400 hover:text-white border border-transparent"
            }`}
          >
            <Link2 className="w-4 h-4" /> Paste URL
          </button>
          <button
            onClick={() => setTab("upload")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              tab === "upload"
                ? "bg-electric-600/20 text-electric-400 border border-electric-500/30"
                : "text-slate-400 hover:text-white border border-transparent"
            }`}
          >
            <Upload className="w-4 h-4" /> Upload Video
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {tab === "url" ? (
            <div className="card p-6">
              <label className="text-sm text-slate-400 mb-2 block">YouTube or Video URL</label>
              <div className="flex gap-3">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="input-field flex-1"
                  placeholder="https://youtube.com/watch?v=..."
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex items-center gap-2 whitespace-nowrap"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                  {loading ? "Processing..." : "Clip It"}
                </button>
              </div>
            </div>
          ) : (
            <div
              className={`card p-8 text-center transition-all ${
                dragOver ? "border-electric-500 bg-electric-600/10" : ""
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              {file ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileVideo className="w-8 h-8 text-electric-500" />
                    <div className="text-left">
                      <p className="text-white font-medium">{file.name}</p>
                      <p className="text-sm text-slate-500">
                        {(file.size / (1024 * 1024)).toFixed(1)} MB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="text-slate-500 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary flex items-center gap-2"
                    >
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                      {loading ? "Processing..." : "Clip It"}
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="cursor-pointer"
                  onClick={() => fileRef.current?.click()}
                >
                  <Upload className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-white font-medium mb-1">
                    Drop your video here or click to browse
                  </p>
                  <p className="text-sm text-slate-500">MP4, MOV, WEBM — up to 2GB</p>
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
            <div className="mt-4 p-4 rounded-xl bg-hot-500/10 border border-hot-500/20 text-hot-400 text-sm">
              {error}
            </div>
          )}
        </form>

        <p className="mt-6 text-center text-xs text-slate-600">
          Supports YouTube, TikTok, and direct video URLs. Max 2 hours.
        </p>
      </div>
    </div>
  );
}
