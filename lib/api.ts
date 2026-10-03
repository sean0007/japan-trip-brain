import { CITIES, MONTHS, TRAVELERS } from "./data";
import { buildPlan, findCity, parseMonth, parseTraveler } from "./plan";
import { InputError, type Endpoint } from "./agent-api";
import { DISCLAIMER_SHORT, HONESTY, SITE_NAME, SITE_TAGLINE } from "./site";

export const PUBLIC_URL = "https://japan-trip-brain.vercel.app";
export const API_DISCLAIMER = `${DISCLAIMER_SHORT} ${HONESTY}`;
export const API_INFO = { title: SITE_NAME, description: SITE_TAGLINE };

const CITY_IDS = CITIES.map((c) => c.id);

export const ENDPOINTS: Record<"plan" | "cities", Endpoint> = {
  plan: {
    path: "/api/plan",
    operationId: "planJapanTrip",
    summary: "Where to stay, events, and what to do for a Japanese city in a given month",
    description:
      "Returns season, weather, crowd level, the month's seasonal highlight, festivals that month (with typical dates), stay areas ranked for the traveler with a booking search URL each, things to do, warnings (New Year closures, Golden Week, Obon, rainy season, typhoons, heat), and an activities search URL. Typical seasonal patterns, not live data.",
    params: [
      { name: "city", type: "string", required: true, enum: CITY_IDS, description: "City id (a city name prefix also works)." },
      { name: "month", type: "string", required: true, description: "1-12 or English month name." },
      { name: "traveler", type: "string", enum: TRAVELERS, description: "Optional traveler type; ranks stay areas for them." },
    ],
    example: "/api/plan?city=kyoto&month=11&traveler=couple",
    compute: (i) => {
      const city = findCity(i.city == null ? null : String(i.city));
      const month = parseMonth(i.month == null ? null : (i.month as string | number));
      const travelerRaw = i.traveler == null || i.traveler === "" ? null : String(i.traveler);
      const traveler = parseTraveler(travelerRaw);
      if (!city || !month || (travelerRaw && !traveler)) {
        throw new InputError(`Need city (${CITY_IDS.join(", ")}) and month (1-12 or name). traveler is optional (${TRAVELERS.join(", ")}).`);
      }
      return buildPlan(city, month, traveler);
    },
  },
  cities: {
    path: "/api/cities",
    operationId: "listJapanCities",
    summary: "Supported cities, months, and traveler types",
    description: "Lists every supported city with region, summary, peak months, and stay areas; the 12 months with season and crowd level; and traveler types.",
    params: [],
    example: "/api/cities",
    compute: () => ({
      cities: CITIES.map((c) => ({ id: c.id, name: c.name, region: c.region, summary: c.summary, peakMonths: c.peakMonths, areas: c.areas.map((a) => a.name) })),
      months: MONTHS.map((m) => ({ number: m.month, name: m.name, season: m.season, crowds: m.crowds })),
      travelers: TRAVELERS,
    }),
  },
};

export const PLUGIN = {
  name: SITE_NAME,
  nameForModel: "japan_trip_brain",
  descriptionForHuman: "Where to stay, what's on, and what to do in Japan for any city, month, and traveler.",
  descriptionForModel:
    "Use when a user asks where to stay, when to go, or what is happening in a Japanese city (Tokyo, Kyoto, Osaka, and more) in a given month. Returns seasonal guidance, festivals, ranked stay areas with booking search links, and warnings. Typical patterns, not live data; tell the user to verify dates.",
  logo: "/icon.svg",
};
