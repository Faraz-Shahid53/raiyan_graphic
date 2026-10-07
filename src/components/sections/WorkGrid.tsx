"use client";

import { useState } from "react";
import Image from "next/image";
import {
  projects,
  projectMatchesFilter,
  workFilters,
  type Project,
  type WorkFilter,
} from "@/data/projects";
import { useRevealGroup } from "@/components/Reveal";

/** Filterable project archive grid. */
export default function WorkGrid() {
  const [filter, setFilter] = useState<WorkFilter>("All");
  const ref = useRevealGroup<HTMLElement>();
  const visible = projects.filter((p) => projectMatchesFilter(p, filter));

  return (
    <section ref={ref} className="px-5 pb-28 pt-40 sm:px-8">
      <div data-reveal className="mb-6">
        <span className="mb-4 block font-display text-xs uppercase tracking-[0.3em] text-muted">
          (All Work)
        </span>
        <h1 className="font-display text-[clamp(2.4rem,7vw,6rem)] font-semibold uppercase">
          Project archive
        </h1>
      </div>

      <div
        data-reveal
        role="tablist"
        aria-label="Filter projects"
        className="mb-12 flex flex-wrap gap-2 border-y border-line py-4"
      >
        {workFilters.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === f}
            data-cursor="link"
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.15em] transition-colors ${
              filter === f
                ? "bg-accent text-bg"
                : "border border-line text-muted hover:border-accent hover:text-accent"
            }`}
          >
            {f}
            <span className="ml-2 text-[10px] opacity-70">
              {f === "All"
                ? projects.length
                : projects.filter((p) => projectMatchesFilter(p, f)).length}
            </span>
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="py-20 text-center text-muted">
          Nothing published in this category yet — check back soon.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2">
          {visible.map((project, i) => (
            <WorkTile key={project.slug} project={project} index={i} />
          ))}
        </ul>
      )}
    </section>
  );
}

function WorkTile({ project, index }: { project: Project; index: number }) {
  return (
    <li data-reveal>
      <a
        href={project.behanceUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="view"
        className="group block"
      >
        <div className="relative aspect-[16/11] w-full overflow-hidden rounded-lg bg-surface">
          <Image
            src={project.cover}
            alt={`${project.title} — ${project.category}`}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            loading={index < 2 ? "eager" : "lazy"}
          />
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <h2 className="font-display text-xl font-semibold transition-colors group-hover:text-accent sm:text-2xl">
            {project.title}
          </h2>
          <span className="shrink-0 text-xs uppercase tracking-[0.15em] text-muted">
            {project.category} · {project.year}
          </span>
        </div>
      </a>
    </li>
  );
}
