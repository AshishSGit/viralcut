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
<body style="margin: 0; padding: 0; background: #0B0E13; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 520px; margin: 0 auto; padding: 48px 24px;">

    <!-- Logo -->
    <div style="text-align: center; margin-bottom: 40px;">
      <span style="font-size: 30px; font-weight: 800; color: #f59e0b; letter-spacing: -1px;">Clippi</span><span style="font-size: 30px; font-weight: 800; color: #fbbf24; letter-spacing: -1px;">fied</span>
    </div>

    <!-- Main card -->
    <div style="background: #161B23; border-radius: 20px; padding: 40px 36px; border: 1px solid rgba(255,255,255,0.08);">

      <!-- Greeting -->
      <h1 style="font-size: 26px; color: #ffffff; margin: 0 0 6px 0; font-weight: 700; letter-spacing: -0.5px;">
        ${firstName ? `Welcome, ${firstName}!` : "Welcome to Clippified!"}
      </h1>
      <p style="font-size: 15px; color: #94a3b8; line-height: 1.7; margin: 0 0 32px 0;">
        You just unlocked the fastest way to turn long videos into viral short clips. Here's how it works:
      </p>

      <!-- Steps -->
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 0 0 20px 0; vertical-align: top; width: 44px;">
            <div style="width: 32px; height: 32px; border-radius: 10px; background: linear-gradient(135deg, #f59e0b, #d97706); color: #0B0E13; font-size: 14px; font-weight: 700; text-align: center; line-height: 32px;">1</div>
          </td>
          <td style="padding: 0 0 20px 0; vertical-align: top;">
            <p style="font-size: 15px; color: #ffffff; font-weight: 600; margin: 4px 0 4px 0;">Upload any video</p>
            <p style="font-size: 13px; color: #64748b; margin: 0; line-height: 1.5;">Drop an MP4 or paste a YouTube URL. Up to 2 hours long.</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 0 0 20px 0; vertical-align: top; width: 44px;">
            <div style="width: 32px; height: 32px; border-radius: 10px; background: linear-gradient(135deg, #f59e0b, #d97706); color: #0B0E13; font-size: 14px; font-weight: 700; text-align: center; line-height: 32px;">2</div>
          </td>
          <td style="padding: 0 0 20px 0; vertical-align: top;">
            <p style="font-size: 15px; color: #ffffff; font-weight: 600; margin: 4px 0 4px 0;">AI finds viral moments</p>
            <p style="font-size: 13px; color: #64748b; margin: 0; line-height: 1.5;">Hooks, hot takes, emotional peaks — ranked by virality score.</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 0 0 0 0; vertical-align: top; width: 44px;">
            <div style="width: 32px; height: 32px; border-radius: 10px; background: linear-gradient(135deg, #f59e0b, #d97706); color: #0B0E13; font-size: 14px; font-weight: 700; text-align: center; line-height: 32px;">3</div>
          </td>
          <td style="padding: 0 0 0 0; vertical-align: top;">
            <p style="font-size: 15px; color: #ffffff; font-weight: 600; margin: 4px 0 4px 0;">Download & post</p>
            <p style="font-size: 13px; color: #64748b; margin: 0; line-height: 1.5;">9:16 vertical, auto-captioned, ready for TikTok, Reels & Shorts.</p>
          </td>
        </tr>
      </table>

      <!-- CTA -->
      <div style="text-align: center; margin: 36px 0 20px 0;">
        <a href="https://clippified.com/clip" style="display: inline-block; background: linear-gradient(135deg, #f59e0b, #d97706); color: #0B0E13; font-size: 16px; font-weight: 700; padding: 16px 48px; border-radius: 14px; text-decoration: none; letter-spacing: -0.3px;">
          Create Your First Clip →
        </a>
      </div>

      <p style="font-size: 12px; color: #475569; text-align: center; margin: 0; line-height: 1.5;">
        Free plan: 1 video/month • No credit card needed
      </p>
    </div>

    <!-- Help link -->
    <div style="text-align: center; margin-top: 28px;">
      <a href="https://clippified.com/contact" style="font-size: 13px; color: #f59e0b; text-decoration: none;">Questions? We're here to help →</a>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 32px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.06);">
      <p style="font-size: 11px; color: #475569; margin: 0;">
        Clippified — AI-Powered Clip Generator<br>
        <a href="https://clippified.com" style="color: #64748b; text-decoration: none;">clippified.com</a>
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
