import { test } from "node:test";
import assert from "node:assert/strict";
import { CITIES, MONTHS } from "./data";
import { buildPlan, findCity, parseMonth, parseTraveler, bookingLink } from "./plan";

test("12 months and 6 cities", () => {
  assert.equal(MONTHS.length, 12);
  assert.equal(CITIES.length, 6);
});

test("parsers", () => {
  assert.equal(parseMonth("4"), 4);
  assert.equal(parseMonth("november"), 11);
  assert.equal(parseMonth("Nov"), 11);
  assert.equal(parseMonth("13"), undefined);
  assert.equal(findCity("Kyoto")?.id, "kyoto");
  assert.equal(findCity("naha")?.id, "naha");
  assert.equal(parseTraveler("Family"), "family");
  assert.equal(parseTraveler("alien"), undefined);
});

test("kyoto july has gion matsuri and heat warning", () => {
  const p = buildPlan(findCity("kyoto")!, 7, "couple");
  assert.ok(p.events.some((e) => e.name === "Gion Matsuri"));
  assert.ok(p.warnings.some((w) => w.includes("Heat")));
});

test("traveler ranking puts matches first", () => {
  const p = buildPlan(findCity("tokyo")!, 5, "luxury");
  assert.equal(p.stay[0].match, true);
  assert.equal(p.stay[0].name, "Ginza / Tokyo Station");
});

test("sapporo has no rainy season warning in june", () => {
  const p = buildPlan(findCity("sapporo")!, 6);
  assert.ok(!p.warnings.some((w) => w.includes("Rainy")));
  assert.ok(p.events.some((e) => e.name.includes("YOSAKOI")));
});

test("booking link encodes area and city", () => {
  const u = new URL(bookingLink("Gion / Higashiyama", "Kyoto"));
  assert.equal(u.hostname, "www.booking.com");
  assert.equal(u.searchParams.get("ss"), "Gion / Higashiyama, Kyoto, Japan");
});

test("every city has a seasonal entry or note shape that builds for all months", () => {
  for (const c of CITIES) for (let m = 1; m <= 12; m++) {
    const p = buildPlan(c, m, "family");
    assert.ok(p.stay.length >= 2);
    assert.ok(p.month.name);
  }
});
