"use client";

import { m, useReducedMotion } from "framer-motion";
import { EASE_REVEAL, EASE_EDITORIAL, DURATION, STAGGER } from "@/lib/animation";

type HeroAnimationProps = {
  children: React.ReactNode;
};

export function HeroAnimation({ children }: HeroAnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <m.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: STAGGER.HERO,
          },
        },
      }}
    >
      {children}
    </m.div>
  );
}

export function HeroImage({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <m.div
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: DURATION.SLOWEST, ease: EASE_REVEAL },
        },
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}

export function HeroContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <m.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: DURATION.SLOWER, ease: EASE_EDITORIAL, delay: 0.4 },
        },
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}

export function HeroCTA({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <m.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: DURATION.SLOW, ease: EASE_EDITORIAL, delay: 0.8 },
        },
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}
