import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body?.record?.email;

    if (!email) {
      return NextResponse.json({ error: "No email" }, { status: 400 });
    }

    const cleaned = email.toLowerCase().trim();
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.log("No RESEND_API_KEY, skipping welcome email for", cleaned);
      return NextResponse.json({ success: true });
    }

    const resend = new Resend(resendKey);
    const from = process.env.RESEND_FROM_EMAIL || "Clippified <noreply@clippified.com>";

    const firstName = body?.record?.raw_user_meta_data?.full_name?.split(" ")[0]
      || body?.record?.raw_user_meta_data?.name?.split(" ")[0]
      || "";

    const subject = firstName
      ? `${firstName}, welcome to Clippified`
      : "Welcome to Clippified — let's make your first clips";

    await resend.emails.send({
      from,
      to: cleaned,
      subject,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 520px; margin: 0 auto; padding: 40px 24px;">

    <div style="text-align: center; margin-bottom: 32px;">
      <span style="font-size: 28px; font-weight: 800; color: #f59e0b; letter-spacing: -1px;">Clippified</span>
    </div>

    <div style="background: white; border-radius: 16px; padding: 36px 32px; border: 1px solid #e2e8f0;">
      <h1 style="font-size: 22px; color: #0f172a; margin: 0 0 8px 0; font-weight: 700;">
        ${firstName ? `Hey ${firstName}, welcome!` : "Welcome to Clippified!"}
      </h1>
      <p style="font-size: 15px; color: #475569; line-height: 1.7; margin: 0 0 24px 0;">
        You're ready to turn any podcast or long-form video into viral short clips. Here's how to get started:
      </p>

      <div style="margin-bottom: 28px;">
        <div style="display: flex; gap: 12px; margin-bottom: 16px;">
          <div style="width: 28px; height: 28px; border-radius: 50%; background: #f59e0b; color: white; font-size: 13px; font-weight: 700; text-align: center; line-height: 28px; flex-shrink: 0;">1</div>
          <div>
            <p style="font-size: 15px; color: #0f172a; font-weight: 600; margin: 2px 0 4px 0;">Paste a YouTube link</p>
            <p style="font-size: 14px; color: #64748b; margin: 0; line-height: 1.5;">Or upload any video up to 2 hours long.</p>
          </div>
        </div>
        <div style="display: flex; gap: 12px; margin-bottom: 16px;">
          <div style="width: 28px; height: 28px; border-radius: 50%; background: #f59e0b; color: white; font-size: 13px; font-weight: 700; text-align: center; line-height: 28px; flex-shrink: 0;">2</div>
          <div>
            <p style="font-size: 15px; color: #0f172a; font-weight: 600; margin: 2px 0 4px 0;">AI finds the best moments</p>
            <p style="font-size: 14px; color: #64748b; margin: 0; line-height: 1.5;">Hooks, hot takes, emotional peaks — ranked by virality score.</p>
          </div>
        </div>
        <div style="display: flex; gap: 12px;">
          <div style="width: 28px; height: 28px; border-radius: 50%; background: #f59e0b; color: white; font-size: 13px; font-weight: 700; text-align: center; line-height: 28px; flex-shrink: 0;">3</div>
          <div>
            <p style="font-size: 15px; color: #0f172a; font-weight: 600; margin: 2px 0 4px 0;">Download and post</p>
            <p style="font-size: 14px; color: #64748b; margin: 0; line-height: 1.5;">9:16 cropped, animated captions, ready for TikTok, Reels & Shorts.</p>
          </div>
        </div>
      </div>

      <div style="text-align: center; margin-bottom: 24px;">
        <a href="https://clippified.com/dashboard" style="display: inline-block; background: #f59e0b; color: white; font-size: 15px; font-weight: 600; padding: 14px 36px; border-radius: 10px; text-decoration: none;">
          Start Clipping
        </a>
      </div>

      <p style="font-size: 13px; color: #94a3b8; text-align: center; margin: 0; line-height: 1.5;">
        Your free plan includes 1 video per month. Upgrade anytime for more.
      </p>
    </div>

    <div style="text-align: center; margin-top: 28px;">
      <p style="font-size: 13px; color: #94a3b8; margin: 0 0 4px 0;">Need help?</p>
      <a href="https://clippified.com/contact" style="font-size: 13px; color: #f59e0b; text-decoration: none;">Contact our team →</a>
    </div>

    <div style="text-align: center; margin-top: 32px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
      <p style="font-size: 11px; color: #cbd5e1; margin: 0;">
        Clippified — AI-Powered Clip Generator<br>
        <a href="https://clippified.com" style="color: #94a3b8; text-decoration: none;">clippified.com</a>
      </p>
    </div>
  </div>
</body>
</html>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Welcome email error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
