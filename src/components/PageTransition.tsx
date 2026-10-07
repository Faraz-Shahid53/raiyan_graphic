"use client";

import { motion } from "framer-motion";
import { useEffect, type ReactNode } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Per-page enter transition (App Router friendly: mount animation only,
 * so it never delays route loads). Also restores a pending section scroll
 * queued by the header before a cross-page navigation.
 */
export default function PageTransition({
  children,
  restoreScrollKey,
}: {
  children: ReactNode;
  restoreScrollKey?: boolean;
}) {
  useEffect(() => {
    if (!restoreScrollKey) return;
    const pending = sessionStorage.getItem("rf-pending-scroll");
    if (!pending) return;
    sessionStorage.removeItem("rf-pending-scroll");

    const timer = setTimeout(() => {
      const el = document.getElementById(pending);
      if (!el) return;
      window.__lenis
        ? window.__lenis.scrollTo(el, { offset: -80, duration: 1.8 })
        : el.scrollIntoView();
    }, 500);
    return () => clearTimeout(timer);
  }, [restoreScrollKey]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
