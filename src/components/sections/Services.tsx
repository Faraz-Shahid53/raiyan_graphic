"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { useRevealGroup } from "../Reveal";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Hover/click accordion list of services, one row open at a time. */
export default function Services() {
  const [open, setOpen] = useState<number | null>(0);
  const ref = useRevealGroup<HTMLElement>();

  return (
    <section
      ref={ref}
      id="services"
      className="border-t border-line px-5 py-24 sm:px-8 sm:py-32"
    >
      <div data-reveal className="mb-12">
        <span className="mb-4 block font-display text-xs uppercase tracking-[0.3em] text-muted">
          (Services)
        </span>
        <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-semibold uppercase">
          What I do
        </h2>
      </div>

      <div>
        {siteConfig.services.map((service, i) => {
          const isOpen = open === i;
          return (
            <div key={service.title} data-reveal className="border-t border-line">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                onMouseEnter={() => setOpen(i)}
                data-cursor="link"
                className="group flex w-full items-center justify-between gap-6 py-6 text-left sm:py-8"
              >
                <span className="flex items-baseline gap-4 sm:gap-8">
                  <span className="font-display text-xs text-muted">
                    0{i + 1}
                  </span>
                  <span
                    className={`font-display text-[clamp(1.4rem,3.2vw,2.6rem)] font-semibold transition-colors duration-300 ${
                      isOpen ? "text-accent" : "group-hover:text-accent"
                    }`}
                  >
                    {service.title}
                  </span>
                </span>
                <span
                  className={`text-2xl text-muted transition-transform duration-500 ${
                    isOpen ? "rotate-45 text-accent" : ""
                  }`}
                  aria-hidden
                >
                  +
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.p
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="max-w-2xl overflow-hidden pb-7 pl-0 text-sm leading-relaxed text-muted sm:pl-16 sm:text-base"
                  >
                    {service.description}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          );
        })}
        <div className="border-t border-line" />
      </div>
    </section>
  );
}
