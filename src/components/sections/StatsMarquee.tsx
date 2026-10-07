"use client";

import { siteConfig } from "@/config/site";
import Counter from "../Counter";
import Marquee from "../Marquee";
import { useRevealGroup } from "../Reveal";

/** Animated stats row + tools marquee. */
export default function StatsMarquee() {
  const ref = useRevealGroup<HTMLElement>();

  return (
    <section
      ref={ref}
      className="border-t border-line py-24 sm:py-32"
      aria-label="Key facts"
    >
      <div className="grid grid-cols-1 gap-10 px-5 sm:grid-cols-3 sm:px-8">
        {siteConfig.stats.map((stat, i) => (
          <div
            key={stat.label}
            data-reveal
            className={`flex flex-col gap-3 border-line sm:px-2 ${
              i > 0 ? "sm:border-l sm:pl-10" : ""
            }`}
          >
            <Counter
              value={stat.value}
              decimals={stat.decimals}
              prefix={"prefix" in stat ? stat.prefix : ""}
              suffix={"suffix" in stat ? stat.suffix : ""}
              className="font-display text-[clamp(3rem,7vw,6rem)] font-bold leading-none text-accent"
            />
            <span className="text-sm uppercase tracking-[0.2em] text-muted">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-20 border-y border-line py-6">
        <Marquee items={siteConfig.tools} />
      </div>
    </section>
  );
}
