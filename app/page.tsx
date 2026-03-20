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
            Stop editing. Start posting.
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
          You have hours of great content buried in long videos.
          We find the moments worth posting — cropped, captioned, and ready to go viral.
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

        {/* How it works - visual steps */}
        <motion.div
          className="mt-20 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {[
              { step: "1", label: "Paste a link", icon: Link2, desc: "Any YouTube or TikTok URL" },
              { step: "2", label: "We find the gold", icon: Sparkles, desc: "Hooks, hot takes & emotional peaks" },
              { step: "3", label: "Download & post", icon: TrendingUp, desc: "9:16 clips with captions, ready to go" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-brand-500/10 border border-brand-500/15 flex items-center justify-center mx-auto mb-4">
                  <s.icon className="w-6 h-6 md:w-7 md:h-7 text-brand-400" />
                </div>
                <p className="text-sm font-bold text-white mb-1">{s.label}</p>
                <p className="text-xs text-white/35">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center mt-8">
            <a href="/signin" className="btn-ghost text-sm flex items-center gap-2">
              Try it free — takes 30 seconds
            </a>
          </div>
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
      title: "Drop Your Video",
      desc: "Paste any YouTube or TikTok URL. No downloads, no uploads, no file management headaches.",
    },
    {
      icon: <Sparkles className="w-7 h-7" />,
      title: "We Find What Goes Viral",
      desc: "Every word is analyzed to find the hooks, hot takes, and emotional peaks your audience will share.",
    },
    {
      icon: <Captions className="w-7 h-7" />,
      title: "Auto-Captioned & Cropped",
      desc: "Each clip gets vertical 9:16 crop and word-by-word captions. No editing software needed.",
    },
    {
      icon: <TrendingUp className="w-7 h-7" />,
      title: "Post & Grow",
      desc: "Download and post. Creators using short-form clips grow 3x faster on every platform.",
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
            3 hours of editing → 2 minutes
          </h2>
          <p className="mt-5 text-white/40 text-lg md:text-xl">Paste a link. Get clips. Post and grow.</p>
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
      title: "Knows What Goes Viral",
      desc: "Not random cuts. Every clip is chosen because it has a strong hook, a hot take, or an emotional peak your audience will share.",
    },
    {
      icon: <Captions className="w-6 h-6" />,
      title: "Captions That Pop",
      desc: "Word-by-word animated captions burned into the video. 85% of social media is watched on mute — captions are essential.",
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Vertical-Ready",
      desc: "Landscape video automatically cropped to 9:16. No manual resizing, no black bars, no Canva workarounds.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Done Before Your Coffee",
      desc: "A full 60-minute video processed in about 2 minutes. Your clips are ready before you finish scrolling Twitter.",
    },
    {
      icon: <Link2 className="w-6 h-6" />,
      title: "Just Paste a Link",
      desc: "No downloading, no file converting, no uploading. Paste a YouTube or TikTok URL and we handle the rest.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Your Content Stays Yours",
      desc: "Videos are processed on secure servers and automatically deleted after 24 hours. We never store or share your content.",
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
            Why creators switch to Clippified
          </h2>
          <p className="mt-5 text-white/40 text-lg md:text-xl">Stop paying editors. Stop wasting weekends. Start growing.</p>
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
