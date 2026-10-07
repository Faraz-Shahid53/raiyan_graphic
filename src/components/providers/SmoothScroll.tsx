"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/reduced-motion";

/**
 * Lenis smooth scroll wired into GSAP ScrollTrigger.
 * Also exposes a tiny imperative API (lock/unlock/scrollTo) for the
 * preloader and in-page anchors via window.__lenis.
 */
declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      // Native scroll; keep ScrollTrigger working on the native scroll event.
      ScrollTrigger.update();
      return;
    }

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => 1 - Math.pow(1 - t, 4), // gentle expo-out feel
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      window.__lenis = undefined;
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
