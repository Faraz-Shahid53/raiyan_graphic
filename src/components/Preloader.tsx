"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { markUiReady } from "@/lib/ui-ready";
import { prefersReducedMotion } from "@/lib/reduced-motion";
import { siteConfig } from "@/config/site";

const STORAGE_KEY = "rf-preloader-shown";

/**
 * Intro counter 0 -> 100 with the name, then a curtain lift.
 * Shows once per session; skips entirely under reduced motion.
 */
export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  // 0 = skip (no flash), render only when we know we will play.
  const [active, setActive] = useState(false);

  useEffect(() => {
    const skip =
      prefersReducedMotion() || sessionStorage.getItem(STORAGE_KEY) === "1";

    if (skip) {
      markUiReady();
      return;
    }
    sessionStorage.setItem(STORAGE_KEY, "1");
    const raf = requestAnimationFrame(() => setActive(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Runs after the overlay is actually in the DOM (active === true).
  useEffect(() => {
    if (!active) return;

    // Freeze scrolling while the intro plays.
    window.__lenis?.stop();

    const ctx = gsap.context(() => {
      const counter = { value: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          markUiReady();
          window.__lenis?.start();
        },
      });

      tl
        .fromTo(
          "[data-preloader-name] span",
          { yPercent: 120 },
          { yPercent: 0, duration: 1.1, stagger: 0.06, ease: "expo.out" }
        )
        .to(
          counter,
          {
            value: 100,
            duration: 2.1,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = String(
                  Math.round(counter.value)
                ).padStart(3, "0");
              }
            },
          },
          "<"
        )
        .to("[data-preloader-meta]", { opacity: 0, duration: 0.35 }, "-=0.4")
        .to(
          "[data-preloader-name] span",
          { yPercent: -120, duration: 0.7, stagger: 0.05, ease: "expo.in" },
          "-=0.1"
        )
        .to(
          rootRef.current,
          { yPercent: -101, duration: 1.0, ease: "expo.inOut" },
          "-=0.25"
        );
    }, rootRef);

    return () => {
      ctx.revert();
      window.__lenis?.start();
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
    >
      <div className="overflow-hidden">
        <div data-preloader-name className="flex overflow-hidden">
          {siteConfig.name.split(" ").map((word) => (
            <span
              key={word}
              className="block font-display text-4xl font-semibold tracking-tight sm:text-6xl"
            >
              {word}
              <span className="text-accent">.</span>
            </span>
          ))}
        </div>
      </div>

      <div
        data-preloader-meta
        className="absolute inset-x-6 bottom-8 flex items-end justify-between text-xs uppercase tracking-[0.2em] text-muted"
      >
        <span>{siteConfig.role}</span>
        <span ref={counterRef} className="font-display text-2xl text-fg">
          000
        </span>
      </div>
    </div>
  );
}
