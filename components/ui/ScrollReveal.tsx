"use client";

import { useRef } from "react";
import { m, useInView, useReducedMotion } from "framer-motion";
import { EASE_REVEAL, EASE_EDITORIAL, DURATION } from "@/lib/animation";

type ScrollRevealVariant = "fadeUp" | "imageReveal" | "editorialSlide";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: ScrollRevealVariant;
};

const variants = {
  fadeUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  },
  imageReveal: {
    initial: { opacity: 0, scale: 1.1 },
    animate: { opacity: 1, scale: 1 },
  },
  editorialSlide: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
  },
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  variant = "fadeUp",
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const v = variants[variant];
  const ease = variant === "editorialSlide" ? EASE_EDITORIAL : EASE_REVEAL;

  return (
    <m.div
      ref={ref}
      initial={v.initial}
      animate={isInView ? v.animate : v.initial}
      transition={{
        duration: DURATION.SLOWER,
        delay,
        ease,
      }}
      className={className}
      style={variant === "imageReveal" ? { overflow: "hidden" } : undefined}
    >
      {children}
    </m.div>
  );
}
