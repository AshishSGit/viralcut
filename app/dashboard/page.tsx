"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Scissors,
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowRight,
  LogOut,
  Sparkles,
  Plus,
  ChevronDown,
  LayoutDashboard,
  User,
  Film,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface Job {
  id: string;
  status: string;
  source_type: string;
  source_url: string | null;
  duration_seconds: number | null;
  clips: { title: string }[] | null;
  error: string | null;
  created_at: string;
}

export default function DashboardPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [usage, setUsage] = useState({ plan: "free", usage: 0, limit: 1 });
  const [userEmail, setUserEmail] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/signin");
        return;
      }
      setUserEmail(user.email || "");

      const { data } = await supabase
        .from("jobs")
        .select("id, status, source_type, source_url, duration_seconds, clips, error, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(20);

      setJobs(data || []);

      const res = await fetch("/api/pro-status");
      if (res.ok) setUsage(await res.json());

      setLoading(false);
    }
    load();
  }, [supabase, router]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  const initials = userEmail ? userEmail[0].toUpperCase() : "U";

  function extractVideoTitle(url: string | null) {
    if (!url) return "Uploaded video";
    try {
      const u = new URL(url);
      const id = u.searchParams.get("v") || u.pathname.split("/").pop() || "";
      return `YouTube · ${id.slice(0, 11)}`;
    } catch {
      return "Video";
    }
  }

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
          <div className="flex items-center gap-3">
            <a href="/clip" className="btn-primary text-sm !py-2 !px-4 flex items-center gap-1.5">
              <Plus className="w-4 h-4" /> New Clip
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
                  <div className="px-3 py-3 border-b border-white/5">
                    <p className="text-sm font-medium text-white truncate">{userEmail}</p>
                    <p className="text-xs text-white/30 mt-0.5 capitalize">{usage.plan} plan</p>
                  </div>
                  <div className="py-1">
                    <a href="/clip" className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                      <Plus className="w-4 h-4" /> New Clip
                    </a>
                    <a href="/pricing" className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                      <Sparkles className="w-4 h-4" /> {usage.plan === "free" ? "Upgrade Plan" : "Manage Plan"}
                    </a>
                    <a href="/contact" className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                      <User className="w-4 h-4" /> Contact Support
                    </a>
                  </div>
                  <div className="border-t border-white/5 pt-1">
                    <button onClick={handleSignOut} className="flex items-center gap-3 px-3 py-2.5 text-sm text-hot-400 hover:bg-hot-500/10 rounded-lg transition-colors w-full text-left">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-28 pb-20 px-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white">Dashboard</h1>
            <p className="text-white/40 mt-1">Your clip history</p>
          </div>

          {/* Usage card */}
          <div className="card px-6 py-4 flex items-center gap-5">
            <div>
              <p className="text-[11px] text-white/30 uppercase tracking-wider font-semibold">Plan</p>
              <p className="text-sm font-bold text-white capitalize mt-0.5">{usage.plan}</p>
            </div>
            <div className="w-px h-10 bg-white/5" />
            <div>
              <p className="text-[11px] text-white/30 uppercase tracking-wider font-semibold">Usage</p>
              <p className="text-sm font-bold text-white mt-0.5">
                {usage.usage}/{usage.limit === 999999 ? "\u221E" : usage.limit}
              </p>
            </div>
            {usage.plan === "free" && (
              <>
                <div className="w-px h-10 bg-white/5" />
                <a href="/pricing" className="text-xs text-brand-400 hover:text-brand-300 font-semibold">
                  Upgrade
                </a>
              </>
            )}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <Loader2 className="w-8 h-8 text-brand-500 animate-spin mx-auto" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="card p-14 text-center">
            <Film className="w-14 h-14 text-white/10 mx-auto mb-5" />
            <h3 className="text-xl font-bold text-white mb-2">No clips yet</h3>
            <p className="text-white/40 mb-8">Create your first viral clip from a video.</p>
            <a href="/clip" className="btn-primary inline-flex items-center gap-2">
              <Plus className="w-4 h-4" /> Create First Clip
            </a>
          </div>
        ) : (
          <div className="space-y-3">
            {jobs.map((job) => (
              <a
                key={job.id}
                href={`/clip/${job.id}`}
                className="card p-5 flex items-center gap-4 hover:border-brand-500/20 transition-all block group"
              >
                {/* Status icon */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  job.status === "completed"
                    ? "bg-neon-500/10 text-neon-400"
                    : job.status === "failed"
                    ? "bg-hot-500/10 text-hot-400"
                    : "bg-brand-500/10 text-brand-400"
                }`}>
                  {job.status === "completed" ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : job.status === "failed" ? (
                    <XCircle className="w-5 h-5" />
                  ) : (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">
                    {extractVideoTitle(job.source_url)}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-white/25">
                      {new Date(job.created_at).toLocaleDateString()}
                    </span>
                    {job.duration_seconds && (
                      <>
                        <span className="text-xs text-white/15">·</span>
                        <span className="text-xs text-white/25">
                          {Math.round(job.duration_seconds / 60)} min
                        </span>
                      </>
                    )}
                    {job.clips && (
                      <>
                        <span className="text-xs text-white/15">·</span>
                        <span className="text-xs text-neon-400 font-medium">
                          {job.clips.length} clips
                        </span>
                      </>
                    )}
                    {job.status === "failed" && (
                      <>
                        <span className="text-xs text-white/15">·</span>
                        <span className="text-xs text-hot-400">Failed</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Arrow */}
                <ArrowRight className="w-4 h-4 text-white/10 group-hover:text-white/30 transition-colors flex-shrink-0" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
