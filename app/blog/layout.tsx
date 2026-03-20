import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Podcast Clipping Tips & Guides",
  description:
    "Learn how to repurpose podcasts into viral TikTok clips, Reels, and YouTube Shorts. Tips on content repurposing, video editing, and growing your audience.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
