"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { useRevealGroup } from "./Reveal";

/** Footer: giant wordmark, socials, back-to-top, availability dot. */
export default function Footer() {
  const ref = useRevealGroup<HTMLElement>();
  const [year, setYear] = useState<string | null>(null);

  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);

  const backToTop = () => {
    window.__lenis
      ? window.__lenis.scrollTo(0, { duration: 2.2 })
      : window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={ref} className="border-t border-line px-5 pb-8 pt-16 sm:px-8">
      <div
        data-reveal
        className="mb-10 flex flex-wrap items-start justify-between gap-8 border-b border-line pb-12"
      >
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted">
            navigation
          </p>
          <ul className="space-y-2 text-sm">
            {siteConfig.nav.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="transition-colors hover:text-accent"
                  onClick={(e) => {
                    if (item.href.startsWith("/#")) {
                      e.preventDefault();
                      const el = document.getElementById(item.href.slice(2));
                      if (el) {
                        window.__lenis
                          ? window.__lenis.scrollTo(el, { offset: -80 })
                          : el.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted">
            follow
          </p>
          <ul className="space-y-2 text-sm">
            {Object.entries(siteConfig.socials).map(([name, url]) => (
              <li key={name}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="capitalize transition-colors hover:text-accent"
                >
                  {name === "twitter" ? "X / Twitter" : name} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted">
            contact
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="block max-w-64 text-sm underline decoration-line underline-offset-4 hover:decoration-accent"
          >
            {siteConfig.email}
          </a>
          <button
            type="button"
            onClick={backToTop}
            data-cursor="link"
            className="mt-6 rounded-full border border-line px-5 py-2.5 text-xs uppercase tracking-[0.2em] transition-colors hover:border-accent hover:text-accent"
          >
            Back to top ↑
          </button>
        </div>
      </div>

      {/* Giant wordmark */}
      <div data-reveal className="overflow-hidden py-6">
        <p className="select-none whitespace-nowrap text-center font-display text-[clamp(3rem,13vw,12rem)] font-bold uppercase leading-none tracking-tight text-fg/[0.08]">
          {siteConfig.name}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-xs uppercase tracking-[0.15em] text-muted">
        <span>
          © {year} {siteConfig.name}. All rights reserved.
        </span>
        <span className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {siteConfig.status}
        </span>
      </div>
    </footer>
  );
}
