"use client";

import { useEffect, useRef } from "react";
import { isFinePointer, prefersReducedMotion } from "@/lib/reduced-motion";

/**
 * Small dot that tracks exactly + a lagging ring. Over any element with
 * data-cursor="view" (project cards) the ring grows and shows that label.
 * Renders nothing on touch devices or under reduced motion.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    document.documentElement.classList.add("has-custom-cursor");

    const pos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let scale = 1;
    let targetScale = 1;
    let label = "";
    let raf = 0;
    let visible = false;

    const show = () => {
      if (visible) return;
      visible = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      show();
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.("[data-cursor]");
      const value = target?.getAttribute("data-cursor") ?? "";
      if (value) {
        targetScale = value === "view" ? 3.4 : 2.2;
        label = value.charAt(0).toUpperCase() + value.slice(1);
      } else {
        targetScale = 1;
        label = "";
      }
      ring.dataset.active = value ? "true" : "false";
      ring.textContent = label;
    };

    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
      visible = false;
    };

    const tick = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;
      scale += (targetScale - scale) * 0.12;

      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Rendered (invisible) on every device; the effect above only activates
  // tracking on fine-pointer devices, so SSR markup always matches.
  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[95] h-1.5 w-1.5 rounded-full bg-accent opacity-0 mix-blend-difference"
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[95] flex h-11 w-11 items-center justify-center rounded-full border border-fg/40 font-display text-[10px] uppercase tracking-widest text-fg opacity-0 transition-colors duration-300 data-[active=true]:border-accent data-[active=true]:bg-accent data-[active=true]:text-bg"
      />
    </>
  );
}
