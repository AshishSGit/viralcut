import { Scissors } from "lucide-react";

const posts = [
  {
    slug: "how-to-turn-podcast-into-tiktok-clips",
    title: "How to Turn a Podcast Into TikTok Clips in 2 Minutes",
    excerpt:
      "Most podcasters leave growth on the table by not repurposing episodes into short-form. Here's the fastest way to turn any podcast into viral TikTok clips — no editing skills needed.",
    date: "2026-03-18",
    readTime: "4 min read",
    keywords: "podcast to tiktok, podcast clips, tiktok clips from podcast",
  },
  {
    slug: "podcast-clip-generator-comparison",
    title: "Best Podcast Clip Generators in 2026: A Honest Comparison",
    excerpt:
      "We compared Clippified, OpusClip, Vizard, and Descript side by side. Here's which podcast clip generator actually delivers on its promises — and which ones waste your time.",
    date: "2026-03-15",
    readTime: "6 min read",
    keywords: "podcast clip generator, opus clip alternative, vizard alternative",
  },
  {
    slug: "repurpose-podcast-content-grow-audience",
    title: "How to Repurpose Podcast Content to 10x Your Audience",
    excerpt:
      "A single podcast episode contains 5-10 viral clips. Here's the step-by-step strategy top podcasters use to repurpose long-form content and grow across every platform.",
    date: "2026-03-12",
    readTime: "5 min read",
    keywords: "repurpose podcast content, podcast growth, content repurposing strategy",
  },
  {
    slug: "auto-captions-video-clips-why-they-matter",
    title: "Why Auto-Captions on Video Clips Are Non-Negotiable in 2026",
    excerpt:
      "85% of social media videos are watched on mute. If your clips don't have captions, you're invisible. Here's why auto-captions matter and how to add them instantly.",
    date: "2026-03-10",
    readTime: "3 min read",
    keywords: "auto captions for video, video captions, caption generator",
  },
  {
    slug: "youtube-to-shorts-complete-guide",
    title: "YouTube to Shorts: The Complete Guide for Creators",
    excerpt:
      "YouTube Shorts get 70 billion daily views. Learn how to extract the best moments from your long-form YouTube videos and turn them into Shorts that drive subscribers.",
    date: "2026-03-08",
    readTime: "5 min read",
    keywords: "youtube to shorts, youtube shorts maker, video to shorts",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-2">
            <Scissors className="w-5 h-5 text-brand-500" />
            <span className="font-display text-lg font-bold text-white">
              Clippi<span className="text-brand-400">fied</span>
            </span>
          </a>
          <a href="/signin" className="btn-primary text-sm !py-2 !px-5">
            Get Started Free
          </a>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
          Blog
        </h1>
        <p className="text-white/40 text-lg mb-16">
          Tips, guides, and strategies for repurposing content and growing your audience with short-form video.
        </p>

        <div className="space-y-10">
          {posts.map((post) => (
            <article key={post.slug} className="card p-8">
              <time className="text-xs text-white/25 uppercase tracking-wider">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                {" "}
                &middot; {post.readTime}
              </time>
              <h2 className="font-display text-xl md:text-2xl font-bold text-white mt-3 mb-3">
                {post.title}
              </h2>
              <p className="text-white/45 leading-relaxed mb-4">{post.excerpt}</p>
              <a
                href={`/blog/${post.slug}`}
                className="text-brand-400 text-sm font-semibold hover:text-brand-300 transition-colors"
              >
                Read more &rarr;
              </a>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 card p-10 text-center">
          <h2 className="font-display text-2xl font-bold text-white mb-3">
            Ready to start clipping?
          </h2>
          <p className="text-white/40 mb-6">
            Turn any podcast or YouTube video into viral clips in 2 minutes. Free to start.
          </p>
          <a href="/signin" className="btn-primary inline-flex items-center gap-2">
            Try Clippified Free
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2">
            <Scissors className="w-4 h-4 text-brand-500" />
            <span className="font-display text-base font-bold text-white">
              Clippi<span className="text-brand-400">fied</span>
            </span>
          </a>
          <div className="flex items-center gap-6 text-sm text-white/25">
            <a href="/blog" className="hover:text-white transition-colors">Blog</a>
            <a href="/contact" className="hover:text-white transition-colors">Contact</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms</a>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
            <span>&copy; {new Date().getFullYear()} Clippified</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
