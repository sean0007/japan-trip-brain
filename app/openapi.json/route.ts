import { NextResponse } from "next/server";
import { CITIES, TRAVELERS } from "@/lib/data";
import { SITE_NAME, SITE_TAGLINE, getSiteUrl } from "@/lib/site";

export function GET() {
  const spec = {
    openapi: "3.1.0",
    info: { title: SITE_NAME, version: "1.0.0", description: SITE_TAGLINE },
    servers: [{ url: getSiteUrl() }],
    paths: {
      "/api/plan": {
        get: {
          operationId: "planJapanTrip",
          summary: "Where to stay, events, and what to do for a Japanese city in a given month",
          parameters: [
            { name: "city", in: "query", required: true, schema: { type: "string", enum: CITIES.map((c) => c.id) } },
            { name: "month", in: "query", required: true, description: "1-12 or English month name", schema: { type: "string" } },
            { name: "traveler", in: "query", required: false, schema: { type: "string", enum: TRAVELERS } },
          ],
          responses: { "200": { description: "Trip plan JSON" }, "400": { description: "Missing or invalid parameters" } },
        },
      },
      "/api/cities": { get: { operationId: "listJapanCities", summary: "Supported cities, months, and traveler types", responses: { "200": { description: "Lists" } } } },
    },
  };
  return NextResponse.json(spec, { headers: { "Access-Control-Allow-Origin": "*" } });
}
