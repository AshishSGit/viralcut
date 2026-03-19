import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple pricing for AI podcast clip generation. Free to start, Pro at $19/mo, Unlimited at $49/mo. No watermark on paid plans.",
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
