import type { Metadata } from "next";
import { Scissors } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Turn a Podcast Into TikTok Clips in 2 Minutes",
  description:
    "Learn the fastest way to turn any podcast episode into viral TikTok clips. No editing skills needed — just paste a YouTube link and get 3-5 vertical clips with captions.",
  keywords: [
    "how to turn podcast into tiktok clips",
    "podcast to tiktok",
    "podcast clips for tiktok",
    "tiktok clips from podcast",
  ],
  alternates: { canonical: "https://clippified.com/blog/how-to-turn-podcast-into-tiktok-clips" },
};

export default function Post() {
  return (
    <div className="min-h-screen ambient-glow">
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
          <a href="/" className="flex items-center gap-2">
            <Scissors className="w-6 h-6 text-brand-500" />
            <span className="font-display text-xl font-bold text-white">
              Clippi<span className="text-brand-400">fied</span>
            </span>
          </a>

          <div className="hidden md:flex items-center bg-white/[0.04] rounded-xl border border-white/[0.06] p-1">
            <a href="/dashboard" className="text-sm text-white/50 hover:text-white px-4 py-2 rounded-lg hover:bg-white/[0.06] transition-all">
              Dashboard
            </a>
            <a href="/clip" className="text-sm text-white/50 hover:text-white px-4 py-2 rounded-lg hover:bg-white/[0.06] transition-all">
              Create
            </a>
            <a href="/pricing" className="text-sm text-white/50 hover:text-white px-4 py-2 rounded-lg hover:bg-white/[0.06] transition-all">
              Pricing
            </a>
            <a href="/blog" className="text-sm font-medium text-white px-4 py-2 rounded-lg bg-white/[0.08] border border-white/[0.08]">
              Blog
            </a>
            <a href="/contact" className="text-sm text-white/50 hover:text-white px-4 py-2 rounded-lg hover:bg-white/[0.06] transition-all">
              Contact
            </a>
          </div>

          <a href="/signin" className="btn-primary text-sm !py-2 !px-5">Get Started Free</a>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <div className="mb-8">
          <a href="/blog" className="text-brand-400 text-sm hover:text-brand-300">&larr; Back to Blog</a>
        </div>

        <time className="text-xs text-white/25 uppercase tracking-wider">March 18, 2026 &middot; 4 min read</time>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-white mt-4 mb-8 tracking-tight leading-tight">
          How to Turn a Podcast Into TikTok Clips in 2 Minutes
        </h1>

        <div className="prose-dark space-y-6 text-white/60 leading-relaxed text-lg">
          <p>
            If you publish a podcast, you already have a goldmine of short-form content sitting in every episode.
            The problem? Extracting it takes forever. Most podcasters spend 3+ hours per episode manually scrubbing
            through audio, finding clip-worthy moments, cropping to vertical, and adding captions.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Why podcast clips on TikTok matter</h2>
          <p>
            TikTok and Instagram Reels are the fastest-growing discovery platforms in 2026. Short podcast clips
            consistently outperform other content types because they offer genuine insight, emotion, and personality
            that polished brand content can&apos;t match. Creators who repurpose their podcast for TikTok see
            3-5x faster audience growth compared to those who only publish the full episode.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">The old way: Manual clipping</h2>
          <p>
            Traditionally, turning a podcast into TikTok clips meant: watching/listening to the full episode,
            noting timestamps, importing into editing software, cutting clips, resizing from landscape to 9:16,
            adding captions manually (or paying for a caption tool), exporting, and uploading. For a 60-minute
            episode, this easily takes 3-4 hours. Hiring an editor costs $200-500 per episode.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">The fast way: Clippified</h2>
          <p>
            <a href="https://clippified.com" className="text-brand-400 hover:text-brand-300">Clippified</a> automates
            the entire workflow in 3 steps:
          </p>
          <ol className="list-decimal list-inside space-y-3 text-white/50">
            <li><strong className="text-white/70">Paste your YouTube link</strong> — No downloading, no file management. Just the URL.</li>
            <li><strong className="text-white/70">AI finds the best moments</strong> — Every word is transcribed and analyzed for hooks, hot takes, emotional peaks, funny moments, and quotable soundbites. You get 3-5 clips ranked by virality score.</li>
            <li><strong className="text-white/70">Download ready-to-post clips</strong> — Each clip is cropped to 9:16 vertical with word-by-word animated captions burned in. Download the MP4 and post directly to TikTok, Reels, or Shorts.</li>
          </ol>
          <p>The whole process takes about 2 minutes for a 60-minute episode.</p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">What makes a good podcast clip for TikTok?</h2>
          <p>The best performing podcast clips have these qualities:</p>
          <ul className="list-disc list-inside space-y-2 text-white/50">
            <li><strong className="text-white/70">Strong hook in the first 2 seconds</strong> — A bold statement, surprising stat, or provocative question</li>
            <li><strong className="text-white/70">Emotional intensity</strong> — Anger, humor, inspiration, or vulnerability</li>
            <li><strong className="text-white/70">Self-contained story</strong> — The clip should make sense without the full episode context</li>
            <li><strong className="text-white/70">30-90 seconds long</strong> — Long enough to deliver value, short enough to hold attention</li>
            <li><strong className="text-white/70">Readable captions</strong> — 85% of social media is watched on mute</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Start clipping today</h2>
          <p>
            Every podcast episode you publish without short-form clips is growth you&apos;re leaving on the table.
            <a href="https://clippified.com" className="text-brand-400 hover:text-brand-300"> Try Clippified for free</a> — 1 video per month, no credit card required.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-16 card p-10 text-center">
          <h2 className="font-display text-2xl font-bold text-white mb-3">Try Clippified Free</h2>
          <p className="text-white/40 mb-6">Paste a YouTube link. Get viral clips in 2 minutes.</p>
          <a href="/signin" className="btn-primary inline-flex">Get Started Free</a>
        </div>
      </article>
    </div>
  );
}
