import type { Metadata } from "next";
import Link from "next/link";
import { FaqSection, type FaqItem } from "@/components/faq-section";
import { Planner } from "@/components/planner";
import { RATE_LIMIT } from "@/lib/agent-api";
import { PUBLIC_URL } from "@/lib/api";
import { CITIES, EVENT_NOTE, MONTHS, TRAVELERS, type City } from "@/lib/data";
import { SITE_NAME } from "@/lib/site";

const title = "Japan trip planner by city and month, with a free API for AI agents";
const description =
  "Free Japan trip planner: pick Tokyo, Kyoto, Osaka, Sapporo, Hiroshima, or Naha, a month, and who's traveling to get where to stay, festivals, crowds, weather, and what to watch out for. AI agents get the same answers from a free, keyless JSON API and MCP tool.";

export const metadata: Metadata = {
  title: { absolute: `${title} · ${SITE_NAME}` },
  description,
  alternates: { canonical: `${PUBLIC_URL}/` },
  openGraph: {
    title,
    description,
    type: "website",
    url: `${PUBLIC_URL}/`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  url: `${PUBLIC_URL}/`,
  applicationCategory: "TravelApplication",
  operatingSystem: "Any (web browser)",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description,
};

const city = (id: string) => CITIES.find((c) => c.id === id) as City;
const month = (n: number) => MONTHS[n - 1];
const list = (xs: string[]) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);
const areas = (c: City) => c.areas.map((a) => `${a.name} (${a.price}, good for ${list(a.goodFor)}): ${a.why}`).join(" ");
const kyoto = city("kyoto");
const tokyo = city("tokyo");
const osaka = city("osaka");
const sapporo = city("sapporo");
const naha = city("naha");
const snow = sapporo.events.find((e) => e.months.includes(2))!;
const lc = (w: string) => (/^(Usually|All|Early|Most|Around)\b/.test(w) ? w[0].toLowerCase() + w.slice(1) : w);
const july = CITIES.flatMap((c) => c.events.filter((e) => e.months.includes(7)).map((e) => `${e.name} in ${c.name} (${lc(e.when)}): ${e.what}`));
const quiet = MONTHS.filter((m) => m.crowds === "low").map((m) => m.name);
const busy = MONTHS.filter((m) => m.crowds === "high").map((m) => m.name);
const example = `${PUBLIC_URL}/api/plan?city=kyoto&month=11&traveler=couple`;

const faq: FaqItem[] = [
  {
    q: "Is there a Japan trip planner API for AI agents?",
    a: `Yes, free with no key, no signup, and CORS open. GET ${example} returns the season, weather, crowd level, seasonal highlight, festivals that month with typical dates, stay areas ranked for the traveler with a booking search link each, things to do, and warnings, plus a disclaimer field. POST a JSON body with the same fields (city, month, traveler) also works, and ${PUBLIC_URL}/api/cities lists the options. Fair use is about ${RATE_LIMIT} requests per minute per IP. The OpenAPI spec is at ${PUBLIC_URL}/openapi.json, and the same data is on the free remote MCP server at https://free-agent-tools.vercel.app/mcp as the tools japan_trip_plan and japan_trip_options.`,
  },
  {
    q: "Where should I stay in Kyoto in November?",
    a: `November is a peak month for Kyoto. ${kyoto.seasonal[11]} ${month(11).notes[1]} Areas: ${areas(kyoto)}`,
  },
  {
    q: "Where should I stay in Tokyo?",
    a: `${tokyo.summary} ${areas(tokyo)}`,
  },
  {
    q: "Where should I stay in Osaka, and is it a good base for Kyoto?",
    a: `${osaka.summary} ${areas(osaka)}`,
  },
  {
    q: "When is cherry blossom season in Japan?",
    a: `${month(3).notes[0]} ${month(4).notes[0]} Hokkaido is later. Sapporo in April: ${sapporo.seasonal[4]} Okinawa is first. Naha in January: ${naha.seasonal[1]}`,
  },
  {
    q: "When do the autumn leaves peak in Kyoto and Tokyo?",
    a: `${month(11).notes[0]} In Kyoto: ${kyoto.seasonal[11]} In Tokyo: ${tokyo.seasonal[11]} ${month(12).notes[0]} Sapporo in October: ${sapporo.seasonal[10]}`,
  },
  {
    q: "What festivals are on in Japan in July?",
    a: `${july.join(" ")} ${month(7).notes[0]} ${EVENT_NOTE}`,
  },
  {
    q: "When is the best time to visit Japan to avoid crowds?",
    a: `The quietest months are ${list(quiet)}. February: ${month(2).notes[0]} June: ${month(6).notes[0]} May: ${month(5).notes[0]} The busiest months are ${list(busy)}, plus New Year (January 1–3). ${month(4).notes[1]} ${month(8).notes[0]}`,
  },
  {
    q: "When is the Sapporo Snow Festival?",
    a: `${snow.name}: ${snow.when}. ${snow.what} February weather: ${month(2).weather} ${EVENT_NOTE}`,
  },
  {
    q: "Which cities and months does Japan Trip Brain cover, and is the data live?",
    a: `${CITIES.length} cities: ${list(CITIES.map((c) => c.name))}. All 12 months. ${TRAVELERS.length} traveler types: ${list(TRAVELERS)}. It is not live data: it uses well-established seasonal patterns, and event dates and bloom times change every year, so verify them before booking.`,
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
      <section className="max-w-3xl">
        <p className="font-mono text-[11px] tracking-[0.28em] text-amber uppercase">Free Japan planner · no login · agent-ready</p>
        <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl">
          Japan trip planner: where to stay and what&apos;s on, for the month you&apos;re going.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          Pick a city, a month, and who&apos;s traveling. Get the season, crowds, festivals, the best
          area to stay, what to do, and what to watch out for. Your AI assistant can ask the same
          thing through a free API. <Link href="/agents" className="text-amber underline">See how</Link>.
        </p>
      </section>
      <section className="mt-8">
        <Planner />
      </section>

      <FaqSection items={faq} heading="Japan trip questions" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd).replace(/</g, "\\u003c") }}
      />
    </div>
  );
}
