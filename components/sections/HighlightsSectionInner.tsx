"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";
import { AnimatedSectionHeading } from "@/components/ui/AnimatedSectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { EASE_EDITORIAL, DURATION } from "@/lib/animation";

type HighlightSlide = {
  image: any;
  title?: string;
  caption?: string;
};

type HighlightsData = {
  description?: string;
  slides?: HighlightSlide[];
};

type SectionHeading = { en: string; ja: string };

const AUTOPLAY_MS = 5000;
const SWIPE_THRESHOLD = 50;
const padIndex = (n: number) => String(n + 1).padStart(2, "0");

const slideVariants = {
  enter: (d: number) => ({ opacity: 0, x: d > 0 ? 80 : -80 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d > 0 ? -80 : 80 }),
};

/* ─── Main component ─── */
export function HighlightsSectionInner({
  data,
  heading,
}: {
  data: HighlightsData;
  heading: SectionHeading;
}) {
  const slides = data.slides || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const canAutoplay = slides.length > 1;

  const [direction, setDirection] = useState(0);
  const dragRef = useRef(0);

  const goTo = useCallback(
    (idx: number, dir?: number) => {
      setDirection(dir ?? (idx > activeIndex ? 1 : -1));
      setActiveIndex(idx);
      setProgress(0);
    },
    [activeIndex]
  );

  const goNext = useCallback(() => {
    goTo((activeIndex + 1) % slides.length, 1);
  }, [activeIndex, slides.length, goTo]);

  const goPrev = useCallback(() => {
    goTo((activeIndex - 1 + slides.length) % slides.length, -1);
  }, [activeIndex, slides.length, goTo]);

  /* Autoplay timer */
  useEffect(() => {
    if (!canAutoplay) return;
    setProgress(0);
    const frame = requestAnimationFrame(() => setProgress(100));
    const timer = setTimeout(() => goNext(), AUTOPLAY_MS);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [activeIndex, canAutoplay, goNext]);

  const current = slides[activeIndex];
  if (!current) return null;

  return (
    <section className="section-padding bg-cream-50 overflow-hidden">
      <div className="container-site">
        {/* ── Heading ── */}
        <AnimatedSectionHeading title={heading.en} titleJa={heading.ja} />

        {/* ── Description ── */}
        {data.description ? (
          <ScrollReveal delay={0.2}>
            <p className="text-base md:text-lg font-serif-ja text-dark-muted leading-relaxed text-center max-w-2xl mx-auto -mt-4 mb-12 md:mb-16">
              {data.description}
            </p>
          </ScrollReveal>
        ) : null}

        {/* ── Image strip (3:1 aspect) ── */}
        <ScrollReveal delay={0.3}>
          <m.div
            className="relative w-full overflow-hidden bg-dark touch-pan-y"
            style={{ aspectRatio: "3/1", minHeight: 200, maxHeight: 360 }}
            onPointerDown={(e) => { dragRef.current = e.clientX; }}
            onPointerUp={(e) => {
              const dx = e.clientX - dragRef.current;
              if (Math.abs(dx) > SWIPE_THRESHOLD && slides.length > 1) {
                if (dx < 0) goNext();
                else goPrev();
              }
              dragRef.current = 0;
            }}
          >
            <AnimatePresence mode="sync" custom={direction}>
              <m.div
                key={activeIndex}
                custom={direction}
                variants={prefersReducedMotion ? undefined : slideVariants}
                initial={prefersReducedMotion ? false : "enter"}
                animate="center"
                exit="exit"
                transition={{ duration: DURATION.SLOWER, ease: EASE_EDITORIAL }}
                className="absolute inset-0"
              >
                <m.div
                  initial={prefersReducedMotion ? false : { scale: 1.03 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 6, ease: "linear" }}
                  className="w-full h-full"
                >
                  <Image
                    src={urlFor(current.image).width(1400).quality(80).url()}
                    alt={current.title || `ハイライト ${activeIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    priority={activeIndex === 0}
                  />
                </m.div>
              </m.div>
            </AnimatePresence>

            {/* Subtle center overlay */}
            <div className="absolute inset-0 bg-dark/20 pointer-events-none" />

            {/* Centered number overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <AnimatePresence mode="wait">
                <m.span
                  key={activeIndex}
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: DURATION.SLOW, ease: EASE_EDITORIAL }}
                  className="text-[clamp(48px,8vw,80px)] font-serif font-light text-white/10 leading-none select-none"
                >
                  {padIndex(activeIndex)}
                </m.span>
              </AnimatePresence>
            </div>

            {/* Dot navigation */}
            {slides.length > 1 ? (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-[5px] z-10">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`スライド ${i + 1}`}
                    className={`h-[6px] rounded-full border-none cursor-pointer transition-all duration-400 ${
                      i === activeIndex
                        ? "w-6 bg-terra"
                        : "w-[6px] bg-white/30 hover:bg-white/50"
                    }`}
                    style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                  />
                ))}
              </div>
            ) : null}

            {/* Progress bar */}
            {canAutoplay ? (
              <div
                className="absolute bottom-0 left-0 h-[2px] bg-terra"
                style={{
                  width: `${progress}%`,
                  transition: progress === 0 ? "none" : `width ${AUTOPLAY_MS}ms linear`,
                }}
              />
            ) : null}
          </m.div>
        </ScrollReveal>

        {/* ── Text info below image ── */}
        <ScrollReveal delay={0.4}>
          <div className="grid grid-cols-[auto_1fr] gap-6 pt-6 pb-2 items-start">
            {/* Number decoration */}
            <AnimatePresence mode="wait">
              <m.span
                key={activeIndex}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: DURATION.DEFAULT, ease: EASE_EDITORIAL }}
                className="text-5xl lg:text-6xl font-serif font-extralight text-terra/12 leading-none select-none tabular-nums"
              >
                {padIndex(activeIndex)}
              </m.span>
            </AnimatePresence>

            {/* Title + caption */}
            <div>
              <AnimatePresence mode="wait">
                <m.div
                  key={activeIndex}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: DURATION.SLOW, ease: EASE_EDITORIAL }}
                >
                  {current.title ? (
                    <h3 className="text-2xl lg:text-4xl font-serif-ja font-medium text-dark leading-[1.3] tracking-[0.02em]">
                      {current.title}
                    </h3>
                  ) : null}
                  {current.caption ? (
                    <p className="text-sm text-dark-muted leading-[1.8] mt-2 max-w-lg">
                      {current.caption}
                    </p>
                  ) : null}
                  <div className="w-9 h-[2px] bg-terra mt-4" />
                </m.div>
              </AnimatePresence>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
