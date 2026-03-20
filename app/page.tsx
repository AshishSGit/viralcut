"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scissors,
  Zap,
  Captions,
  Upload,
  Link2,
  Play,
  Check,
  Sparkles,
  Clock,
  TrendingUp,
  Monitor,
  ChevronDown,
  Shield,
  ArrowRight,
} from "lucide-react";

/* ── Animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] } },
};

/* ── Logo ── */
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

/* ── Schema ── */
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What types of videos work best with Clippified?", acceptedAnswer: { "@type": "Answer", text: "Clippified works with podcasts, interviews, vlogs, webinars, lectures, and any video with speech." } },
    { "@type": "Question", name: "How long does processing take?", acceptedAnswer: { "@type": "Answer", text: "A 60-minute video typically takes 2-4 minutes." } },
    { "@type": "Question", name: "What format are the clips?", acceptedAnswer: { "@type": "Answer", text: "MP4 in 9:16 vertical format, optimized for TikTok, Instagram Reels, and YouTube Shorts." } },
    { "@type": "Question", name: "How much does Clippified cost?", acceptedAnswer: { "@type": "Answer", text: "Free plan (1 video/month), Pro at $19/month (10 videos), and Unlimited at $49/month." } },
    { "@type": "Question", name: "Is my content secure?", acceptedAnswer: { "@type": "Answer", text: "Yes. Videos are automatically deleted after 24 hours. We never share your content." } },
    { "@type": "Question", name: "Can I cancel anytime?", acceptedAnswer: { "@type": "Answer", text: "Yes. Cancel anytime — you keep access until the end of your billing period." } },
  ],
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org", "@type": "WebApplication", name: "Clippified", url: "https://clippified.com",
  description: "Turn podcasts and YouTube videos into viral TikTok, Reels, and Shorts clips with AI-powered editing.",
  applicationCategory: "MultimediaApplication", operatingSystem: "Web",
  offers: [
    { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD" },
    { "@type": "Offer", name: "Pro", price: "19", priceCurrency: "USD" },
    { "@type": "Offer", name: "Unlimited", price: "49", priceCurrency: "USD" },
  ],
};

/* ── Page ── */
export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }} />

      {/* Global ambient orbs */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] rounded-full bg-brand-500/[0.06] blur-[150px]" />
        <div className="absolute top-[60%] right-0 w-[600px] h-[400px] rounded-full bg-brand-600/[0.03] blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[300px] rounded-full bg-brand-700/[0.04] blur-[100px]" />
      </div>

      <Nav />
      <Hero />
      <SocialProof />
      <HowItWorks />
      <Features />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

/* ── Nav ── */
function Nav() {
  return (
    <motion.nav
      className="fixed top-0 w-full z-50 glass"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Logo />
        <div className="hidden md:flex items-center gap-8 text-sm text-white/50">
          <a href="#how-it-works" className="hover:text-white transition-colors duration-300">How It Works</a>
          <a href="#features" className="hover:text-white transition-colors duration-300">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors duration-300">Pricing</a>
          <a href="#faq" className="hover:text-white transition-colors duration-300">FAQ</a>
          <a href="/blog" className="hover:text-white transition-colors duration-300">Blog</a>
        </div>
        <div className="flex items-center gap-3">
          <a href="/signin" className="text-sm text-white/60 hover:text-white transition-colors duration-300">
            Sign In
          </a>
          <a href="/signin" className="btn-primary text-sm !py-2 !px-5">
            Get Started Free
          </a>
        </div>
      </div>
    </motion.nav>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section className="relative pt-40 pb-32 px-6 overflow-hidden">
      {/* Hero glow */}
      <div className="absolute inset-0 hero-gradient" />

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-32 left-[10%] w-2 h-2 rounded-full bg-brand-400/30"
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-48 right-[15%] w-3 h-3 rounded-full bg-brand-500/20"
        animate={{ y: [0, -30, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute bottom-40 left-[20%] w-1.5 h-1.5 rounded-full bg-neon-400/25"
        animate={{ y: [0, -15, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          <span className="inline-flex items-center gap-2 badge badge-brand uppercase tracking-widest text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            Stop editing. Start posting.
          </span>
        </motion.div>

        <motion.h1
          className="mt-8 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.08] tracking-tight"
          initial="hidden" animate="visible" variants={fadeUp} custom={1}
        >
          <span className="text-white">Your content,</span>
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-brand-500 bg-clip-text text-transparent">
            clippified.
          </span>
        </motion.h1>

        <motion.p
          className="mt-8 text-lg md:text-2xl text-white/55 max-w-2xl mx-auto leading-relaxed"
          initial="hidden" animate="visible" variants={fadeUp} custom={2}
        >
          You have hours of great content buried in long videos.
          We find the moments worth posting — cropped, captioned, and ready to go viral.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial="hidden" animate="visible" variants={fadeUp} custom={3}
        >
          <a href="/signin" className="btn-primary text-base flex items-center gap-2 !py-4 !px-8 group">
            <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            Start Clipping — Free
          </a>
          <a href="#how-it-works" className="btn-ghost text-base flex items-center gap-2 group">
            <Play className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            See How It Works
          </a>
        </motion.div>

        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-5 md:gap-8 text-sm text-white/40"
          initial="hidden" animate="visible" variants={fadeUp} custom={4}
        >
          {["No credit card", "1 free video/month", "Cancel anytime"].map((t) => (
            <span key={t} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-neon-400" /> {t}
            </span>
          ))}
        </motion.div>

        {/* 3 Step cards */}
        <motion.div
          className="mt-28 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { step: "1", label: "Paste a link", icon: Link2, desc: "Any YouTube or TikTok URL — no downloads, no conversions, just paste and go." },
              { step: "2", label: "We find the gold", icon: Sparkles, desc: "AI analyzes every word to find hooks, hot takes, and emotional peaks worth sharing." },
              { step: "3", label: "Download & post", icon: TrendingUp, desc: "9:16 vertical clips with burned-in captions. Ready for TikTok, Reels, and Shorts." },
            ].map((s, i) => (
              <motion.div key={i} variants={staggerItem} className="relative card p-8 text-center group hover:border-brand-500/25 transition-all duration-500">
                <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent" />
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-500/15 group-hover:scale-105 transition-all duration-500">
                  <s.icon className="w-7 h-7 md:w-9 md:h-9 text-brand-400" />
                </div>
                <div className="text-[11px] text-brand-500 font-bold mb-2 tracking-widest uppercase">Step {s.step}</div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-3">{s.label}</h3>
                <p className="text-sm md:text-base text-white/55 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Social Proof ── */
function SocialProof() {
  return (
    <section className="py-20 md:py-28 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.p
          className="text-center text-xs text-white/30 uppercase tracking-[0.2em] font-semibold mb-10"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
        >
          Create clips for
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-10 md:gap-16 mb-20"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
        >
          {["TikTok", "Reels", "Shorts"].map((p) => (
            <motion.span
              key={p}
              variants={staggerItem}
              className="font-display font-bold text-2xl md:text-3xl text-white/20 hover:text-white/40 transition-colors duration-500 cursor-default"
            >
              {p}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-3 gap-8 text-center"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
        >
          {[
            { value: "3-5", label: "Clips per video" },
            { value: "~2", unit: "min", label: "Processing time" },
            { value: "9:16", label: "Vertical + captions" },
          ].map((s) => (
            <motion.div key={s.label} variants={staggerItem}>
              <p className="font-display text-5xl md:text-7xl font-bold text-white">
                {s.value}
                {s.unit && <span className="text-2xl text-white/40">{s.unit}</span>}
              </p>
              <p className="text-sm md:text-base text-white/45 mt-3">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── How It Works ── */
function HowItWorks() {
  const steps = [
    { icon: <Upload className="w-7 h-7" />, title: "Drop Your Video", desc: "Paste any YouTube or TikTok URL. No downloads, no uploads, no file management headaches." },
    { icon: <Sparkles className="w-7 h-7" />, title: "We Find What Goes Viral", desc: "Every word is analyzed to find the hooks, hot takes, and emotional peaks your audience will share." },
    { icon: <Captions className="w-7 h-7" />, title: "Auto-Captioned & Cropped", desc: "Each clip gets vertical 9:16 crop and word-by-word captions. No editing software needed." },
    { icon: <TrendingUp className="w-7 h-7" />, title: "Post & Grow", desc: "Download and post. Creators using short-form clips grow 3x faster on every platform." },
  ];

  return (
    <section id="how-it-works" className="py-28 md:py-40 px-6 relative">
      {/* Section glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-brand-500/[0.03] blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          className="text-center mb-20"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
        >
          <span className="badge badge-brand">How It Works</span>
          <h2 className="mt-6 font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            3 hours of editing → <span className="text-brand-400">2 minutes</span>
          </h2>
          <p className="mt-5 text-white/45 text-lg md:text-xl max-w-xl mx-auto">Paste a link. Get clips. Post and grow.</p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="card p-8 text-center group hover:border-brand-500/25 transition-all duration-500"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={i + 1}
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/15 flex items-center justify-center text-brand-400 mx-auto mb-6 group-hover:bg-brand-500/15 group-hover:scale-110 transition-all duration-500">
                {step.icon}
              </div>
              <div className="text-[11px] text-brand-500 font-bold mb-3 tracking-widest">STEP {i + 1}</div>
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-brand-300 transition-colors duration-300">{step.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Features ── */
function Features() {
  const features = [
    { icon: <Zap className="w-6 h-6" />, title: "Knows What Goes Viral", desc: "Not random cuts. Every clip is chosen because it has a strong hook, a hot take, or an emotional peak your audience will share." },
    { icon: <Captions className="w-6 h-6" />, title: "Captions That Pop", desc: "Word-by-word animated captions burned into the video. 85% of social media is watched on mute — captions are essential." },
    { icon: <Monitor className="w-6 h-6" />, title: "Vertical-Ready", desc: "Landscape video automatically cropped to 9:16. No manual resizing, no black bars, no Canva workarounds." },
    { icon: <Clock className="w-6 h-6" />, title: "Done Before Your Coffee", desc: "A full 60-minute video processed in about 2 minutes. Your clips are ready before you finish scrolling Twitter." },
    { icon: <Link2 className="w-6 h-6" />, title: "Just Paste a Link", desc: "No downloading, no file converting, no uploading. Paste a YouTube or TikTok URL and we handle the rest." },
    { icon: <Shield className="w-6 h-6" />, title: "Your Content Stays Yours", desc: "Videos are processed on secure servers and automatically deleted after 24 hours. We never store or share your content." },
  ];

  return (
    <section id="features" className="py-28 md:py-40 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
        >
          <span className="badge badge-neon">Features</span>
          <h2 className="mt-6 font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Why creators switch to Clippified
          </h2>
          <p className="mt-5 text-white/45 text-lg md:text-xl">Stop paying editors. Stop wasting weekends. Start growing.</p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="card p-8 group hover:border-brand-500/20 transition-all duration-500"
              variants={staggerItem}
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-500/10 border border-brand-500/15 flex items-center justify-center text-brand-400 mb-6 group-hover:bg-brand-500/15 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-brand-500/10 transition-all duration-500">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-brand-300 transition-colors duration-300">{f.title}</h3>
              <p className="text-sm md:text-base text-white/50 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Pricing ── */
function Pricing() {
  const plans = [
    { name: "Free", price: "$0", period: "forever", badge: null, features: ["1 video per month", "Up to 30 min videos", "3-5 clips per video", "Animated captions", "Clippified watermark"], cta: "Get Started Free", highlight: false },
    { name: "Pro", price: "$19", period: "/month", badge: "Most Popular", features: ["10 videos per month", "Up to 2 hour videos", "3-5 clips per video", "Animated captions", "No watermark", "Priority processing"], cta: "Start Pro", highlight: true },
    { name: "Unlimited", price: "$49", period: "/month", badge: null, features: ["Unlimited videos", "Up to 2 hour videos", "3-5 clips per video", "Animated captions", "No watermark", "Priority processing", "Early access to features"], cta: "Go Unlimited", highlight: false },
  ];

  return (
    <section id="pricing" className="py-28 md:py-40 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
        >
          <span className="badge badge-hot">Pricing</span>
          <h2 className="mt-6 font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Simple pricing, no surprises
          </h2>
          <p className="mt-5 text-white/45 text-lg md:text-xl">Start free. Upgrade when you need more.</p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6 items-start"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
        >
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              className={`card p-8 flex flex-col group transition-all duration-500 ${plan.highlight ? "pricing-pro" : "hover:border-white/10"}`}
              variants={staggerItem}
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
                  <li key={j} className="flex items-center gap-2.5 text-sm text-white/55">
                    <Check className="w-4 h-4 text-neon-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="/signin"
                className={`mt-10 block text-center py-3.5 rounded-xl font-bold transition-all duration-300 ${
                  plan.highlight ? "btn-primary" : "btn-ghost"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── FAQ ── */
function FAQ() {
  const faqs = [
    { q: "What types of videos work best?", a: "Clippified works with podcasts, interviews, vlogs, webinars, lectures, and any video with speech. It analyzes the transcript to find hooks, hot takes, stories, and emotional moments." },
    { q: "How long does processing take?", a: "A 60-minute video typically takes 2-4 minutes. You'll see real-time progress as your video is transcribed, analyzed, and clipped." },
    { q: "What format are the clips?", a: "MP4 in 9:16 vertical format (1080x1920), optimized for TikTok, Instagram Reels, and YouTube Shorts. Captions are burned directly into the video." },
    { q: "Can I adjust the clips?", a: "Clips are generated automatically based on transcript analysis. Manual timeline adjustment is coming soon." },
    { q: "What's the watermark?", a: "Free clips include a small 'Made with Clippified' watermark in the corner. Pro and Unlimited plans remove it completely." },
    { q: "Is my content secure?", a: "Yes. Your videos are processed on secure servers and automatically deleted after 24 hours. We never share your content." },
    { q: "Can I cancel anytime?", a: "Yes. Cancel your subscription at any time — you keep access until the end of your billing period. No questions asked." },
  ];

  return (
    <section id="faq" className="py-28 md:py-40 px-6">
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

        <motion.div
          className="space-y-3"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
        >
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div className="card overflow-hidden group hover:border-white/10 transition-colors duration-300" variants={staggerItem}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="font-semibold text-white pr-4 group-hover:text-brand-300 transition-colors duration-300">{q}</span>
        <ChevronDown className={`w-5 h-5 text-white/30 transition-transform duration-300 flex-shrink-0 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-sm text-white/50 leading-relaxed">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Bottom CTA ── */
function CTA() {
  return (
    <section className="py-28 md:py-36 px-6 relative">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-brand-500/[0.06] blur-[120px]" />
      </div>

      <motion.div
        className="max-w-3xl mx-auto text-center relative"
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
      >
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
          Ready to go viral?
        </h2>
        <p className="mt-5 text-white/45 text-lg md:text-xl max-w-xl mx-auto">
          Join creators who save hours every week. Your first video is free.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/signin" className="btn-primary text-base flex items-center gap-2 !py-4 !px-8 group">
            <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            Start Clipping — Free
          </a>
        </div>
        <p className="mt-6 text-sm text-white/30">No credit card required. 1 free video per month.</p>
      </motion.div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Logo size="sm" />
        <div className="flex items-center gap-6 text-sm text-white/25">
          <a href="/blog" className="hover:text-white transition-colors duration-300">Blog</a>
          <a href="/contact" className="hover:text-white transition-colors duration-300">Contact</a>
          <a href="/terms" className="hover:text-white transition-colors duration-300">Terms</a>
          <a href="/privacy" className="hover:text-white transition-colors duration-300">Privacy</a>
          <span>&copy; {new Date().getFullYear()} Clippified</span>
        </div>
      </div>
    </footer>
  );
}
