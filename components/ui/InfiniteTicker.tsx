"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  m,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
} from "framer-motion";
import { TICKER } from "@/lib/animation";

type InfiniteTickerProps = {
  children: React.ReactNode;
  speed?: number;
  gap?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
};

export function InfiniteTicker({
  children,
  speed = TICKER.SPEED,
  gap = TICKER.GAP,
  direction = "left",
  pauseOnHover = true,
  className,
}: InfiniteTickerProps) {
  const prefersReducedMotion = useReducedMotion();
  const trackRef = useRef<HTMLUListElement>(null);
  const singleSetWidth = useRef(0);
  const velocity = useRef(1);
  const [hovered, setHovered] = useState(false);
  const [duplicateCount, setDuplicateCount] = useState(3);
  const x = useMotionValue(0);

  const items = React.Children.toArray(children);

  const measure = useCallback(() => {
    if (!trackRef.current || items.length === 0) return;
    const firstSet = trackRef.current.children;
    let width = 0;
    for (let i = 0; i < items.length && i < firstSet.length; i++) {
      width += (firstSet[i] as HTMLElement).offsetWidth + gap;
    }
    singleSetWidth.current = width;

    if (width > 0) {
      const vw = window.innerWidth;
      setDuplicateCount(Math.max(3, Math.ceil((vw * 2) / width) + 1));
    }
  }, [items.length, gap]);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [measure]);

  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion || singleSetWidth.current === 0) return;

    const target = hovered && pauseOnHover ? 0 : 1;
    velocity.current += (target - velocity.current) * TICKER.LERP;

    const dir = direction === "left" ? -1 : 1;
    const next = x.get() + dir * speed * velocity.current * (delta / 1000);

    if (Math.abs(next) >= singleSetWidth.current) {
      x.set(next % singleSetWidth.current);
    } else {
      x.set(next);
    }
  });

  if (items.length === 0) return null;

  if (prefersReducedMotion) {
    return (
      <div className={className}>
        <ul
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ gap }}
          role="list"
          aria-label="実績ギャラリー"
        >
          {items.map((child, i) => (
            <li key={i} className="flex-shrink-0 snap-start">
              {child}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ overflow: "hidden" }}>
        <m.ul
          ref={trackRef}
          style={{ x, gap }}
          className="flex flex-nowrap"
          role="list"
          aria-label="実績ギャラリー"
        >
          {Array.from({ length: duplicateCount }, (_, setIndex) =>
            items.map((child, i) => (
              <li
                key={`${setIndex}-${i}`}
                className="flex-shrink-0"
                aria-hidden={setIndex > 0 ? true : undefined}
              >
                {child}
              </li>
            ))
          )}
        </m.ul>
      </div>
    </div>
  );
}
