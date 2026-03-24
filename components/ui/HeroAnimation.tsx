"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_REVEAL, DURATION } from "@/lib/animation";

type HeroAnimationProps = {
  children: React.ReactNode;
};

export function HeroAnimation({ children }: HeroAnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Sub-components for individual animated elements
export function HeroImage({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
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
    </motion.div>
  );
}

export function HeroContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: DURATION.SLOWER, ease: EASE_REVEAL, delay: 0.3 },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HeroCTA({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: DURATION.SLOW, ease: EASE_REVEAL, delay: 0.6 },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
