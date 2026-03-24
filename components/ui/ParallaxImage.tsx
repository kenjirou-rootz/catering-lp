"use client";

import { useRef } from "react";
import { m, useScroll, useTransform, useReducedMotion } from "framer-motion";

type ParallaxImageProps = {
  children: React.ReactNode;
  speed?: number;
  className?: string;
};

export function ParallaxImage({
  children,
  speed = 0.05,
  className,
}: ParallaxImageProps) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      <m.div style={{ y, scale: 1.1, position: "relative", width: "100%", height: "100%" }}>
        {children}
      </m.div>
    </div>
  );
}
