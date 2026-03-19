"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Scissors,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowRight,
  LogOut,
  Sparkles,
  Plus,
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
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/signin");
        return;
      }

      // Get jobs
      const { data } = await supabase
        .from("jobs")
        .select("id, status, source_type, source_url, duration_seconds, clips, error, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(20);

      setJobs(data || []);

      // Get usage
      const res = await fetch("/api/pro-status");
      if (res.ok) setUsage(await res.json());

      setLoading(false);
    }
    load();
  }, [supabase, router]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  const statusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-neon-400" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-hot-400" />;
      default:
        return <Loader2 className="w-5 h-5 text-brand-400 animate-spin" />;
    }
  };

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
          <div className="flex items-center gap-4">
            <a href="/clip" className="text-sm text-brand-400 hover:text-brand-300 flex items-center gap-1">
              <Plus className="w-4 h-4" /> New Clip
            </a>
            <a href="/pricing" className="text-sm text-slate-400 hover:text-white flex items-center gap-1">
              <Sparkles className="w-4 h-4" /> Upgrade
            </a>
            <button onClick={handleSignOut} className="text-sm text-slate-500 hover:text-white">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-28 pb-20 px-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">Your clip history</p>
          </div>

          {/* Usage card */}
          <div className="card px-5 py-3 flex items-center gap-4">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider">Plan</p>
              <p className="text-sm font-semibold text-white capitalize">{usage.plan}</p>
            </div>
            <div className="w-px h-8 bg-dark-600" />
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider">Usage</p>
              <p className="text-sm font-semibold text-white">
                {usage.usage}/{usage.limit === 999999 ? "∞" : usage.limit}
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <Loader2 className="w-8 h-8 text-brand-500 animate-spin mx-auto" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="card p-12 text-center">
            <Scissors className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No clips yet</h3>
            <p className="text-slate-400 mb-6">Create your first viral clip from a podcast or video.</p>
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
                className="card p-5 flex items-center gap-4 hover:border-brand-500/30 transition-all block"
              >
                {statusIcon(job.status)}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">
                    {job.source_url || "Uploaded video"}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {new Date(job.created_at).toLocaleDateString()} ·{" "}
                    {job.duration_seconds ? `${Math.round(job.duration_seconds / 60)} min` : "—"} ·{" "}
                    {job.clips ? `${job.clips.length} clips` : job.status}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
