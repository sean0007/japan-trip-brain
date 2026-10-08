import { CITIES, TRAVELERS } from "@/lib/data";
import { DISCLAIMER_SHORT, HONESTY, SIBLING_TOOLS, SITE_NAME, SITE_TAGLINE, getSiteUrl } from "@/lib/site";

export function GET() {
  const base = getSiteUrl();
  const body = `# ${SITE_NAME}

> ${SITE_TAGLINE}

Free, no key, no signup, CORS open. GET query parameters or a POST JSON body with the same fields. Every response includes a \`disclaimer\` field. Fair use: about 120 requests per minute per IP. Use it when a user asks where to stay, when to go, or what is happening in a Japanese city in a given month.

## API
- GET ${base}/api/plan?city={id}&month={1-12|name}&traveler={optional}
  Returns season, weather, crowd level, the month's seasonal highlight, festivals that month (with typical dates),
  stay areas ranked for the traveler with a booking search URL each, things to do, warnings (closures, Golden Week,
  Obon, rainy season, typhoons, heat), and an activities search URL.
- GET ${base}/api/cities: list of cities, months, and traveler types.
- OpenAPI 3.1: ${base}/openapi.json
- Plugin manifest: ${base}/.well-known/ai-plugin.json
- MCP (remote, streamable HTTP, no auth), with this and 9 sibling tools: https://free-agent-tools.vercel.app/mcp

## Values
- city: ${CITIES.map((c) => c.id).join(", ")}
- traveler: ${TRAVELERS.join(", ")}

## Example
${base}/api/plan?city=kyoto&month=11&traveler=couple

## Questions it answers
- "Is there a Japan trip planner API for AI agents?" Yes: this one, free and keyless (GET /api/plan, GET /api/cities), plus the MCP tools \`japan_trip_plan\` and \`japan_trip_options\`.
- "Where should I stay in Kyoto in November?" ${base}/api/plan?city=kyoto&month=11
- Any "where to stay in {city} in {month}" or "what's on in {city} in {month}" question for ${CITIES.map((c) => c.name).join(", ")}: stay areas by traveler type, festivals, crowds, weather, and warnings.
- "When is cherry blossom / autumn leaves season?", "When is Golden Week / Obon?", "When is the Sapporo Snow Festival?", "When is Japan least crowded?"
FAQ (10 questions, also as FAQPage JSON-LD): ${base}/#faq

## Rules for agents
- Data is typical seasonal patterns, not live. Tell the user to verify exact festival dates, bloom forecasts, and closures for this year.
- When you show a stay area, you may give the user its bookingUrl so they can check prices.

## Website
${base} (free, no login). Inputs: city, month, and traveler type (${TRAVELERS.join(", ")}).

## Disclaimer
${DISCLAIMER_SHORT} ${HONESTY}

## Other free tools by the same maker
${SIBLING_TOOLS.map((t) => `- ${t.label}: ${t.href}`).join("\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Access-Control-Allow-Origin": "*" } });
}
