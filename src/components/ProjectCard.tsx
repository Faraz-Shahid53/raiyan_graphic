"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/reduced-motion";
import type { Project } from "@/data/projects";

interface Props {
  project: Project;
  index: number;
}

/**
 * Stacked project row: index + meta on the left, media on the right.
 * Media does a clip-path reveal on enter and a subtle parallax while scrolling.
 */
export default function ProjectCard({ project, index }: Props) {
  const rootRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || prefersReducedMotion()) return;

    const media = el.querySelector("[data-media]");
    const image = el.querySelector("[data-media-img]");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        media,
        { clipPath: "inset(18% 10% 18% 10%)", opacity: 0.001 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        }
      );
      gsap.fromTo(
        image,
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const num = String(index + 1).padStart(2, "0");

  return (
    <a
      ref={rootRef}
      href={project.behanceUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="view"
      data-media-frame
      className="group grid grid-cols-1 gap-6 border-t border-line py-10 sm:grid-cols-12 sm:py-14"
    >
      <div className="order-2 flex flex-col justify-end gap-3 sm:order-1 sm:col-span-4">
        <span className="font-display text-sm text-muted">
          {num} <span className="text-accent">/</span> {project.year}
        </span>
        <h3 className="font-display text-[clamp(1.6rem,3vw,2.6rem)] font-semibold leading-tight transition-colors duration-300 group-hover:text-accent">
          {project.title}
        </h3>
        <p className="text-sm uppercase tracking-[0.15em] text-muted">
          {project.category}
        </p>
        <ul className="mt-1 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line px-3 py-1 text-[11px] uppercase tracking-wider text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <div className="sm:col-span-8">
        <div
          data-media
          className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-surface"
        >
          <Image
            data-media-img
            src={project.cover}
            alt={`${project.title} — ${project.category}`}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="h-[114%] w-full -translate-y-[6%] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            loading={index < 2 ? "eager" : "lazy"}
          />
        </div>
      </div>
    </a>
  );
}
