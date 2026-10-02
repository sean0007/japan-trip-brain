import type { Metadata } from "next";
import { DISCLAIMER_SHORT, HONESTY } from "@/lib/site";

export const metadata: Metadata = { title: "Disclaimer", description: DISCLAIMER_SHORT };

export default function DisclaimerPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-10">
      <p className="font-mono text-[11px] tracking-[0.28em] text-amber uppercase">Read this</p>
      <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl">Disclaimer</h1>
      <p className="mt-4 text-lg text-foreground">{DISCLAIMER_SHORT}</p>
      <p className="mt-2 text-muted">{HONESTY}</p>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted">
        <section>
          <h2 className="text-base font-semibold text-foreground">What this is</h2>
          <p className="mt-2">
            A free travel planner and JSON API built on well-established seasonal patterns in Japan:
            typical weather, crowd periods, holidays, and recurring festivals.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground">What it is not</h2>
          <p className="mt-2">
            It is not live data. Festival dates, cherry blossom and autumn leaf timing, closures, and
            prices change every year. Check official sources and forecasts before you book.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground">Links</h2>
          <p className="mt-2">
            Stay and activity links open searches on Booking.com and GetYourGuide. Some links may
            become affiliate links that pay this site a commission at no extra cost to you. This site
            is not affiliated with or endorsed by those companies or any festival organizer.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground">Your data</h2>
          <p className="mt-2">No login, database, or tracking. Choices you make stay in your browser.</p>
        </section>
      </div>
    </div>
  );
}
