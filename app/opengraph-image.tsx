import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Clippified — Turn Videos Into Viral Clips";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #030507 0%, #0a0d12 50%, #111318 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            width: "600px",
            height: "300px",
            background: "radial-gradient(ellipse, rgba(245,158,11,0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Scissors icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <svg
            width="56"
            height="56"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="6" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <line x1="20" y1="4" x2="8.58" y2="15.42" />
            <line x1="14.82" y1="12.24" x2="20" y2="20" />
            <line x1="8.58" y1="8.58" x2="20" y2="20" />
          </svg>
          <span
            style={{
              fontSize: "52px",
              fontWeight: 700,
              color: "white",
              letterSpacing: "-1px",
            }}
          >
            Clippi
            <span style={{ color: "#fbbf24" }}>fied</span>
          </span>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: "36px",
            fontWeight: 700,
            color: "white",
            margin: "0 0 12px 0",
            textAlign: "center",
          }}
        >
          Your podcast, clippified.
        </p>

        <p
          style={{
            fontSize: "20px",
            color: "rgba(255,255,255,0.5)",
            margin: "0",
            textAlign: "center",
            maxWidth: "700px",
          }}
        >
          AI finds viral moments, crops to 9:16, adds captions, exports for TikTok, Reels & Shorts.
        </p>

        {/* Bottom badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "40px",
            background: "rgba(245,158,11,0.1)",
            border: "1px solid rgba(245,158,11,0.2)",
            borderRadius: "9999px",
            padding: "8px 20px",
          }}
        >
          <span style={{ fontSize: "16px", color: "#fbbf24", fontWeight: 600 }}>
            Free to start — clippified.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
