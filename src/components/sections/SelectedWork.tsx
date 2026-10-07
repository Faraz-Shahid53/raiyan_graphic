"use client";

import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectCard from "../ProjectCard";
import { useRevealGroup } from "../Reveal";

/** Selected work list + link to the full /work archive. */
export default function SelectedWork() {
  const ref = useRevealGroup<HTMLElement>();

  return (
    <section
      ref={ref}
      id="work"
      className="border-t border-line px-5 py-24 sm:px-8 sm:py-32"
    >
      <div
        data-reveal
        className="mb-6 flex flex-wrap items-end justify-between gap-6"
      >
        <div>
          <span className="mb-4 block font-display text-xs uppercase tracking-[0.3em] text-muted">
            (Selected Work)
          </span>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-semibold uppercase">
            Case studies
          </h2>
        </div>
        <Link
          href="/work"
          data-cursor="link"
          className="rounded-full border border-line px-5 py-2.5 text-xs uppercase tracking-[0.2em] transition-colors hover:border-accent hover:text-accent"
        >
          All projects →
        </Link>
      </div>

      <div>
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
