"use client";

import { siteConfig } from "@/config/site";
import { useRevealGroup } from "../Reveal";

/** Four-step process grid with oversized index numbers. */
export default function Process() {
  const ref = useRevealGroup<HTMLElement>();

  return (
    <section
      ref={ref}
      id="process"
      className="border-t border-line px-5 py-24 sm:px-8 sm:py-32"
    >
      <div data-reveal className="mb-14">
        <span className="mb-4 block font-display text-xs uppercase tracking-[0.3em] text-muted">
          (Process)
        </span>
        <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-semibold uppercase">
          How we get there
        </h2>
      </div>

      <ol className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        {siteConfig.process.map((step, i) => (
          <li key={step.title} data-reveal className="bg-bg p-7 sm:p-9">
            <span className="font-display text-[clamp(3rem,6vw,5rem)] font-bold leading-none text-fg/10">
              0{i + 1}
            </span>
            <h3 className="mt-5 font-display text-xl font-semibold uppercase tracking-wide">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
