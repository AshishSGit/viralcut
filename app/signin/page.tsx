"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Scissors, Mail, ArrowLeft, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

type Mode = "signin" | "sent";

export default function SignInPage() {
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const supabase = createClient();

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setMode("sent");
    }
  }

  async function handleGoogleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) setError(error.message);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 hero-gradient">
      <motion.div
        className="card p-8 md:p-10 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 mb-8">
          <Scissors className="w-6 h-6 text-electric-500" />
          <span className="font-display text-xl font-bold text-white">
            Viral<span className="text-electric-400">Cut</span>
          </span>
        </a>

        {mode === "sent" ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-electric-600/15 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-electric-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Check your email</h2>
            <p className="text-slate-400 text-sm mb-6">
              We sent a magic link to <span className="text-white font-medium">{email}</span>.
              Click it to sign in.
            </p>
            <button
              onClick={() => setMode("signin")}
              className="text-sm text-electric-400 hover:text-electric-300 flex items-center gap-1 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" /> Back to sign in
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-white mb-1">Welcome to ViralCut</h2>
            <p className="text-slate-400 text-sm mb-8">
              Sign in to start turning podcasts into viral clips.
            </p>

            {/* Google OAuth */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-dark-600 bg-dark-800 text-white font-medium hover:border-electric-500/30 transition-all mb-6"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-dark-600" />
              <span className="text-xs text-slate-500">or</span>
              <div className="flex-1 h-px bg-dark-600" />
            </div>

            {/* Magic Link */}
            <form onSubmit={handleMagicLink}>
              <label className="text-sm text-slate-400 mb-2 block">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field w-full mb-4"
                placeholder="you@example.com"
              />

              {error && (
                <p className="text-hot-400 text-sm mb-4">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Mail className="w-5 h-5" />
                )}
                {loading ? "Sending..." : "Send Magic Link"}
              </button>
            </form>

            <p className="mt-6 text-xs text-slate-500 text-center">
              By signing in, you agree to our{" "}
              <a href="/terms" className="text-electric-400 hover:underline">Terms</a> and{" "}
              <a href="/privacy" className="text-electric-400 hover:underline">Privacy Policy</a>.
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}
