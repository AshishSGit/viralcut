import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_URL || "https://clippified.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Clippified — AI Viral Clip Generator for Podcasts",
    template: "%s | Clippified",
  },
  description:
    "Paste a YouTube link. AI finds the most viral moments, crops to 9:16, adds captions, and exports clips for TikTok, Reels & Shorts. Free to start.",
  keywords: [
    "podcast clip generator",
    "AI video clipper",
    "podcast to shorts",
    "viral clip finder",
    "auto captions",
    "podcast repurposing",
    "talking head video clipper",
    "tiktok clip maker",
    "reels generator",
    "youtube shorts maker",
    "clippified",
  ],
  openGraph: {
    title: "Clippified — AI Viral Clip Generator for Podcasts",
    description:
      "Paste a YouTube link. AI finds viral moments, crops to 9:16, adds captions, exports for TikTok/Reels/Shorts.",
    type: "website",
    url: BASE_URL,
    siteName: "Clippified",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clippified — AI Viral Clip Generator for Podcasts",
    description:
      "Paste a YouTube link. AI finds viral moments, crops to 9:16, adds captions, exports for TikTok/Reels/Shorts.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
