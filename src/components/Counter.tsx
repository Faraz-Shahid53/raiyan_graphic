"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/reduced-motion";

interface Props {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

/** Number that counts up once it scrolls into view. */
export default function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 2.2,
  className = "",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(
    prefersReducedMotion() ? value : 0
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const obj = { v: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        v: value,
        duration,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onUpdate: () =>
          setDisplay(Number(obj.v.toFixed(decimals))),
      });
    }, el);

    return () => ctx.revert();
  }, [value, decimals, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
