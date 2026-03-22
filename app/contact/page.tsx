"use client";

import { useState } from "react";
import { Scissors, Mail, MessageSquare, Clock, Send, Loader2, CheckCircle2, HelpCircle, Bug, Sparkles, Zap, Menu, X } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", type: "general", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to send");
      setSent(true);
    } catch {
      alert("Something went wrong. Please email us directly at support@clippified.com");
    } finally {
      setLoading(false);
    }
  }

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
            <a href="/pricing" className="text-sm text-white/50 hover:text-white px-4 py-2 rounded-lg hover:bg-white/[0.06] transition-all">
              Pricing
            </a>
            <a href="/blog" className="text-sm text-white/50 hover:text-white px-4 py-2 rounded-lg hover:bg-white/[0.06] transition-all">
              Blog
            </a>
            <a href="/contact" className="text-sm font-medium text-white px-4 py-2 rounded-lg bg-white/[0.08] border border-white/[0.08]">
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
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            Have a question, found a bug, or want to request a feature? We typically respond within a few hours.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-6 md:gap-10">
          {/* Left — contact info */}
          <div className="md:col-span-2 space-y-6">
            <div className="card p-6">
              <div className="w-11 h-11 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400 mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">Email Us</h3>
              <a href="mailto:support@clippified.com" className="text-sm text-brand-400 hover:underline">
                support@clippified.com
              </a>
            </div>

            <div className="card p-6">
              <div className="w-11 h-11 rounded-xl bg-neon-500/10 flex items-center justify-center text-neon-400 mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">Response Time</h3>
              <p className="text-sm text-white/70">We respond to most inquiries within 2-4 hours during business days.</p>
            </div>

            <div className="card p-6">
              <div className="w-11 h-11 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400 mb-4">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">We Can Help With</h3>
              <ul className="text-sm space-y-2.5 mt-3">
                <li className="flex items-center gap-2 text-white/70"><HelpCircle className="w-3.5 h-3.5 text-brand-400" /> Getting started & how-to</li>
                <li className="flex items-center gap-2 text-white/70"><Bug className="w-3.5 h-3.5 text-brand-400" /> Bug reports & troubleshooting</li>
                <li className="flex items-center gap-2 text-white/70"><Sparkles className="w-3.5 h-3.5 text-brand-400" /> Feature requests & ideas</li>
                <li className="flex items-center gap-2 text-white/70"><Mail className="w-3.5 h-3.5 text-brand-400" /> Billing, plans & refunds</li>
              </ul>
            </div>
          </div>

          {/* Right — contact form */}
          <div className="md:col-span-3">
            {sent ? (
              <div className="card p-12 text-center">
                <CheckCircle2 className="w-14 h-14 text-neon-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-3">Message Sent</h2>
                <p className="text-white/50 mb-8">
                  Thanks for reaching out. We&apos;ll get back to you within a few hours.
                </p>
                <a href="/clip" className="btn-primary inline-flex items-center gap-2">
                  Back to Clippified
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-8 space-y-5">
                <div>
                  <label className="text-sm text-white/80 mb-2 block font-medium">Your Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="input-field w-full"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="text-sm text-white/80 mb-2 block font-medium">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="input-field w-full"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="text-sm text-white/80 mb-2 block font-medium">What can we help with?</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: "general", label: "General Question", icon: HelpCircle },
                      { key: "bug", label: "Report a Bug", icon: Bug },
                      { key: "feature", label: "Feature Request", icon: Sparkles },
                      { key: "billing", label: "Billing & Account", icon: Mail },
                    ].map(opt => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setForm({ ...form, type: opt.key })}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          form.type === opt.key
                            ? "bg-brand-500/15 text-white border border-brand-500/30"
                            : "text-white/60 border border-white/8 hover:border-white/15"
                        }`}
                      >
                        <opt.icon className="w-4 h-4" />
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-white/80 mb-2 block font-medium">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="input-field w-full resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2 !py-4 text-base"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  {loading ? "Sending..." : "Send Message"}
                </button>

                <p className="text-xs text-white/60 text-center">
                  We&apos;ll respond to your email within 2-4 hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
