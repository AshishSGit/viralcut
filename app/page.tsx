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
  Users,
  Star,
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
    <div className="min-h-screen">
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
          <a href="/signin" className="btn-primary text-sm !py-2 !px-4">
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
    <section className="relative pt-32 pb-20 px-6 hero-gradient overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          <span className="badge badge-brand uppercase tracking-widest text-xs">
            Trusted by 500+ content creators
          </span>
        </motion.div>

        <motion.h1
          className="mt-6 font-display text-5xl md:text-7xl font-bold text-white leading-tight"
          initial="hidden" animate="visible" variants={fadeUp} custom={1}
        >
          Your podcast,{" "}
          <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
            clippified.
          </span>
        </motion.h1>

        <motion.p
          className="mt-6 text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
          initial="hidden" animate="visible" variants={fadeUp} custom={2}
        >
          Paste a YouTube link. We find your most shareable moments, crop to 9:16,
          add animated captions, and export clips ready for TikTok, Reels & Shorts.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial="hidden" animate="visible" variants={fadeUp} custom={3}
        >
          <a href="/signin" className="btn-primary text-base flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Start Clipping — Free
          </a>
          <a href="#how-it-works" className="btn-ghost text-base flex items-center gap-2">
            <Play className="w-4 h-4" />
            See How It Works
          </a>
        </motion.div>

        <motion.div
          className="mt-8 flex items-center justify-center gap-6 text-sm text-white/40"
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

        {/* Demo mockup */}
        <motion.div
          className="mt-16 relative max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <div className="card p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 flex-1 input-field !py-3">
                <Link2 className="w-4 h-4 text-white/30" />
                <span className="text-white/30 text-sm">https://youtube.com/watch?v=podcast-episode...</span>
              </div>
              <button className="btn-primary !py-3 !px-6 flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4" /> Clip It
              </button>
            </div>
            <div className="bg-dark-800/50 rounded-xl p-4 border border-dark-600">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4 text-neon-400" />
                <span className="text-sm text-neon-400 font-medium">5 clips ready to download</span>
                <span className="text-xs text-white/30 ml-auto">Processed in 2:14</span>
              </div>
              <div className="space-y-2">
                {[
                  { title: "Why most creators fail in the first year", score: "9.2", duration: "47s" },
                  { title: "The truth about growing on social media", score: "8.7", duration: "38s" },
                  { title: "The moment everything changed for me", score: "8.4", duration: "52s" },
                ].map((clip, i) => (
                  <div key={i} className="flex items-center gap-3 bg-dark-900/60 rounded-lg px-4 py-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-500/15 flex items-center justify-center flex-shrink-0">
                      <Play className="w-4 h-4 text-brand-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium truncate">{clip.title}</p>
                      <p className="text-xs text-white/30">{clip.duration} clip</p>
                    </div>
                    <span className="text-xs font-semibold text-brand-400">{clip.score}/10</span>
                    <button className="text-xs bg-brand-500/15 text-brand-400 px-3 py-1.5 rounded-lg font-medium">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -inset-4 bg-gradient-to-r from-brand-600/10 via-brand-500/5 to-brand-600/10 rounded-2xl blur-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
}

/* -- Social Proof -- */
function SocialProof() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="font-display text-3xl font-bold text-white">10,000+</p>
            <p className="text-sm text-white/40 mt-1">Clips generated</p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold text-white">500+</p>
            <p className="text-sm text-white/40 mt-1">Creators using Clippified</p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold text-white">2 min</p>
            <p className="text-sm text-white/40 mt-1">Average processing time</p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            {
              quote: "I used to spend 3 hours clipping my podcast episodes. Now it takes 2 minutes. Game changer.",
              name: "Sarah K.",
              role: "Podcast Host",
            },
            {
              quote: "The clip detection is scary good. It finds moments I didn't even realize were viral-worthy.",
              name: "Marcus T.",
              role: "YouTube Creator",
            },
            {
              quote: "Finally, a tool that actually works. My TikTok grew 40% in the first month of using Clippified.",
              name: "Priya R.",
              role: "Content Strategist",
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              className="card p-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i + 1}
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-brand-400 fill-brand-400" />
                ))}
              </div>
              <p className="text-sm text-white/70 leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-white/40">{t.role}</p>
              </div>
            </motion.div>
          ))}
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
      desc: "Drop an MP4 or paste a YouTube/TikTok URL. Supports videos up to 2 hours long.",
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
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
        >
          <span className="badge badge-brand">How It Works</span>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold text-white">
            Podcast to clips in 2 minutes
          </h2>
          <p className="mt-4 text-white/50 text-lg">No editing skills required. Just paste and go.</p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i} className="card p-6 text-center"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1}
            >
              <div className="w-14 h-14 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400 mx-auto mb-4">
                {step.icon}
              </div>
              <div className="text-xs text-brand-500 font-bold mb-2">STEP {i + 1}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-white/50">{step.desc}</p>
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
      desc: "A full 60-minute podcast processed in about 2 minutes. No waiting around.",
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
    <section id="features" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
        >
          <span className="badge badge-neon">Features</span>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold text-white">
            Everything you need to go viral
          </h2>
          <p className="mt-4 text-white/50 text-lg">Professional clips without the professional editing team.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i} className="card p-6"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1}
            >
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400 mb-4">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
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
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
        >
          <span className="badge badge-hot">Pricing</span>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold text-white">
            Simple pricing, no surprises
          </h2>
          <p className="mt-4 text-white/50 text-lg">Start free. Upgrade when you need more.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              className={`card p-8 flex flex-col ${plan.highlight ? "pricing-pro" : ""}`}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1}
            >
              {plan.badge && (
                <span className="badge badge-brand mb-4 self-start">{plan.badge}</span>
              )}
              <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-white/40 text-sm">{plan.period}</span>
              </div>
              <ul className="mt-6 space-y-3 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-white/70">
                    <Check className="w-4 h-4 text-neon-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="/signin"
                className={`mt-8 block text-center py-3 rounded-xl font-semibold transition-all ${
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
      a: "Clippified works best with podcasts, interviews, talking-head videos, and any content with speech. It analyzes the transcript to find hooks, hot takes, stories, and emotional moments.",
    },
    {
      q: "How long does processing take?",
      a: "A 60-minute podcast typically takes 2-4 minutes. You'll see real-time progress as your video is transcribed, analyzed, and clipped.",
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
    <section id="faq" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
        >
          <span className="badge badge-brand">FAQ</span>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold text-white">
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
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="font-medium text-white">{q}</span>
        <ChevronDown className={`w-5 h-5 text-white/40 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-white/50 leading-relaxed">{a}</div>
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
        <div className="flex items-center gap-6 text-sm text-white/30">
          <a href="/terms" className="hover:text-white transition-colors">Terms</a>
          <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
          <span>&copy; {new Date().getFullYear()} Clippified</span>
        </div>
      </div>
    </footer>
  );
}
