import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getPresignedDownloadUrl } from "@/utils/r2";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const key = request.nextUrl.searchParams.get("key");
  const expectedPrefix = `clips/${user.id}/`;
  if (!key || key.includes("..") || !key.startsWith(expectedPrefix) || !key.endsWith(".mp4")) {
    return NextResponse.json({ error: "Invalid key" }, { status: 400 });
  }

  const stream = request.nextUrl.searchParams.get("stream");

  if (stream === "true") {
    // Proxy download through server — forces browser to save file
    const r2 = new S3Client({
      region: "auto",
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
      },
    });

    const resp = await r2.send(new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
    }));

    const filename = request.nextUrl.searchParams.get("name") || "clip.mp4";

    return new NextResponse(resp.Body as ReadableStream, {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": resp.ContentLength?.toString() || "",
      },
    });
  }

  // Default: return presigned URL (for video preview)
  const url = await getPresignedDownloadUrl(key, 3600);
  return NextResponse.json({ url });
}
