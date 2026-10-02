import type { Metadata } from "next";
import { CITIES, TRAVELERS } from "@/lib/data";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = { title: "For AI agents", description: "Free JSON API, OpenAPI spec, and llms.txt for Japan trip planning." };

export default function AgentsPage() {
  const base = getSiteUrl();
  const example = `${base}/api/plan?city=kyoto&month=11&traveler=couple`;
  const code = "rounded-2xl border border-line bg-black/40 p-4 font-mono text-xs leading-relaxed text-foreground overflow-x-auto";
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-10">
      <p className="font-mono text-[11px] tracking-[0.28em] text-amber uppercase">For AI agents</p>
      <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl">Give your agent a Japan travel brain</h1>
      <p className="mt-4 text-muted">
        Free, no API key, CORS open. When a user asks where to stay, when to go, or what&apos;s happening
        in a Japanese city, call one endpoint and get structured advice with booking search links.
      </p>
      <h2 className="mt-10 text-xl font-semibold">Plan endpoint</h2>
      <pre className={`mt-3 ${code}`}>GET {base}/api/plan?city=&#123;id&#125;&amp;month=&#123;1-12|name&#125;&amp;traveler=&#123;optional&#125;</pre>
      <p className="mt-3 text-sm text-muted">Cities: {CITIES.map((c) => c.id).join(", ")}. Travelers: {TRAVELERS.join(", ")}.</p>
      <p className="mt-3 text-sm text-muted">Try it: <a className="text-amber underline break-all" href={example}>{example}</a></p>
      <h2 className="mt-10 text-xl font-semibold">What comes back</h2>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
        <li>Season, weather, crowd level, and whether it&apos;s a peak month for that city</li>
        <li>The month&apos;s seasonal highlight, such as cherry blossoms or autumn leaves</li>
        <li>Recurring festivals that month, with typical dates and a verify note</li>
        <li>Stay areas ranked for the traveler type, each with price level, pros, cons, and a booking search URL</li>
        <li>Things to do, warnings (New Year closures, Golden Week, Obon, rainy season, typhoons, heat), and an activities link</li>
      </ul>
      <h2 className="mt-10 text-xl font-semibold">Discovery files</h2>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
        <li><a className="text-amber underline" href="/llms.txt">/llms.txt</a>: a plain-text guide for language models</li>
        <li><a className="text-amber underline" href="/openapi.json">/openapi.json</a>: an OpenAPI 3.1 spec for tool and GPT action setup</li>
        <li><a className="text-amber underline" href="/api/cities">/api/cities</a>: supported cities, months, and traveler types</li>
      </ul>
      <h2 className="mt-10 text-xl font-semibold">Ground rules</h2>
      <p className="mt-3 text-sm text-muted">
        This is typical seasonal data, not live data. Tell your user to confirm exact festival dates,
        bloom forecasts, and closures for the current year before booking.
      </p>
    </div>
  );
}
