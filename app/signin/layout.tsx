import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sign In — Clippified",
  description: "Sign in to Clippified to start turning podcasts into viral clips for TikTok, Reels, and YouTube Shorts.",
};

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
