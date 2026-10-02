import { NextResponse } from "next/server";
import { CITIES, TRAVELERS } from "@/lib/data";
import { buildPlan, findCity, parseMonth, parseTraveler } from "@/lib/plan";

const headers = { "Access-Control-Allow-Origin": "*", "Cache-Control": "public, max-age=3600" };

export function GET(req: Request) {
  const sp = new URL(req.url).searchParams;
  const city = findCity(sp.get("city"));
  const month = parseMonth(sp.get("month"));
  const travelerRaw = sp.get("traveler");
  const traveler = parseTraveler(travelerRaw);
  if (!city || !month || (travelerRaw && !traveler)) {
    return NextResponse.json(
      {
        error: "Need city (id or name) and month (1-12 or name). traveler is optional.",
        cities: CITIES.map((c) => c.id),
        travelers: TRAVELERS,
        example: "/api/plan?city=kyoto&month=11&traveler=couple",
      },
      { status: 400, headers },
    );
  }
  return NextResponse.json(buildPlan(city, month, traveler), { headers });
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: { ...headers, "Access-Control-Allow-Methods": "GET, OPTIONS" } });
}
