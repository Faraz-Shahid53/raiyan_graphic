"use client";

import {
  useEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { onUiReady } from "@/lib/ui-ready";
import { prefersReducedMotion } from "@/lib/reduced-motion";

/**
 * Line-mask reveal: each line lives in an overflow-hidden box and slides up.
 * playOn="ready" starts after the preloader, "scroll" on ScrollTrigger enter.
 */
export function RevealLines({
  lines,
  as: Tag = "h2",
  className = "",
  playOn = "scroll",
  start = "top 85%",
  delay = 0,
  stagger = 0.14,
  duration = 1.3,
}: {
  lines: string[];
  as?: ElementType;
  className?: string;
  playOn?: "ready" | "scroll";
  start?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const spans = el.querySelectorAll<HTMLElement>("[data-line-inner]");
    const play = () =>
      gsap.fromTo(
        spans,
        { yPercent: 115 },
        {
          yPercent: 0,
          duration,
          stagger,
          delay,
          ease: "expo.out",
        }
      );

    let trigger: ScrollTrigger | undefined;
    const ctx = gsap.context(() => {
      if (playOn === "ready") {
        onUiReady(play);
      } else {
        trigger = ScrollTrigger.create({
          trigger: el,
          start,
          once: true,
          onEnter: play,
        });
      }
    }, el);

    return () => {
      trigger?.kill();
      ctx.revert();
    };
  }, [lines, playOn, start, delay, stagger, duration]);

  return (
    <Tag ref={ref} className={className} data-reveal="line">
      {lines.map((line, i) => (
        <span key={i} className="reveal-line">
          <span data-line-inner>{line}</span>
        </span>
      ))}
    </Tag>
  );
}

/**
 * Word-by-word opacity scrub for long intro paragraphs: words start dim and
 * brighten one by one while the paragraph scrolls through the viewport.
 */
export function WordReveal({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const words = el.querySelectorAll<HTMLElement>(".word");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.04,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 45%",
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [text]);

  return (
    <p ref={ref} className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="word">
          {word}{" "}
        </span>
      ))}
    </p>
  );
}

/** Generic fade/slide-up for any child marked data-reveal inside a section. */
export function useRevealGroup<T extends HTMLElement>(offset = 40) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll<HTMLElement>("[data-reveal]");
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { y: offset, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              once: true,
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, [offset]);

  return ref;
}

export function Reveal({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag data-reveal className={className}>
      {children}
    </Tag>
  );
}
