import { CITIES, EVENT_NOTE, MONTHS, TRAVELERS, type City, type Traveler } from "./data";

export function bookingLink(area: string, city: string): string {
  const u = new URL("https://www.booking.com/searchresults.html");
  u.searchParams.set("ss", `${area}, ${city}, Japan`);
  const aid = process.env.NEXT_PUBLIC_BOOKING_AID?.trim();
  if (aid) u.searchParams.set("aid", aid);
  return u.toString();
}

export function activitiesLink(city: string): string {
  const u = new URL("https://www.getyourguide.com/s/");
  u.searchParams.set("q", `${city} Japan`);
  const pid = process.env.NEXT_PUBLIC_GYG_PARTNER_ID?.trim();
  if (pid) u.searchParams.set("partner_id", pid);
  return u.toString();
}

export function findCity(id: string | null | undefined): City | undefined {
  if (!id) return undefined;
  const q = id.trim().toLowerCase();
  return CITIES.find((c) => c.id === q || c.name.toLowerCase().startsWith(q));
}

export function parseMonth(m: string | number | null | undefined): number | undefined {
  if (m === null || m === undefined || m === "") return undefined;
  const n = Number(m);
  if (Number.isInteger(n) && n >= 1 && n <= 12) return n;
  const s = String(m).trim().toLowerCase();
  const hit = MONTHS.find((x) => x.name.toLowerCase().startsWith(s.slice(0, 3)) && s.length >= 3);
  return hit?.month;
}

export function parseTraveler(t: string | null | undefined): Traveler | undefined {
  if (!t) return undefined;
  const s = t.trim().toLowerCase() as Traveler;
  return TRAVELERS.includes(s) ? s : undefined;
}

export type Plan = ReturnType<typeof buildPlan>;

export function buildPlan(city: City, month: number, traveler?: Traveler) {
  const m = MONTHS[month - 1];
  const events = city.events
    .filter((e) => e.months.includes(month))
    .map((e) => ({ ...e, verify: EVENT_NOTE }));
  const ranked = [...city.areas].sort((a, b) => {
    if (!traveler) return 0;
    return Number(b.goodFor.includes(traveler)) - Number(a.goodFor.includes(traveler));
  });
  const stay = ranked.map((a) => ({
    ...a,
    match: traveler ? a.goodFor.includes(traveler) : null,
    bookingUrl: bookingLink(a.name, city.name.replace(/ \(.*\)$/, "")),
  }));

  const warnings: string[] = [];
  const isPeak = city.peakMonths.includes(month) || m.crowds === "high";
  if (isPeak) warnings.push(`${m.name} is a peak month for ${city.name}. Book stays early and expect higher prices.`);
  if (month === 1) warnings.push("January 1–3: many shops, restaurants, and attractions close for New Year.");
  if (month === 4 || month === 5) warnings.push("Golden Week (about April 29 to May 5) brings heavy domestic crowds and high prices.");
  if (month === 8) warnings.push("Obon in mid-August fills trains and flights; reserve seats ahead.");
  if ([8, 9, 10].includes(month)) warnings.push("Typhoon season: keep a buffer day and check forecasts, especially for flights and ferries.");
  if (month === 6 && city.region !== "Hokkaido") warnings.push("Rainy season: pack an umbrella and plan indoor backups.");
  if ((month === 7 || month === 8) && city.region !== "Hokkaido") warnings.push("Heat and humidity can be dangerous at midday; sightsee early and late.");
  if (events.length) warnings.push("Hotels near festivals sell out fast; check this year's exact dates first.");

  return {
    city: { id: city.id, name: city.name, region: city.region, summary: city.summary },
    month: { number: month, name: m.name, season: m.season, weather: m.weather, crowds: m.crowds, isPeakForCity: isPeak },
    traveler: traveler ?? null,
    seasonalHighlight: city.seasonal[month] ?? null,
    monthNotes: m.notes,
    events,
    stay,
    thingsToDo: city.doAnytime,
    warnings,
    activitiesUrl: activitiesLink(city.name.replace(/ \(.*\)$/, "")),
    dataNote: "Typical seasonal patterns, not live data. Verify event dates, bloom forecasts, and closures for the current year.",
  };
}
