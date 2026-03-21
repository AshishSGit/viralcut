import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const GA_ID = "G-JCL36NFNZF";

const BASE_URL = process.env.NEXT_PUBLIC_URL || "https://clippified.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Clippified — Turn Videos Into Viral Clips",
    template: "%s | Clippified",
  },
  description:
    "Paste any YouTube link. Clippified finds the most shareable moments, crops to 9:16, adds captions, and exports clips for TikTok, Reels & Shorts. Free to start.",
  keywords: [
    "video clip generator",
    "podcast clip generator",
    "youtube to tiktok",
    "viral clip finder",
    "auto captions",
    "video repurposing tool",
    "tiktok clip maker",
    "reels generator",
    "youtube shorts maker",
    "video to shorts",
    "clippified",
    "how to turn podcast into tiktok clips",
    "podcast to shorts",
    "repurpose podcast content",
    "auto captions for video clips",
    "podcast repurposing tool",
    "ai video clipper",
    "podcast to reels",
    "turn youtube video into shorts",
    "best podcast clip generator 2026",
    "opus clip alternative",
  ],
  alternates: {
    canonical: "https://clippified.com",
  },
  openGraph: {
    title: "Clippified — Turn Videos Into Viral Clips",
    description:
      "Paste a YouTube link. Clippified finds the most shareable moments, crops to 9:16, adds captions, exports for TikTok/Reels/Shorts.",
    type: "website",
    url: BASE_URL,
    siteName: "Clippified",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clippified — Turn Videos Into Viral Clips",
    description:
      "Paste a YouTube link. Clippified finds the most shareable moments, crops to 9:16, adds captions, exports for TikTok/Reels/Shorts.",
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
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
