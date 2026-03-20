"use client";

import { useState } from "react";
import { Scissors, Mail, MessageSquare, Clock, Send, Loader2, CheckCircle2, HelpCircle, Bug, Sparkles } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", type: "general", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // Send via mailto fallback (no backend needed)
    const subject = encodeURIComponent(`[${form.type}] Contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nType: ${form.type}\n\n${form.message}`);
    window.location.href = `mailto:support@clippified.com?subject=${subject}&body=${body}`;

    // Show success state
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1000);
  }

  return (
    <div className="min-h-screen">
      <nav className="glass fixed top-0 w-full z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-2">
            <Scissors className="w-6 h-6 text-brand-500" />
            <span className="font-display text-xl font-bold text-white">
              Clippi<span className="text-brand-400">fied</span>
            </span>
          </a>
          <a href="/clip" className="text-sm text-white/60 hover:text-white transition-colors">
            Back to App
          </a>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            Have a question, found a bug, or want to request a feature? We typically respond within a few hours.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-10">
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
              <p className="text-sm text-white/50">We respond to most inquiries within 2-4 hours during business days.</p>
            </div>

            <div className="card p-6">
              <div className="w-11 h-11 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400 mb-4">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">Common Topics</h3>
              <ul className="text-sm text-white/50 space-y-1.5 mt-2">
                <li className="flex items-center gap-2"><HelpCircle className="w-3.5 h-3.5 text-white/30" /> How to use Clippified</li>
                <li className="flex items-center gap-2"><Bug className="w-3.5 h-3.5 text-white/30" /> Report a bug or issue</li>
                <li className="flex items-center gap-2"><Sparkles className="w-3.5 h-3.5 text-white/30" /> Feature requests</li>
                <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-white/30" /> Billing & subscriptions</li>
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
                  <label className="text-sm text-white/60 mb-2 block font-medium">Your Name</label>
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
                  <label className="text-sm text-white/60 mb-2 block font-medium">Email Address</label>
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
                  <label className="text-sm text-white/60 mb-2 block font-medium">What can we help with?</label>
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
                            : "text-white/40 border border-white/8 hover:border-white/15"
                        }`}
                      >
                        <opt.icon className="w-4 h-4" />
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-white/60 mb-2 block font-medium">Message</label>
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

                <p className="text-xs text-white/20 text-center">
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
