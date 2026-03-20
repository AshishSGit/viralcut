"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Scissors,
  Zap,
  Captions,
  Upload,
  Link2,
  Play,
  Check,
  CheckCircle,
  Sparkles,
  Clock,
  TrendingUp,
  Monitor,
  ChevronDown,
  Shield,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const iconSize = size === "sm" ? "w-5 h-5" : "w-6 h-6";
  const textSize = size === "sm" ? "text-lg" : "text-xl";
  return (
    <a href="/" className="flex items-center gap-2">
      <Scissors className={`${iconSize} text-brand-500`} />
      <span className={`font-display ${textSize} font-bold text-white`}>
        Clippi<span className="text-brand-400">fied</span>
      </span>
    </a>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen relative">
      <Nav />
      <Hero />
      <div className="section-glow max-w-5xl mx-auto" />
      <SocialProof />
      <div className="section-glow max-w-5xl mx-auto" />
      <HowItWorks />
      <div className="section-glow max-w-5xl mx-auto" />
      <Features />
      <div className="section-glow max-w-5xl mx-auto" />
      <Pricing />
      <div className="section-glow max-w-5xl mx-auto" />
      <FAQ />
      <Footer />
    </div>
  );
}

/* -- Nav -- */
function Nav() {
  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Logo />
        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>
        <div className="flex items-center gap-3">
          <a href="/signin" className="text-sm text-white/70 hover:text-white transition-colors">
            Sign In
          </a>
          <a href="/signin" className="btn-primary text-sm !py-2 !px-5">
            Get Started Free
          </a>
        </div>
      </div>
    </nav>
  );
}

/* -- Hero -- */
function Hero() {
  return (
    <section className="relative pt-36 pb-24 px-6 hero-gradient overflow-hidden">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          <span className="badge badge-brand uppercase tracking-widest text-xs">
            Video Clip Generator
          </span>
        </motion.div>

        <motion.h1
          className="mt-8 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] tracking-tight"
          initial="hidden" animate="visible" variants={fadeUp} custom={1}
        >
          Your content,{" "}
          <br className="hidden sm:block" />
          <span className="text-brand-400">
            clippified.
          </span>
        </motion.h1>

        <motion.p
          className="mt-8 text-xl md:text-2xl text-white/50 max-w-2xl mx-auto leading-relaxed"
          initial="hidden" animate="visible" variants={fadeUp} custom={2}
        >
          Paste any YouTube link. We find the most shareable moments, crop to 9:16,
          add animated captions, and export clips ready for TikTok, Reels & Shorts.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial="hidden" animate="visible" variants={fadeUp} custom={3}
        >
          <a href="/signin" className="btn-primary text-base flex items-center gap-2 !py-4 !px-8">
            <Zap className="w-5 h-5" />
            Start Clipping — Free
          </a>
          <a href="#how-it-works" className="btn-ghost text-base flex items-center gap-2">
            <Play className="w-4 h-4" />
            See How It Works
          </a>
        </motion.div>

        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-white/35"
          initial="hidden" animate="visible" variants={fadeUp} custom={4}
        >
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-neon-400" /> No credit card
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-neon-400" /> 1 free video/month
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-neon-400" /> Cancel anytime
          </span>
        </motion.div>

        {/* App demo mockup */}
        <motion.div
          className="mt-20 relative max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <div className="card p-6 md:p-8">
            {/* URL bar */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 flex-1 input-field !py-3">
                <Link2 className="w-4 h-4 text-white/30" />
                <span className="text-white/30 text-sm">https://youtube.com/watch?v=podcast-ep-42...</span>
              </div>
              <button className="btn-primary !py-3 !px-6 flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4" /> Clip It
              </button>
            </div>

            {/* Results */}
            <div className="bg-dark-800/50 rounded-xl p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-4 h-4 text-neon-400" />
                <span className="text-sm text-neon-400 font-semibold">5 clips ready to download</span>
                <span className="text-xs text-white/25 ml-auto">Processed in 1:47</span>
              </div>
              <div className="space-y-2">
                {[
                  { title: "Why most creators fail in the first year", score: "9.2", duration: "47s", hot: true },
                  { title: "The truth about growing on social media", score: "8.7", duration: "38s", hot: false },
                  { title: "The moment everything changed for me", score: "8.4", duration: "52s", hot: false },
                ].map((clip, i) => (
                  <div key={i} className={`flex items-center gap-3 rounded-lg px-4 py-3 ${i === 0 ? "bg-brand-500/[0.06] border border-brand-500/10" : "bg-dark-900/60"}`}>
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${i === 0 ? "bg-brand-500/20" : "bg-white/[0.04]"}`}>
                      <Play className={`w-4 h-4 ${i === 0 ? "text-brand-400" : "text-white/30"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium truncate">{clip.title}</p>
                      <p className="text-xs text-white/25">{clip.duration} clip · 9:16 vertical</p>
                    </div>
                    <span className={`text-xs font-bold ${clip.hot ? "text-brand-400" : "text-white/40"}`}>{clip.score}/10</span>
                    <button className={`text-xs px-3 py-1.5 rounded-lg font-semibold ${i === 0 ? "bg-brand-500 text-dark-950" : "bg-white/[0.05] text-white/50"}`}>
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -inset-4 bg-gradient-to-r from-brand-600/8 via-brand-500/4 to-brand-600/8 rounded-2xl blur-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
}

/* -- Social Proof -- */
function SocialProof() {
  return (
    <section className="py-16 md:py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Platform logos */}
        <p className="text-center text-xs text-white/25 uppercase tracking-widest font-medium mb-8">
          Create clips for
        </p>
        <div className="flex items-center justify-center gap-8 md:gap-14 mb-16 text-white/20">
          <span className="font-display font-bold text-lg md:text-xl">TikTok</span>
          <span className="font-display font-bold text-lg md:text-xl">Reels</span>
          <span className="font-display font-bold text-lg md:text-xl">Shorts</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="font-display text-4xl md:text-5xl font-bold text-white">3-5</p>
            <p className="text-sm text-white/35 mt-2">Clips per video</p>
          </div>
          <div>
            <p className="font-display text-4xl md:text-5xl font-bold text-white">~2<span className="text-xl text-white/40">min</span></p>
            <p className="text-sm text-white/35 mt-2">Processing time</p>
          </div>
          <div>
            <p className="font-display text-4xl md:text-5xl font-bold text-white">9:16</p>
            <p className="text-sm text-white/35 mt-2">Vertical + captions</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -- How It Works -- */
function HowItWorks() {
  const steps = [
    {
      icon: <Upload className="w-7 h-7" />,
      title: "Paste a Link",
      desc: "Paste any YouTube or TikTok URL, or upload an MP4. Supports videos up to 2 hours.",
    },
    {
      icon: <Sparkles className="w-7 h-7" />,
      title: "We Find the Gold",
      desc: "Your video is transcribed and analyzed to find hooks, hot takes, and emotional peaks.",
    },
    {
      icon: <Captions className="w-7 h-7" />,
      title: "Captions & Crop",
      desc: "Each clip is cropped to 9:16 with word-by-word animated captions, ready to post.",
    },
    {
      icon: <TrendingUp className="w-7 h-7" />,
      title: "Download & Post",
      desc: "Download your clips and post directly to TikTok, Reels, or YouTube Shorts.",
    },
  ];

  return (
    <section id="how-it-works" className="py-28 md:py-36 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
        >
          <span className="badge badge-brand">How It Works</span>
          <h2 className="mt-6 font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Video to clips in 2 minutes
          </h2>
          <p className="mt-5 text-white/40 text-lg md:text-xl">No editing skills required. Just paste and go.</p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i} className="card p-7 text-center"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1}
            >
              <div className="w-14 h-14 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400 mx-auto mb-5">
                {step.icon}
              </div>
              <div className="text-[11px] text-brand-500 font-bold mb-3 tracking-wider">STEP {i + 1}</div>
              <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -- Features -- */
function Features() {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Viral Moment Detection",
      desc: "Automatically finds hooks, hot takes, emotional peaks, funny moments, and quotable soundbites.",
    },
    {
      icon: <Captions className="w-6 h-6" />,
      title: "Animated Captions",
      desc: "Word-by-word highlighted captions burned into the video. Timed perfectly to speech.",
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Smart 9:16 Crop",
      desc: "Landscape video automatically cropped to vertical format, keeping the speaker centered.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "2-Minute Processing",
      desc: "A 60-minute video processed in about 2 minutes. No waiting around.",
    },
    {
      icon: <Link2 className="w-6 h-6" />,
      title: "YouTube & TikTok URLs",
      desc: "Just paste a link — no need to download the video first. We handle everything.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      desc: "Your videos are processed securely and automatically deleted after 24 hours.",
    },
  ];

  return (
    <section id="features" className="py-28 md:py-36 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
        >
          <span className="badge badge-neon">Features</span>
          <h2 className="mt-6 font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Everything you need to go viral
          </h2>
          <p className="mt-5 text-white/40 text-lg md:text-xl">Professional clips without the professional editing team.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i} className="card p-7"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1}
            >
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400 mb-5">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{f.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -- Pricing -- */
function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      badge: null,
      features: [
        "1 video per month",
        "Up to 30 min videos",
        "3-5 clips per video",
        "Animated captions",
        "Clippified watermark",
      ],
      cta: "Get Started Free",
      highlight: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      badge: "Most Popular",
      features: [
        "10 videos per month",
        "Up to 2 hour videos",
        "3-5 clips per video",
        "Animated captions",
        "No watermark",
        "Priority processing",
      ],
      cta: "Start Pro",
      highlight: true,
    },
    {
      name: "Unlimited",
      price: "$49",
      period: "/month",
      badge: null,
      features: [
        "Unlimited videos",
        "Up to 2 hour videos",
        "3-5 clips per video",
        "Animated captions",
        "No watermark",
        "Priority processing",
        "Early access to features",
      ],
      cta: "Go Unlimited",
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-28 md:py-36 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
        >
          <span className="badge badge-hot">Pricing</span>
          <h2 className="mt-6 font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Simple pricing, no surprises
          </h2>
          <p className="mt-5 text-white/40 text-lg md:text-xl">Start free. Upgrade when you need more.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              className={`card p-8 flex flex-col ${plan.highlight ? "pricing-pro" : ""}`}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1}
            >
              {plan.badge && (
                <span className="badge badge-brand mb-5 self-start">{plan.badge}</span>
              )}
              <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-5xl font-bold text-white">{plan.price}</span>
                <span className="text-white/30 text-sm">{plan.period}</span>
              </div>
              <ul className="mt-8 space-y-3.5 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2.5 text-sm text-white/60">
                    <Check className="w-4 h-4 text-neon-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="/signin"
                className={`mt-10 block text-center py-3.5 rounded-xl font-bold transition-all ${
                  plan.highlight ? "btn-primary" : "btn-ghost"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -- FAQ -- */
function FAQ() {
  const faqs = [
    {
      q: "What types of videos work best?",
      a: "Clippified works with podcasts, interviews, vlogs, webinars, lectures, and any video with speech. It analyzes the transcript to find hooks, hot takes, stories, and emotional moments.",
    },
    {
      q: "How long does processing take?",
      a: "A 60-minute video typically takes 2-4 minutes. You'll see real-time progress as your video is transcribed, analyzed, and clipped.",
    },
    {
      q: "What format are the clips?",
      a: "MP4 in 9:16 vertical format (1080x1920), optimized for TikTok, Instagram Reels, and YouTube Shorts. Captions are burned directly into the video.",
    },
    {
      q: "Can I adjust the clips?",
      a: "Clips are generated automatically based on transcript analysis. Manual timeline adjustment is coming soon.",
    },
    {
      q: "What's the watermark?",
      a: "Free clips include a small 'Made with Clippified' watermark in the corner. Pro and Unlimited plans remove it completely.",
    },
    {
      q: "Is my content secure?",
      a: "Yes. Your videos are processed on secure servers and automatically deleted after 24 hours. We never share your content.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes. Cancel your subscription at any time — you keep access until the end of your billing period. No questions asked.",
    },
  ];

  return (
    <section id="faq" className="py-28 md:py-36 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
        >
          <span className="badge badge-brand">FAQ</span>
          <h2 className="mt-6 font-display text-3xl md:text-5xl font-bold text-white tracking-tight">
            Frequently asked questions
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="card overflow-hidden"
      initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="font-semibold text-white pr-4">{q}</span>
        <ChevronDown className={`w-5 h-5 text-white/30 transition-transform duration-200 flex-shrink-0 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-6 pb-6 text-sm text-white/45 leading-relaxed">{a}</div>
      )}
    </motion.div>
  );
}

/* -- Footer -- */
function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Logo size="sm" />
        <div className="flex items-center gap-6 text-sm text-white/25">
          <a href="/contact" className="hover:text-white transition-colors">Contact</a>
          <a href="/terms" className="hover:text-white transition-colors">Terms</a>
          <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
          <span>&copy; {new Date().getFullYear()} Clippified</span>
        </div>
      </div>
    </footer>
  );
}
