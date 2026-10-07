"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import MagneticButton from "./MagneticButton";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Header: tagline strip + wordmark + Let's talk + Menu, with a full-screen overlay. */
export default function Header() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Lock scroll behind the overlay (Lenis when active, CSS as fallback).
  useEffect(() => {
    if (open) {
      window.__lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      window.__lenis?.start();
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const goTo = (href: string) => {
    setOpen(false);
    if (href.startsWith("/#")) {
      const id = href.slice(1); // "#work"
      if (window.location.pathname === "/") {
        // small delay lets the overlay close-out finish before gliding
        setTimeout(() => scrollToId(id), 250);
      } else {
        sessionStorage.setItem("rf-pending-scroll", id);
        router.push(href);
      }
    } else {
      router.push(href);
    }
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* tagline strip */}
        <div className="hidden border-b border-line py-2 text-center font-display text-[10px] uppercase tracking-[0.35em] text-muted sm:block">
          {siteConfig.tagline}
        </div>

        <div className="flex items-center justify-between px-5 py-4 sm:px-8">
          <Link
            href="/"
            onClick={(e) => {
              setOpen(false);
              if (pathname === "/") {
                // already home: glide back to the hero instead of reloading
                e.preventDefault();
                window.__lenis
                  ? window.__lenis.scrollTo(0, { duration: 1.6 })
                  : window.scrollTo({ top: 0 });
              }
            }}
            className="font-display text-sm font-semibold uppercase tracking-[0.25em]"
          >
            <span className="hidden sm:inline">{siteConfig.name}</span>
            <span className="sm:hidden">
              {siteConfig.initials}
              <span className="text-accent">.</span>
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-5">
            <MagneticButton
              onClick={() => goTo("/#contact")}
              className="rounded-full border border-line px-4 py-2 text-xs uppercase tracking-[0.2em] text-fg transition-colors hover:border-accent hover:text-accent sm:px-5 sm:py-2.5"
              strength={10}
            >
              Let’s talk
            </MagneticButton>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              data-cursor="link"
              className="group flex h-11 w-11 flex-col items-center justify-center gap-[6px] rounded-full border border-line"
            >
              <span
                className={`h-px w-5 bg-fg transition-transform duration-300 ${
                  open ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-5 bg-fg transition-transform duration-300 ${
                  open ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && <MenuOverlay key="menu" goTo={goTo} />}
      </AnimatePresence>
    </>
  );
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  window.__lenis
    ? window.__lenis.scrollTo(el, { offset: -80, duration: 1.8 })
    : el.scrollIntoView({ behavior: "smooth" });
}

function MenuOverlay({ goTo }: { goTo: (href: string) => void }) {
  const links = [
    { label: "Work", href: "/#work" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/#services" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <motion.div
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.9, ease: EASE }}
      className="fixed inset-0 z-40 flex flex-col justify-between bg-surface pb-10 pt-28 sm:pt-32"
    >
      <nav className="px-5 sm:px-8">
        <ul>
          {links.map((link, i) => (
            <li key={link.label} className="overflow-hidden border-b border-line">
              <motion.button
                type="button"
                onClick={() => goTo(link.href)}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                exit={{ y: "110%" }}
                transition={{
                  duration: 1.0,
                  ease: EASE,
                  delay: 0.15 + i * 0.09,
                }}
                data-cursor="link"
                className="group flex w-full items-baseline gap-4 py-3 text-left sm:py-5"
              >
                <span className="font-sans text-xs text-muted">
                  0{i + 1}
                </span>
                <span className="font-display text-[clamp(2.6rem,9vw,7rem)] font-semibold leading-[1.05] transition-colors duration-300 group-hover:text-accent">
                  {link.label}
                </span>
              </motion.button>
            </li>
          ))}
        </ul>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
        className="flex flex-wrap items-end justify-between gap-6 px-5 sm:px-8"
      >
        <div>
          <p className="mb-1 text-xs uppercase tracking-[0.2em] text-muted">
            Get in touch
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-display text-lg text-fg underline decoration-line underline-offset-4 hover:decoration-accent sm:text-2xl"
          >
            {siteConfig.email}
          </a>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm uppercase tracking-[0.15em] text-muted">
          {Object.entries(siteConfig.socials).map(([name, url]) => (
            <li key={name}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="capitalize transition-colors hover:text-accent"
              >
                {name === "twitter" ? "X" : name}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
