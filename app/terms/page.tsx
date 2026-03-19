import type { Metadata } from "next";
import { Scissors } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
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
        <h1 className="font-display text-3xl font-bold text-white mb-8">Terms of Service</h1>
        <div className="prose-custom space-y-6 text-white/60 text-sm leading-relaxed">
          <p><strong className="text-white">Last updated:</strong> March 19, 2026</p>

          <h2 className="text-lg font-semibold text-white mt-8">1. Acceptance of Terms</h2>
          <p>By accessing or using Clippified (&ldquo;the Service&rdquo;), operated by Brightpeak, you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.</p>

          <h2 className="text-lg font-semibold text-white mt-8">2. Description of Service</h2>
          <p>Clippified is a web-based tool that processes video content to generate short-form clips. The Service includes video downloading, transcription, clip generation, and file hosting.</p>

          <h2 className="text-lg font-semibold text-white mt-8">3. User Accounts</h2>
          <p>You must create an account to use the Service. You are responsible for maintaining the security of your account credentials. You must provide accurate information when creating your account.</p>

          <h2 className="text-lg font-semibold text-white mt-8">4. Acceptable Use</h2>
          <p>You may only process content that you own or have the right to use. You must not use the Service to process content that is illegal, infringing, or violates the rights of others. We reserve the right to suspend accounts that violate these terms.</p>

          <h2 className="text-lg font-semibold text-white mt-8">5. Subscriptions and Billing</h2>
          <p>Paid plans are billed monthly through Stripe. You can cancel at any time and will retain access until the end of your billing period. Refunds are handled on a case-by-case basis — contact us at support@clippified.com.</p>

          <h2 className="text-lg font-semibold text-white mt-8">6. Content and Data</h2>
          <p>Uploaded videos and generated clips are stored temporarily and automatically deleted after 24 hours. We do not claim ownership of your content. You retain all rights to your original videos and generated clips.</p>

          <h2 className="text-lg font-semibold text-white mt-8">7. Limitation of Liability</h2>
          <p>The Service is provided &ldquo;as is&rdquo; without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the Service. Our total liability is limited to the amount you paid in the 12 months preceding the claim.</p>

          <h2 className="text-lg font-semibold text-white mt-8">8. Modifications</h2>
          <p>We may update these terms at any time. Continued use of the Service after changes constitutes acceptance of the updated terms.</p>

          <h2 className="text-lg font-semibold text-white mt-8">9. Contact</h2>
          <p>Questions about these terms? Email us at <a href="mailto:support@clippified.com" className="text-brand-400 hover:underline">support@clippified.com</a>.</p>
        </div>
      </div>
    </div>
  );
}
