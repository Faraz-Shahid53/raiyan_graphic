"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { onUiReady } from "@/lib/ui-ready";
import { prefersReducedMotion } from "@/lib/reduced-motion";
import { siteConfig } from "@/config/site";
import { RevealLines } from "../Reveal";
import MagneticButton from "../MagneticButton";

/** Full-viewport intro: giant two-line heading, subline, CTAs, scroll cue. */
export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const late = el.querySelectorAll("[data-hero-late]");
      onUiReady(() => {
        if (prefersReducedMotion()) return;
        gsap.fromTo(
          late,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.3,
            stagger: 0.12,
            delay: 0.55,
            ease: "expo.out",
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-svh flex-col justify-center px-5 pb-24 pt-36 sm:px-8"
    >
      <RevealLines
        as="h1"
        lines={[...siteConfig.hero.lines]}
        playOn="ready"
        delay={0.15}
        className="font-display font-bold uppercase text-[clamp(3rem,11vw,11rem)] leading-[0.92] tracking-[-0.03em]"
      />

      <div className="mt-10 flex max-w-6xl flex-wrap items-end justify-between gap-10">
        <p
          data-hero-late
          className="max-w-md text-base leading-relaxed text-muted sm:text-lg"
        >
          {siteConfig.hero.subline}
        </p>

        <div data-hero-late className="flex flex-wrap items-center gap-4">
          <MagneticButton
            onClick={() => {
              const el = document.getElementById("contact");
              if (el) {
                if (window.__lenis) {
                  window.__lenis.scrollTo(el, { offset: -80, duration: 2 });
                } else {
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }
            }}
            className="rounded-full bg-accent px-6 py-3.5 text-sm font-medium uppercase tracking-[0.12em] text-bg"
          >
            Discuss Your Project
          </MagneticButton>
          <MagneticButton
            href={siteConfig.socials.behance}
            className="rounded-full border border-line px-6 py-3.5 text-sm uppercase tracking-[0.12em] text-fg transition-colors hover:border-accent hover:text-accent"
          >
            View Behance ↗
          </MagneticButton>
        </div>
      </div>

      {/* scroll cue */}
      <div
        data-hero-late
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted">
          Scroll
        </span>
        <span className="relative block h-12 w-px overflow-hidden bg-line">
          <span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-accent" />
        </span>
      </div>
    </section>
  );
}
