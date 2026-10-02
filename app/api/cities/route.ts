import { NextResponse } from "next/server";
import { CITIES, MONTHS, TRAVELERS } from "@/lib/data";

export function GET() {
  return NextResponse.json(
    {
      cities: CITIES.map((c) => ({ id: c.id, name: c.name, region: c.region, summary: c.summary, peakMonths: c.peakMonths, areas: c.areas.map((a) => a.name) })),
      months: MONTHS.map((m) => ({ number: m.month, name: m.name, season: m.season, crowds: m.crowds })),
      travelers: TRAVELERS,
    },
    { headers: { "Access-Control-Allow-Origin": "*", "Cache-Control": "public, max-age=3600" } },
  );
}
