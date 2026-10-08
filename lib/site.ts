export const SITE_NAME = "Japan Trip Brain";

export const SITE_TAGLINE =
  "Where to stay, what's on, and what to do in Japan for any city, month, and type of traveler. Built for AI agents and humans.";

export const DISCLAIMER_SHORT = "Travel guidance only. Event dates and bloom times change yearly, so verify before booking.";

export const HONESTY =
  "Uses well-established seasonal patterns, not live data. Booking links may become affiliate links that support the site at no cost to you.";

export const SIBLING_TOOLS = [
  { href: "https://japan-tax-free-refund.vercel.app", label: "Japan Tax-Free Refund" },
  { href: "https://pitch-roast.vercel.app", label: "Pitch Roast" },
  { href: "https://fund-fix-flee.vercel.app", label: "Founder Scorecard" },
  { href: "https://hotel-ota-calculator.vercel.app", label: "Hotel OTA Calculator" },
  { href: "https://saas-bill-cutter.vercel.app", label: "SaaS Bill Cutter" },
  { href: "https://ads-risk-check.vercel.app", label: "Ads Risk Check" },
  { href: "https://faceless-yt-risk-check.vercel.app", label: "Faceless YT Reality Check" },
  { href: "https://appgate-pack.vercel.app/check", label: "AppGate Pack" },
  { href: "https://ai-bottleneck-map.vercel.app", label: "AI Bottleneck Map" },
  { href: "https://viral-attention-map.vercel.app", label: "Viral Attention Map" },
] as const;

export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (production) return `https://${production.replace(/^https?:\/\//, "")}`;
  return "https://japan-trip-brain.vercel.app";
}
