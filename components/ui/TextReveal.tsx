"use client";

import { useRef, createElement } from "react";
import { m, useInView, useReducedMotion } from "framer-motion";
import { EASE_REVEAL, DURATION, STAGGER } from "@/lib/animation";

type TextRevealProps = {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
};

export function TextReveal({
  children,
  as: Tag = "h2",
  className,
  delay = 0,
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  const lines = children.split("\n").filter((line) => line.trim() !== "");

  if (prefersReducedMotion) {
    return createElement(Tag, { className }, children);
  }

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span
          key={i}
          style={{ display: "block", overflow: "hidden" }}
        >
          <m.span
            style={{ display: "block" }}
            initial={{ y: "100%", skewY: 1 }}
            animate={
              isInView
                ? { y: 0, skewY: 0 }
                : { y: "100%", skewY: 1 }
            }
            transition={{
              duration: DURATION.SLOWER,
              delay: delay + i * STAGGER.LINE,
              ease: EASE_REVEAL,
            }}
          >
            {line}
          </m.span>
        </span>
      ))}
    </Tag>
  );
}
