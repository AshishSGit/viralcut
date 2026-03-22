import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import Stripe from "stripe";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stripe = getStripe();
  const { plan, billing } = await request.json();

  if (!["pro", "unlimited"].includes(plan)) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const isYearly = billing === "yearly";

  const priceMap: Record<string, string> = {
    "pro-monthly": process.env.STRIPE_PRO_PRICE_ID!,
    "pro-yearly": process.env.STRIPE_PRO_YEARLY_PRICE_ID!,
    "unlimited-monthly": process.env.STRIPE_UNLIMITED_PRICE_ID!,
    "unlimited-yearly": process.env.STRIPE_UNLIMITED_YEARLY_PRICE_ID!,
  };

  const priceId = priceMap[`${plan}-${isYearly ? "yearly" : "monthly"}`];
  if (!priceId) {
    return NextResponse.json({ error: "Invalid plan configuration" }, { status: 400 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${baseUrl}/clip?upgraded=true`,
    cancel_url: `${baseUrl}/pricing`,
    customer_email: user.email,
    metadata: {
      user_id: user.id,
      plan,
    },
  });

  return NextResponse.json({ url: session.url });
}
