import type { Metadata } from "next";
import { Scissors } from "lucide-react";

export const metadata: Metadata = {
  title: "YouTube to Shorts: The Complete Guide for Creators",
  description:
    "YouTube Shorts get 70 billion daily views. Learn how to extract the best moments from long-form YouTube videos and turn them into Shorts that drive subscribers.",
  keywords: [
    "youtube to shorts",
    "youtube shorts maker",
    "video to shorts",
    "turn youtube video into shorts",
    "youtube shorts from long video",
  ],
  alternates: { canonical: "https://clippified.com/blog/youtube-to-shorts-complete-guide" },
};

export default function Post() {
  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-2">
            <Scissors className="w-5 h-5 text-brand-500" />
            <span className="font-display text-lg font-bold text-white">
              Clippi<span className="text-brand-400">fied</span>
            </span>
          </a>
          <a href="/signin" className="btn-primary text-sm !py-2 !px-5">Get Started Free</a>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <div className="mb-8">
          <a href="/blog" className="text-brand-400 text-sm hover:text-brand-300">&larr; Back to Blog</a>
        </div>

        <time className="text-xs text-white/25 uppercase tracking-wider">March 8, 2026 &middot; 5 min read</time>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-white mt-4 mb-8 tracking-tight leading-tight">
          YouTube to Shorts: The Complete Guide for Creators
        </h1>

        <div className="prose-dark space-y-6 text-white/60 leading-relaxed text-lg">
          <p>
            YouTube Shorts now get over 70 billion daily views. For creators who publish long-form content,
            Shorts are the single best way to grow your channel in 2026. The algorithm actively promotes Shorts
            to new viewers — and each Short is a free advertisement for your full-length videos.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Why YouTube Shorts matter for channel growth</h2>
          <ul className="list-disc list-inside space-y-2 text-white/50">
            <li><strong className="text-white/70">Discovery engine</strong> — Shorts are shown to people who don&apos;t subscribe to you</li>
            <li><strong className="text-white/70">Subscriber conversion</strong> — Viewers who watch a Short and then check your channel are 5x more likely to subscribe</li>
            <li><strong className="text-white/70">Algorithm boost</strong> — Channels that post Shorts regularly get higher overall impressions on long-form content too</li>
            <li><strong className="text-white/70">Cross-platform reach</strong> — The same 9:16 clip works on TikTok, Reels, and Shorts simultaneously</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">How to pick moments from long videos</h2>
          <p>The best Shorts from long-form videos share these traits:</p>
          <ul className="list-disc list-inside space-y-2 text-white/50">
            <li><strong className="text-white/70">Strong first frame</strong> — The first 1-2 seconds determine if someone keeps watching</li>
            <li><strong className="text-white/70">Complete thought</strong> — The clip should make sense without watching the full video</li>
            <li><strong className="text-white/70">Under 60 seconds</strong> — The sweet spot is 30-50 seconds for retention</li>
            <li><strong className="text-white/70">Emotional or surprising</strong> — Clips that trigger a reaction get shared</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">The manual process (slow)</h2>
          <p>
            Watch your video, note timestamps, open your editor, cut clips, resize from 16:9 to 9:16,
            add captions, export. For a 60-minute video, this takes 2-4 hours and you&apos;ll likely
            only make 1-2 clips because fatigue sets in.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">The automated process (fast)</h2>
          <p>
            <a href="https://clippified.com" className="text-brand-400 hover:text-brand-300">Clippified</a> does
            this in 2 minutes:
          </p>
          <ol className="list-decimal list-inside space-y-3 text-white/50">
            <li>Paste your YouTube video URL</li>
            <li>AI transcribes and analyzes every word for viral potential</li>
            <li>You get 3-5 clips, ranked by virality score, cropped to 9:16 with captions</li>
            <li>Download and upload to YouTube Shorts (and TikTok/Reels while you&apos;re at it)</li>
          </ol>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Best practices for YouTube Shorts</h2>
          <ul className="list-disc list-inside space-y-2 text-white/50">
            <li><strong className="text-white/70">Post 3-5 Shorts per week</strong> — Consistency matters more than perfection</li>
            <li><strong className="text-white/70">Add captions</strong> — Most Shorts are watched on mute</li>
            <li><strong className="text-white/70">Use a hook in the first frame</strong> — Text overlay or bold statement</li>
            <li><strong className="text-white/70">Link to the full video</strong> — In your Short&apos;s description, link back to the source video</li>
            <li><strong className="text-white/70">Post at peak times</strong> — 12-3 PM and 7-9 PM in your audience&apos;s timezone</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Start making Shorts today</h2>
          <p>
            You already have the content. You just need to extract the best parts.{" "}
            <a href="https://clippified.com" className="text-brand-400 hover:text-brand-300">Try Clippified free</a> — paste
            your YouTube link and get Shorts-ready clips in 2 minutes.
          </p>
        </div>

        <div className="mt-16 card p-10 text-center">
          <h2 className="font-display text-2xl font-bold text-white mb-3">Turn Videos Into Shorts</h2>
          <p className="text-white/40 mb-6">Paste a YouTube link. Get 9:16 clips with captions. Free to start.</p>
          <a href="/signin" className="btn-primary inline-flex">Get Started Free</a>
        </div>
      </article>
    </div>
  );
}
