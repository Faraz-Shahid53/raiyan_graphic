"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { WordReveal, useRevealGroup } from "../Reveal";

/** Short about teaser with the word-by-word scroll reveal. */
export default function AboutIntro() {
  const ref = useRevealGroup<HTMLElement>();

  return (
    <section
      ref={ref}
      id="about-intro"
      className="border-t border-line px-5 py-24 sm:px-8 sm:py-32"
    >
      <div data-reveal className="mb-10 flex items-baseline justify-between">
        <span className="font-display text-xs uppercase tracking-[0.3em] text-muted">
          (About)
        </span>
        <span className="text-xs uppercase tracking-[0.2em] text-muted">
          {siteConfig.location}
        </span>
      </div>

      <WordReveal
        text={siteConfig.bio}
        className="max-w-5xl font-display text-[clamp(1.4rem,3.4vw,2.8rem)] font-medium leading-[1.25] tracking-tight"
      />

      <div data-reveal className="mt-12">
        <Link
          href="/about"
          data-cursor="link"
          className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-fg"
        >
          More about me
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
