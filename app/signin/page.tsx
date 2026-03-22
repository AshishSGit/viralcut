"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Scissors, Mail, ArrowLeft, Loader2, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

type Mode = "signin" | "signup" | "sent";

export default function SignInPage() {
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const supabase = createClient();

  function getRedirectParams() {
    const params = new URLSearchParams(window.location.search);
    const next = params.get("next") || "/clip";
    const plan = params.get("plan");
    return plan ? `${next}?plan=${plan}` : next;
  }

  async function handleEmailPassword(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const redirectNext = getRedirectParams();

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      setLoading(false);
      if (error) {
        setError(error.message);
      } else {
        // No email confirmation needed — redirect immediately
        window.location.href = redirectNext.startsWith("/") ? redirectNext : "/clip";
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setLoading(false);
      if (error) {
        if (error.message === "Invalid login credentials") {
          setError("Wrong email or password. Try again or sign up.");
        } else {
          setError(error.message);
        }
      } else {
        window.location.href = redirectNext.startsWith("/") ? redirectNext : "/clip";
      }
    }
  }

  async function handleMagicLink() {
    setLoading(true);
    setError("");

    const redirectNext = getRedirectParams();

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectNext)}`,
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
    const redirectNext = getRedirectParams();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectNext)}`,
      },
    });
    if (error) setError(error.message);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 hero-gradient ambient-glow">
      <motion.div
        className="card p-6 md:p-10 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 mb-8">
          <Scissors className="w-6 h-6 text-brand-500" />
          <span className="font-display text-xl font-bold text-white">
            Clippi<span className="text-brand-400">fied</span>
          </span>
        </a>

        {mode === "sent" ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-brand-500/10 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-brand-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Check your email</h2>
            <p className="text-white/60 text-sm mb-6">
              We sent a confirmation link to <span className="text-white font-medium">{email}</span>.
            </p>
            <button
              onClick={() => setMode("signin")}
              className="text-sm text-brand-400 hover:text-brand-300 flex items-center gap-1 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" /> Back to sign in
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-white mb-1">
              {mode === "signup" ? "Create your account" : "Welcome back"}
            </h2>
            <p className="text-white/50 text-sm mb-8">
              {mode === "signup" ? "Start turning your content into viral clips." : "Sign in to continue clipping."}
            </p>

            {/* Google OAuth */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-white font-medium hover:border-brand-500/30 hover:bg-white/[0.05] transition-all mb-6"
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
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-white/40">or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Email + Password */}
            <form onSubmit={handleEmailPassword}>
              <label className="text-sm text-white/60 mb-2 block">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field w-full mb-4"
                placeholder="you@example.com"
              />

              <label className="text-sm text-white/60 mb-2 block">Password</label>
              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field w-full !pr-12"
                  placeholder="Min 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>

              {error && (
                <p className="text-hot-400 text-sm mb-4">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 mb-3"
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                {loading ? "Please wait..." : mode === "signup" ? "Create Account" : "Sign In"}
              </button>

              {/* Magic link fallback */}
              {mode === "signin" && email && (
                <button
                  type="button"
                  onClick={handleMagicLink}
                  className="w-full text-center text-xs text-white/40 hover:text-brand-400 transition-colors py-2"
                >
                  Send magic link instead
                </button>
              )}
            </form>

            {/* Toggle sign in / sign up */}
            <div className="mt-6 text-center">
              {mode === "signin" ? (
                <p className="text-sm text-white/50">
                  Don&apos;t have an account?{" "}
                  <button onClick={() => { setMode("signup"); setError(""); }} className="text-brand-400 hover:text-brand-300 font-medium">
                    Sign up
                  </button>
                </p>
              ) : (
                <p className="text-sm text-white/50">
                  Already have an account?{" "}
                  <button onClick={() => { setMode("signin"); setError(""); }} className="text-brand-400 hover:text-brand-300 font-medium">
                    Sign in
                  </button>
                </p>
              )}
            </div>

            <p className="mt-4 text-xs text-white/30 text-center">
              By continuing, you agree to our{" "}
              <a href="/terms" className="text-brand-400 hover:underline">Terms</a> and{" "}
              <a href="/privacy" className="text-brand-400 hover:underline">Privacy Policy</a>.
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}
