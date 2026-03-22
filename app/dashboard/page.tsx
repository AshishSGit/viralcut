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
  Menu,
  X,
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "completed" | "failed">("all");
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

      // Mark stale jobs (processing for over 10 min) as failed on the client
      const STALE_MS = 10 * 60 * 1000;
      const jobs = (data || []).map(job => {
        if (job.status !== "completed" && job.status !== "failed") {
          const age = Date.now() - new Date(job.created_at).getTime();
          if (age > STALE_MS) {
            return { ...job, status: "failed", error: "Processing timed out." };
          }
        }
        return job;
      });
      setJobs(jobs);

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
    <div className="min-h-screen ambient-glow">
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
            <a href="/dashboard" className="text-sm font-medium text-white px-4 py-2 rounded-lg bg-white/[0.08] border border-white/[0.08]">
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
              <Plus className="w-4 h-4" /> New Clip
            </a>

            {/* User menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/[0.03] transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-dark-950 text-xs font-bold">
                  {initials}
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-white/40 transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-72 border border-white/10 shadow-2xl z-[60] rounded-2xl overflow-hidden" style={{ background: "#111318", backdropFilter: "blur(24px)" }}>
                  <div className="px-4 py-4 border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-dark-950 text-sm font-bold shrink-0">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white truncate">{userEmail}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                            usage.plan !== "free" ? "bg-brand-500/15 text-brand-400" : "bg-white/[0.06] text-white/50"
                          }`}>{usage.plan}</span>
                          <span className="text-[10px] text-white/30">{usage.usage}/{usage.limit === 999999 ? "\u221E" : usage.limit} videos</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {usage.plan === "free" && (
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

                  <div className="p-1.5">
                    <a href="/clip" className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.05] rounded-lg transition-all">
                      <Plus className="w-4 h-4" /> New Clip
                    </a>
                    <a href="/pricing" className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.05] rounded-lg transition-all">
                      <Sparkles className="w-4 h-4" /> {usage.plan === "free" ? "Upgrade to Pro" : "Manage Plan"}
                    </a>
                    <a href="/contact" className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.05] rounded-lg transition-all">
                      <User className="w-4 h-4" /> Help & Support
                    </a>
                  </div>

                  <div className="border-t border-white/5 p-1.5">
                    <button onClick={handleSignOut} className="flex items-center gap-3 px-3 py-2.5 text-sm text-hot-400 hover:bg-hot-500/10 rounded-lg transition-all w-full text-left">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
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
            {userEmail && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs text-white/40 px-4 truncate mb-3">{userEmail}</p>
                <button
                  onClick={() => { setMobileMenuOpen(false); handleSignOut(); }}
                  className="block w-full text-left px-4 py-3 text-sm text-hot-400 hover:bg-hot-500/10 rounded-lg"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="pt-28 pb-20 px-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white">Dashboard</h1>
            <p className="text-white/60 mt-1">Your clip history</p>
          </div>

          {/* Usage card */}
          <div className="card px-6 py-4 flex items-center gap-3 md:gap-5">
            <div>
              <p className="text-[11px] text-white/50 uppercase tracking-wider font-semibold">Plan</p>
              <p className="text-sm font-bold text-white capitalize mt-0.5">{usage.plan}</p>
            </div>
            <div className="w-px h-10 bg-white/5" />
            <div>
              <p className="text-[11px] text-white/50 uppercase tracking-wider font-semibold">Usage</p>
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
          <div className="card p-14 text-center gradient-border">
            <div className="w-20 h-20 rounded-2xl bg-brand-500/10 border border-brand-500/15 flex items-center justify-center mx-auto mb-6">
              <Film className="w-10 h-10 text-brand-400" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-3">No clips yet</h3>
            <p className="text-white/60 mb-3 max-w-sm mx-auto">
              Paste a YouTube URL or upload a video and we will find the best moments worth posting.
            </p>
            <p className="text-white/45 text-sm mb-8">It takes about 2 minutes.</p>
            <a href="/clip" className="btn-primary inline-flex items-center gap-2 text-base !py-3 !px-8">
              <Sparkles className="w-4.5 h-4.5" /> Create Your First Clip
            </a>
          </div>
        ) : (
          <div>
            {/* Filter tabs */}
            {jobs.some(j => j.status === "failed") && (
              <div className="flex items-center gap-2 mb-6">
                {(["all", "completed", "failed"] as const).map((f) => {
                  const count = f === "all" ? jobs.length : jobs.filter(j => j.status === f).length;
                  return (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all capitalize ${
                        filter === f
                          ? "bg-white/[0.08] text-white border border-white/[0.08]"
                          : "text-white/40 hover:text-white/60 hover:bg-white/[0.03]"
                      }`}
                    >
                      {f} ({count})
                    </button>
                  );
                })}
              </div>
            )}

            <div className="space-y-3">
            {jobs.filter(j => filter === "all" ? true : j.status === filter).map((job) => (
              <a
                key={job.id}
                href={`/clip/${job.id}`}
                className="card gradient-border p-4 md:p-5 flex items-center gap-4 hover:border-brand-500/20 transition-all duration-300 block group"
              >
                {/* Status icon */}
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                  job.status === "completed"
                    ? "bg-neon-500/10 text-neon-400 group-hover:bg-neon-500/15"
                    : job.status === "failed"
                    ? "bg-hot-500/10 text-hot-400 group-hover:bg-hot-500/15"
                    : "bg-brand-500/10 text-brand-400 group-hover:bg-brand-500/15"
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
                  <p className="text-white font-medium text-sm truncate group-hover:text-brand-300 transition-colors">
                    {extractVideoTitle(job.source_url)}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs text-white/50">
                      {new Date(job.created_at).toLocaleDateString()}
                    </span>
                    {job.duration_seconds && (
                      <>
                        <span className="text-xs text-white/15">·</span>
                        <span className="text-xs text-white/50">
                          {Math.round(job.duration_seconds / 60)} min
                        </span>
                      </>
                    )}
                    {job.status === "failed" && (
                      <>
                        <span className="text-xs text-white/15">·</span>
                        <span className="text-xs text-hot-400 font-medium">Failed</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Arrow */}
                {/* Clip count or arrow */}
                {job.status === "completed" && job.clips ? (
                  <span className="text-xs font-medium text-neon-400 bg-neon-500/10 px-2.5 py-1 rounded-lg shrink-0">
                    {job.clips.length} clips
                  </span>
                ) : (
                  <ArrowRight className="w-4 h-4 text-white/10 group-hover:text-brand-400 group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0" />
                )}
              </a>
            ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
