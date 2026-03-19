import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { createAdminClient } from "@/utils/supabase/admin";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();
  const { data: plan } = await admin
    .from("user_plans")
    .select("plan, monthly_usage, usage_reset_at")
    .eq("user_id", user.id)
    .single();

  const now = new Date();
  const resetAt = plan?.usage_reset_at ? new Date(plan.usage_reset_at) : null;
  const needsReset = !resetAt || now > resetAt;

  const limits: Record<string, number> = { free: 1, pro: 10, unlimited: 999999 };
  const currentPlan = plan?.plan || "free";

  return NextResponse.json({
    plan: currentPlan,
    usage: needsReset ? 0 : (plan?.monthly_usage || 0),
    limit: limits[currentPlan] || 1,
  });
}
