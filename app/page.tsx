import Link from "next/link";
import { Planner } from "@/components/planner";

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
      <section className="max-w-3xl">
        <p className="font-mono text-[11px] tracking-[0.28em] text-amber uppercase">Free Japan planner · no login · agent-ready</p>
        <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl">
          Where to stay and what&apos;s on in Japan, for the month you&apos;re going.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          Pick a city, a month, and who&apos;s traveling. Get the season, crowds, festivals, the best
          area to stay, what to do, and what to watch out for. Your AI assistant can ask the same
          thing through a free API. <Link href="/agents" className="text-amber underline">See how</Link>.
        </p>
      </section>
      <section className="mt-8">
        <Planner />
      </section>
    </div>
  );
}
