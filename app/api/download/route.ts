import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getPresignedDownloadUrl } from "@/utils/r2";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const key = request.nextUrl.searchParams.get("key");
  // Strict validation: only allow clips under this user's directory, no path traversal
  const expectedPrefix = `clips/${user.id}/`;
  if (!key || key.includes("..") || !key.startsWith(expectedPrefix) || !key.endsWith(".mp4")) {
    return NextResponse.json({ error: "Invalid key" }, { status: 400 });
  }

  const url = await getPresignedDownloadUrl(key, 3600);
  return NextResponse.json({ url });
}
