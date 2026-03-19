import type { Metadata } from "next";
import { Scissors } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
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
        </div>
      </nav>

      <div className="pt-28 pb-20 px-6 max-w-3xl mx-auto">
        <h1 className="font-display text-3xl font-bold text-white mb-8">Privacy Policy</h1>
        <div className="prose-custom space-y-6 text-white/60 text-sm leading-relaxed">
          <p><strong className="text-white">Last updated:</strong> March 19, 2026</p>

          <h2 className="text-lg font-semibold text-white mt-8">1. Information We Collect</h2>
          <p><strong className="text-white">Account information:</strong> When you sign up, we collect your email address and name (via Google OAuth or magic link). We do not store passwords.</p>
          <p><strong className="text-white">Usage data:</strong> We track which features you use, how many videos you process, and basic analytics to improve the Service.</p>
          <p><strong className="text-white">Video content:</strong> When you submit a video URL or upload a file, we temporarily process and store the video and generated clips. All content is automatically deleted after 24 hours.</p>

          <h2 className="text-lg font-semibold text-white mt-8">2. How We Use Your Information</h2>
          <p>We use your information to provide and improve the Service, process payments, send transactional emails, and respond to support requests. We do not sell your personal data to third parties.</p>

          <h2 className="text-lg font-semibold text-white mt-8">3. Third-Party Services</h2>
          <p>We use the following third-party services to operate Clippified:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong className="text-white">Supabase</strong> — Authentication and database</li>
            <li><strong className="text-white">Stripe</strong> — Payment processing</li>
            <li><strong className="text-white">Cloudflare R2</strong> — Temporary file storage</li>
            <li><strong className="text-white">Deepgram</strong> — Audio transcription</li>
          </ul>
          <p>Each service has its own privacy policy. We only share the minimum data required for each service to function.</p>

          <h2 className="text-lg font-semibold text-white mt-8">4. Data Retention</h2>
          <p>Uploaded videos and generated clips are automatically deleted after 24 hours. Account information is retained as long as your account is active. You can request account deletion at any time by emailing us.</p>

          <h2 className="text-lg font-semibold text-white mt-8">5. Security</h2>
          <p>We use industry-standard security measures including HTTPS encryption, secure authentication, and access controls. Video processing occurs on secure servers and content is not accessible to other users.</p>

          <h2 className="text-lg font-semibold text-white mt-8">6. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal data. You can export your data or request account deletion by contacting us. California residents have additional rights under the CCPA.</p>

          <h2 className="text-lg font-semibold text-white mt-8">7. Cookies</h2>
          <p>We use essential cookies for authentication and session management. We do not use tracking cookies or third-party advertising cookies.</p>

          <h2 className="text-lg font-semibold text-white mt-8">8. Changes to This Policy</h2>
          <p>We may update this policy from time to time. We will notify you of significant changes via email or a notice on the Service.</p>

          <h2 className="text-lg font-semibold text-white mt-8">9. Contact</h2>
          <p>Questions about privacy? Email us at <a href="mailto:support@clippified.com" className="text-brand-400 hover:underline">support@clippified.com</a>.</p>
        </div>
      </div>
    </div>
  );
}
