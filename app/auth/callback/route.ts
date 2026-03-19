import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

const BASE = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const code = searchParams.get("code");
  const rawNext = searchParams.get("next") ?? "/clip";
  const next = rawNext.startsWith("/") ? rawNext : "/clip";

  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ token_hash, type: type as "magiclink" | "email" });
    if (!error) {
      return NextResponse.redirect(`${BASE}${next}`);
    }
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${BASE}${next}`);
    }
  }

  return NextResponse.redirect(`${BASE}/signin?error=auth_failed`);
}
