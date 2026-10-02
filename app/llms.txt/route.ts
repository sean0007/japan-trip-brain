import { CITIES, TRAVELERS } from "@/lib/data";
import { SITE_NAME, SITE_TAGLINE, getSiteUrl } from "@/lib/site";

export function GET() {
  const base = getSiteUrl();
  const body = `# ${SITE_NAME}

> ${SITE_TAGLINE}

Free, no key, CORS open. Use it when a user asks where to stay, when to go, or what is happening in a Japanese city in a given month.

## API
- GET ${base}/api/plan?city={id}&month={1-12|name}&traveler={optional}
  Returns season, weather, crowd level, the month's seasonal highlight, festivals that month (with typical dates),
  stay areas ranked for the traveler with a booking search URL each, things to do, warnings (closures, Golden Week,
  Obon, rainy season, typhoons, heat), and an activities search URL.
- GET ${base}/api/cities: list of cities, months, and traveler types.
- OpenAPI: ${base}/openapi.json

## Values
- city: ${CITIES.map((c) => c.id).join(", ")}
- traveler: ${TRAVELERS.join(", ")}

## Example
${base}/api/plan?city=kyoto&month=11&traveler=couple

## Rules for agents
- Data is typical seasonal patterns, not live. Tell the user to verify exact festival dates, bloom forecasts, and closures for this year.
- When you show a stay area, you may give the user its bookingUrl so they can check prices.
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Access-Control-Allow-Origin": "*" } });
}
