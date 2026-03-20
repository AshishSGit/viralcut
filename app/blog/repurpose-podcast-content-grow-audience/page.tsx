import type { Metadata } from "next";
import { Scissors } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Repurpose Podcast Content to 10x Your Audience",
  description:
    "A step-by-step strategy for repurposing podcast episodes into TikTok clips, Reels, Shorts, and social media posts. Grow your audience 10x with content you already have.",
  keywords: [
    "repurpose podcast content",
    "podcast content strategy",
    "podcast growth",
    "content repurposing strategy",
    "podcast to social media",
  ],
  alternates: { canonical: "https://clippified.com/blog/repurpose-podcast-content-grow-audience" },
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

        <time className="text-xs text-white/25 uppercase tracking-wider">March 12, 2026 &middot; 5 min read</time>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-white mt-4 mb-8 tracking-tight leading-tight">
          How to Repurpose Podcast Content to 10x Your Audience
        </h1>

        <div className="prose-dark space-y-6 text-white/60 leading-relaxed text-lg">
          <p>
            A single 60-minute podcast episode contains 5-10 clips worth posting on social media. Most podcasters
            publish the full episode and move on — leaving 90% of their content&apos;s potential on the table.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">The content multiplication framework</h2>
          <p>Here&apos;s how top podcasters turn one episode into 10+ pieces of content:</p>
          <ol className="list-decimal list-inside space-y-4 text-white/50">
            <li><strong className="text-white/70">Full episode</strong> — Publish on YouTube, Spotify, Apple Podcasts</li>
            <li><strong className="text-white/70">3-5 short clips</strong> — Post on TikTok, Reels, and Shorts with captions</li>
            <li><strong className="text-white/70">Quote graphics</strong> — Pull the best one-liners and create static posts for Instagram/LinkedIn</li>
            <li><strong className="text-white/70">Blog post</strong> — Summarize key takeaways for SEO (drives organic traffic to your podcast)</li>
            <li><strong className="text-white/70">Email newsletter</strong> — Share highlights with your subscriber list</li>
            <li><strong className="text-white/70">Twitter/X thread</strong> — Turn the episode&apos;s main argument into a thread</li>
          </ol>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Short-form clips drive the most growth</h2>
          <p>
            Of all repurposing formats, short-form video clips drive the most new listeners. Here&apos;s why:
          </p>
          <ul className="list-disc list-inside space-y-2 text-white/50">
            <li>TikTok and Reels are discovery-first platforms — people see content from creators they don&apos;t follow</li>
            <li>A 60-second clip with a strong hook can reach 100K+ people organically</li>
            <li>Video clips build familiarity faster than audio — viewers see your face, energy, and personality</li>
            <li>Each clip is a free advertisement for your full episode</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">How to find clip-worthy moments</h2>
          <p>Not every moment is worth clipping. Look for:</p>
          <ul className="list-disc list-inside space-y-2 text-white/50">
            <li><strong className="text-white/70">Hot takes</strong> — Contrarian opinions that make people stop scrolling</li>
            <li><strong className="text-white/70">Emotional peaks</strong> — Laughter, passion, vulnerability, anger</li>
            <li><strong className="text-white/70">Surprising stats or facts</strong> — Numbers that challenge assumptions</li>
            <li><strong className="text-white/70">Personal stories</strong> — Authentic moments that build connection</li>
            <li><strong className="text-white/70">Actionable advice</strong> — Tips people can use immediately</li>
          </ul>
          <p>
            Or skip the manual work entirely —{" "}
            <a href="https://clippified.com" className="text-brand-400 hover:text-brand-300">Clippified</a> analyzes
            your transcript and finds these moments automatically in about 2 minutes.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">The consistency advantage</h2>
          <p>
            The podcasters who grow fastest aren&apos;t the ones with the best content — they&apos;re the ones who
            post clips consistently. Aim for 3-5 clips per episode, posted over the week between episodes. This
            keeps your audience engaged and drives a steady stream of new listeners.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Start repurposing today</h2>
          <p>
            Every episode you&apos;ve already published is a library of untapped clips.{" "}
            <a href="https://clippified.com" className="text-brand-400 hover:text-brand-300">Try Clippified free</a> and
            turn your next episode into 5 ready-to-post clips in 2 minutes.
          </p>
        </div>

        <div className="mt-16 card p-10 text-center">
          <h2 className="font-display text-2xl font-bold text-white mb-3">Start Repurposing</h2>
          <p className="text-white/40 mb-6">Turn one episode into 5 clips. Free to start.</p>
          <a href="/signin" className="btn-primary inline-flex">Get Started Free</a>
        </div>
      </article>
    </div>
  );
}
