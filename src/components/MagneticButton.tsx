"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { isFinePointer, prefersReducedMotion } from "@/lib/reduced-motion";

interface Props {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
  /** Max travel in px toward the pointer. */
  strength?: number;
}

/** Button/anchor that leans toward the cursor and springs back on leave. */
export default function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  ariaLabel,
  strength = 18,
}: Props) {
  const innerRef = useRef<HTMLSpanElement>(null);

  const shared = {
    className: `inline-block will-change-transform ${className}`,
    "aria-label": ariaLabel,
    onMouseMove: (e: React.MouseEvent<HTMLElement>) => {
      const el = innerRef.current;
      if (!el || prefersReducedMotion() || !isFinePointer()) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, {
        x: (x / rect.width) * strength * 2,
        y: (y / rect.height) * strength * 2,
        duration: 0.4,
        ease: "power3.out",
      });
    },
    onMouseLeave: () => {
      const el = innerRef.current;
      if (!el) return;
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
    },
  };

  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" {...shared}>
      <span ref={innerRef} className="inline-flex items-center gap-2">
        {children}
      </span>
    </a>
  ) : (
    <button type="button" onClick={onClick} {...shared}>
      <span ref={innerRef} className="inline-flex items-center gap-2">
        {children}
      </span>
    </button>
  );
}
