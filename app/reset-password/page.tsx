"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Scissors, Loader2, CheckCircle2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const supabase = createClient();

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/clip";
      }, 2000);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 hero-gradient ambient-glow">
      <motion.div
        className="card p-6 md:p-10 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <a href="/" className="flex items-center gap-2 mb-8">
          <Scissors className="w-6 h-6 text-brand-500" />
          <span className="font-display text-xl font-bold text-white">
            Clippi<span className="text-brand-400">fied</span>
          </span>
        </a>

        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-neon-500/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-neon-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Password updated</h2>
            <p className="text-white/60 text-sm">Redirecting you to the app...</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-white mb-1">Set new password</h2>
            <p className="text-white/50 text-sm mb-8">
              Enter your new password below.
            </p>

            <form onSubmit={handleReset}>
              <label className="text-sm text-white/60 mb-2 block">New password</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field w-full mb-4"
                placeholder="Min 6 characters"
              />

              <label className="text-sm text-white/60 mb-2 block">Confirm password</label>
              <input
                type="password"
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field w-full mb-4"
                placeholder="Confirm your password"
              />

              {error && (
                <p className="text-hot-400 text-sm mb-4">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}
