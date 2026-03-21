import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { createAdminClient } from "@/utils/supabase/admin";

const STALE_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const jobId = request.nextUrl.searchParams.get("id");
  if (!jobId) {
    return NextResponse.json({ error: "Job ID required" }, { status: 400 });
  }

  const { data: job } = await supabase
    .from("jobs")
    .select("id, status, clips, error, duration_seconds, created_at, completed_at")
    .eq("id", jobId)
    .eq("user_id", user.id)
    .single();

  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  // Auto-fail stale jobs that have been processing for over 10 minutes
  if (job.status !== "completed" && job.status !== "failed") {
    const age = Date.now() - new Date(job.created_at).getTime();
    if (age > STALE_TIMEOUT_MS) {
      const admin = createAdminClient();
      await admin.from("jobs").update({
        status: "failed",
        error: "Processing timed out. Please try again with a shorter video.",
      }).eq("id", job.id);
      job.status = "failed";
      job.error = "Processing timed out. Please try again with a shorter video.";
    }
  }

  return NextResponse.json(job);
}
