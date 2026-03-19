import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Create Clips",
  description: "Paste a YouTube URL or upload a video. AI finds viral moments and generates ready-to-post clips in minutes.",
};

export default function ClipLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
