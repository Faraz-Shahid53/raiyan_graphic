"use client";

import { siteConfig } from "@/config/site";
import { RevealLines, useRevealGroup } from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import MagneticButton from "@/components/MagneticButton";
import Image from "next/image";

/** About page content: portrait, bio, tools, experience, resume CTA. */
export default function AboutContent() {
  const ref = useRevealGroup<HTMLDivElement>();

  return (
    <div ref={ref} className="px-5 pb-28 pt-40 sm:px-8">
      <RevealLines
        as="h1"
        lines={["Designing with", "intent, not decoration."]}
        className="mb-16 font-display text-[clamp(2.2rem,6.5vw,5.5rem)] font-semibold uppercase"
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Portrait */}
        <div data-reveal className="lg:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-surface">
            <Image
              src="/portrait.jpeg"
              alt="Portrait of Raiyan Faisal"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
              priority
            />
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted">
            {siteConfig.location} · {siteConfig.origin}
          </p>
        </div>

        {/* Bio + facts */}
        <div className="lg:col-span-7">
          <div data-reveal>
            <p className="text-lg leading-relaxed sm:text-2xl sm:leading-[1.5]">
              {siteConfig.bio}
            </p>
            <p className="mt-6 max-w-xl leading-relaxed text-muted">
              My work sits where strategy meets craft: a logo that survives
              scaling down to 16&nbsp;px, an identity system that stays
              consistent across every touchpoint, packaging that sells the
              product on a crowded shelf. I keep the process collaborative and
              the hand-off complete.
            </p>
          </div>

          <div data-reveal className="mt-12 grid grid-cols-2 gap-8 border-t border-line pt-10 sm:grid-cols-3">
            <div>
              <p className="font-display text-3xl font-semibold text-accent">
                3.5+
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">
                Years experience
              </p>
            </div>
            <div>
              <p className="font-display text-3xl font-semibold text-accent">
                03+
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">
                Brand projects
              </p>
            </div>
            <div>
              <p className="font-display text-3xl font-semibold text-accent">
                24h
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">
                Typical reply time
              </p>
            </div>
          </div>

          <div data-reveal className="mt-12 border-t border-line pt-10">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted">
              Toolkit
            </p>
            <ul className="flex flex-wrap gap-3">
              {siteConfig.tools.map((tool) => (
                <li
                  key={tool}
                  className="rounded-full border border-line px-4 py-2 text-sm"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal className="mt-12 flex flex-wrap gap-4 border-t border-line pt-10">
            <MagneticButton
              href={siteConfig.resumeUrl}
              className="rounded-full bg-accent px-6 py-3.5 text-sm font-medium uppercase tracking-[0.12em] text-bg"
            >
              Download Resume ↓
            </MagneticButton>
            <MagneticButton
              href={siteConfig.socials.behance}
              className="rounded-full border border-line px-6 py-3.5 text-sm uppercase tracking-[0.12em] transition-colors hover:border-accent hover:text-accent"
            >
              Behance Profile ↗
            </MagneticButton>
          </div>
        </div>
      </div>

      <div className="mt-24 border-y border-line py-6">
        <Marquee
          items={["Logo Design", "Brand Identity", "Packaging", "Visual Systems", "Social Media"]}
          speed={40}
        />
      </div>
    </div>
  );
}
