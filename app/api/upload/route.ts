import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { createAdminClient } from "@/utils/supabase/admin";
import { uploadToR2 } from "@/utils/r2";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();

  // Check usage limits
  const { data: plan } = await admin
    .from("user_plans")
    .select("plan, monthly_usage, usage_reset_at")
    .eq("user_id", user.id)
    .single();

  const currentPlan = plan?.plan || "free";
  const usage = plan?.monthly_usage || 0;
  const isDev = process.env.NODE_ENV === "development";
  const limits: Record<string, number> = { free: isDev ? 100 : 1, pro: 10, unlimited: 999999 };
  const maxVideos = limits[currentPlan] || 1;

  // Reset monthly usage if needed
  const now = new Date();
  const resetAt = plan?.usage_reset_at ? new Date(plan.usage_reset_at) : null;
  const needsReset = !resetAt || now > resetAt;
  const effectiveUsage = needsReset ? 0 : usage;

  if (effectiveUsage >= maxVideos) {
    return NextResponse.json(
      { error: "Monthly limit reached. Upgrade your plan for more videos." },
      { status: 429 }
    );
  }

  // Parse request
  const formData = await request.formData();
  const sourceType = formData.get("source_type") as string; // "url" or "upload"
  const sourceUrl = formData.get("source_url") as string | null;
  const file = formData.get("file") as File | null;

  if (sourceType === "url" && !sourceUrl) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }
  if (sourceType === "upload" && !file) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  let sourceR2Key: string | null = null;

  // If file upload, store in R2
  if (sourceType === "upload" && file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const key = `uploads/${user.id}/${Date.now()}-${file.name}`;
    await uploadToR2(key, buffer, file.type);
    sourceR2Key = key;
  }

  // Create job in Supabase
  const { data: job, error: jobError } = await admin
    .from("jobs")
    .insert({
      user_id: user.id,
      status: "pending",
      source_type: sourceType,
      source_url: sourceUrl || null,
      source_r2_key: sourceR2Key,
    })
    .select("id")
    .single();

  if (jobError || !job) {
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }

  // Update usage
  const nextReset = new Date(now);
  nextReset.setMonth(nextReset.getMonth() + 1);
  nextReset.setDate(1);
  nextReset.setHours(0, 0, 0, 0);

  await admin.from("user_plans").upsert({
    user_id: user.id,
    plan: currentPlan,
    monthly_usage: (needsReset ? 0 : usage) + 1,
    usage_reset_at: needsReset ? nextReset.toISOString() : plan?.usage_reset_at,
  });

  // Fire worker (fire-and-forget)
  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
  fetch(`${baseUrl}/api/worker`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ job_id: job.id, service_key: process.env.SUPABASE_SERVICE_ROLE_KEY }),
  }).catch(() => {});

  return NextResponse.json({ job_id: job.id });
}
