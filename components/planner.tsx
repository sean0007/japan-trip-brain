"use client";

import { useEffect, useMemo, useState } from "react";
import { CITIES, MONTHS, TRAVELERS, type Traveler } from "@/lib/data";
import { buildPlan } from "@/lib/plan";

const crowdColor = { low: "text-teal-200", medium: "text-amber", high: "text-rose-300" } as const;

export function Planner() {
  const [cityId, setCityId] = useState("kyoto");
  const [month, setMonth] = useState(11);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMonth(new Date().getMonth() + 1);
  }, []);
  const [traveler, setTraveler] = useState<Traveler | "">("couple");
  const city = CITIES.find((c) => c.id === cityId)!;
  const plan = useMemo(() => buildPlan(city, month, traveler || undefined), [city, month, traveler]);
  const apiPath = `/api/plan?city=${cityId}&month=${month}${traveler ? `&traveler=${traveler}` : ""}`;

  const select = "w-full rounded-2xl border border-line bg-panel px-3 py-2.5 text-foreground";
  return (
    <div className="grid gap-6">
      <div className="grid gap-3 rounded-3xl border border-line bg-panel/60 p-5 sm:grid-cols-3">
        <label className="text-sm text-muted">City
          <select className={select} value={cityId} onChange={(e) => setCityId(e.target.value)}>
            {CITIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </label>
        <label className="text-sm text-muted">Month
          <select className={select} value={month} onChange={(e) => setMonth(Number(e.target.value))}>
            {MONTHS.map((m) => <option key={m.month} value={m.month}>{m.name}</option>)}
          </select>
        </label>
        <label className="text-sm text-muted">Traveler
          <select className={select} value={traveler} onChange={(e) => setTraveler(e.target.value as Traveler | "")}>
            <option value="">Any</option>
            {TRAVELERS.map((t) => <option key={t} value={t}>{t[0].toUpperCase() + t.slice(1)}</option>)}
          </select>
        </label>
      </div>

      <section className="rounded-3xl border border-line bg-panel/60 p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-3xl tracking-tight">{city.name} in {plan.month.name}</h2>
          <span className={`font-mono text-xs uppercase tracking-[0.2em] ${crowdColor[plan.month.crowds]}`}>
            {plan.month.season} · crowds {plan.month.crowds}{plan.month.isPeakForCity ? " · peak" : ""}
          </span>
        </div>
        <p className="mt-2 text-muted">{city.summary}</p>
        <p className="mt-3 text-sm text-foreground">{plan.month.weather}</p>
        {plan.seasonalHighlight && <p className="mt-3 rounded-2xl bg-amber/10 px-4 py-3 text-sm text-amber">{plan.seasonalHighlight}</p>}
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
          {plan.monthNotes.map((n) => <li key={n}>{n}</li>)}
        </ul>
      </section>

      {plan.warnings.length > 0 && (
        <section className="rounded-3xl border border-rose-300/30 bg-rose-300/5 p-5">
          <h3 className="font-semibold text-rose-200">Watch out</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
            {plan.warnings.map((w) => <li key={w}>{w}</li>)}
          </ul>
        </section>
      )}

      <section className="rounded-3xl border border-line bg-panel/60 p-5">
        <h3 className="text-lg font-semibold">Festivals and events this month</h3>
        {plan.events.length === 0 ? (
          <p className="mt-2 text-sm text-muted">No major recurring festival in this dataset for {plan.month.name}. Check local listings for smaller events.</p>
        ) : (
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {plan.events.map((e) => (
              <article key={e.name} className="rounded-2xl border border-line p-4">
                <p className="font-semibold">{e.name}</p>
                <p className="font-mono text-xs text-amber">{e.when}</p>
                <p className="mt-1 text-sm text-muted">{e.what}</p>
                <p className="mt-2 text-xs text-muted/80">{e.verify}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-line bg-panel/60 p-5">
        <h3 className="text-lg font-semibold">Where to stay{traveler ? ` (${traveler})` : ""}</h3>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {plan.stay.map((a) => (
            <article key={a.name} className={`rounded-2xl border p-4 ${a.match ? "border-amber/50" : "border-line"}`}>
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-semibold">{a.name}</p>
                <span className="font-mono text-xs text-muted">{a.price}{a.match ? " · good fit" : ""}</span>
              </div>
              <p className="mt-1 text-sm text-muted">{a.why}</p>
              <p className="mt-1 text-xs text-muted/80">Downside: {a.downside}</p>
              <a href={a.bookingUrl} target="_blank" rel="noopener noreferrer sponsored" className="mt-3 inline-flex rounded-full bg-amber px-4 py-1.5 text-xs font-semibold text-black hover:bg-amber/90">
                See hotels in {a.name}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-line bg-panel/60 p-5">
        <h3 className="text-lg font-semibold">Things to do any time</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
          {plan.thingsToDo.map((t) => <li key={t}>{t}</li>)}
        </ul>
        <a href={plan.activitiesUrl} target="_blank" rel="noopener noreferrer sponsored" className="mt-3 inline-flex rounded-full border border-line px-4 py-1.5 text-xs text-foreground hover:bg-white/5">
          Browse tours and tickets in {city.name}
        </a>
      </section>

      <p className="font-mono text-xs text-muted">
        Same answer as JSON for your AI agent: <a className="text-amber underline" href={apiPath}>{apiPath}</a>
      </p>
    </div>
  );
}
