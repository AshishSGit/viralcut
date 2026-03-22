"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Scissors, Check, Zap, Loader2, ArrowLeft, Menu, X } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [annual, setAnnual] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Auto-trigger checkout if user just signed in with a plan param
  useEffect(() => {
    const plan = searchParams.get("plan");
    if (plan && ["pro", "unlimited"].includes(plan)) {
      // Check if user is logged in first
      const supabase = createClient();
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) {
          handleCheckout(plan);
        }
      });
    } else {
      setLoading(null);
    }
  }, [searchParams]);

  async function handleCheckout(plan: string) {
    setLoading(plan);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, billing: annual ? "yearly" : "monthly" }),
      });
      const data = await res.json();
      if (res.status === 401) {
        // Not logged in — redirect to signin with plan context
        router.push(`/signin?next=/pricing&plan=${plan}`);
        return;
      }
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(null);
    }
  }

  const plans = [
    {
      name: "Free",
      monthly: 0, yearly: 0,
      key: "free",
      features: [
        "1 video per month",
        "Up to 30 min videos",
        "3-5 clips per video",
        "Animated captions",
        "Clippified watermark",
      ],
      cta: "Current Plan",
      disabled: true,
      highlight: false,
    },
    {
      name: "Pro",
      monthly: 19, yearly: 15,
      key: "pro",
      features: [
        "10 videos per month",
        "Up to 2 hour videos",
        "3-5 clips per video",
        "Animated captions",
        "No watermark",
        "Priority processing",
      ],
      cta: "Upgrade to Pro",
      disabled: false,
      highlight: true,
    },
    {
      name: "Unlimited",
      monthly: 49, yearly: 39,
      key: "unlimited",
      features: [
        "Unlimited videos",
        "Up to 2 hour videos",
        "3-5 clips per video",
        "Animated captions",
        "No watermark",
        "Priority processing",
        "Early access to new features",
      ],
      cta: "Go Unlimited",
      disabled: false,
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen ambient-glow">
      <nav className="glass fixed top-0 w-full z-50">
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
            <a href="/pricing" className="text-sm font-medium text-white px-4 py-2 rounded-lg bg-white/[0.08] border border-white/[0.08]">
              Pricing
            </a>
            <a href="/blog" className="text-sm text-white/50 hover:text-white px-4 py-2 rounded-lg hover:bg-white/[0.06] transition-all">
              Blog
            </a>
            <a href="/contact" className="text-sm text-white/50 hover:text-white px-4 py-2 rounded-lg hover:bg-white/[0.06] transition-all">
              Contact
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white/60 hover:text-white p-2"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <a href="/clip" className="hidden md:flex btn-primary text-sm !py-2 !px-4 items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" /> New Clip
          </a>
        </div>
      </nav>

      {/* Mobile nav menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/60" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed top-0 right-0 w-64 h-full z-50 p-6 pt-20" style={{ background: "#111318" }}>
            <div className="space-y-1">
              <a href="/dashboard" className="block px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg">Dashboard</a>
              <a href="/clip" className="block px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg">Create</a>
              <a href="/pricing" className="block px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg">Pricing</a>
              <a href="/blog" className="block px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg">Blog</a>
              <a href="/contact" className="block px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg">Contact</a>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10">
              <a href="/signin" className="block px-4 py-3 text-sm text-hot-400 hover:bg-hot-500/10 rounded-lg">Sign Out</a>
            </div>
          </div>
        </div>
      )}

      <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <Zap className="w-10 h-10 text-brand-500 mx-auto mb-4" />
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
            Upgrade Your Plan
          </h1>
          <p className="text-white/60 text-lg">Remove watermarks, clip more videos, and get priority processing.</p>
        </div>

        {/* Billing toggle */}
        <div
          className="flex items-center justify-center gap-3 md:gap-4 mb-8 md:mb-12 cursor-pointer select-none"
          onClick={() => setAnnual(!annual)}
        >
          <span className={`text-sm font-medium transition-colors ${!annual ? "text-white" : "text-white/40"}`}>Monthly</span>
          <div className={`toggle-track ${annual ? "active" : ""}`}>
            <div className="toggle-thumb" />
          </div>
          <span className={`text-sm font-medium transition-colors ${annual ? "text-white" : "text-white/40"}`}>Yearly</span>
          <span className="text-xs font-bold bg-neon-500/15 text-neon-400 px-2.5 py-1 rounded-lg border border-neon-500/20">
            Save 20%
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const price = plan.monthly === 0 ? 0 : annual ? plan.yearly : plan.monthly;
            return (
            <div
              key={plan.key}
              className={`card p-6 md:p-8 flex flex-col ${plan.highlight ? "pricing-pro" : ""} ${!plan.disabled ? "cursor-pointer" : ""}`}
              onClick={() => !plan.disabled && !loading && handleCheckout(plan.key)}
            >
              {plan.highlight && (
                <span className="badge badge-brand mb-4 self-start">Most Popular</span>
              )}
              <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold text-white">${price}</span>
                <span className="text-white/50 text-sm">{plan.monthly === 0 ? "forever" : annual ? "/mo, billed yearly" : "/month"}</span>
              </div>
              {annual && plan.monthly > 0 && (
                <p className="text-xs text-neon-400 mt-2 font-medium">
                  Save ${(plan.monthly - plan.yearly) * 12}/year
                </p>
              )}
              <ul className="mt-6 space-y-3 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-white/60">
                    <Check className="w-4 h-4 text-neon-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <div
                className={`mt-8 w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 pointer-events-none ${
                  plan.highlight
                    ? "btn-primary"
                    : plan.disabled
                    ? "bg-dark-700 text-white/30"
                    : "btn-ghost"
                }`}
              >
                {loading === plan.key && <Loader2 className="w-4 h-4 animate-spin" />}
                {plan.cta}
              </div>
            </div>
            );
          })}
        </div>

        {error && (
          <div className="mt-6 p-4 rounded-xl bg-hot-500/10 border border-hot-500/20 text-hot-400 text-sm text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
