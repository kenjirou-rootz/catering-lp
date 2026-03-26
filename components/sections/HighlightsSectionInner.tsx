"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { AnimatedSectionHeading } from "@/components/ui/AnimatedSectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { EASE_EDITORIAL, DURATION } from "@/lib/animation";

type HighlightSlide = {
  image: any;
  title?: string;
  caption?: string;
  ctaText?: string;
  ctaLink?: string;
};

type HighlightsData = {
  description?: string;
  slides?: HighlightSlide[];
};

type SectionHeading = { en: string; ja: string };

const AUTOPLAY_MS = 5000;
const SWIPE_THRESHOLD = 50;
const SLIDE_PCT = 0.91;
const GAP = 16;

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
  const [trackWidth, setTrackWidth] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const canAutoplay = slides.length > 1;

  const dragRef = useRef(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /* Measure container width */
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const measure = () => setTrackWidth(el.offsetWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const slideWidth = trackWidth * SLIDE_PCT;
  const offsetX = -(activeIndex * (slideWidth + GAP));

  const goTo = useCallback((idx: number) => setActiveIndex(idx), []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  /* Autoplay */
  useEffect(() => {
    if (!canAutoplay) return;
    const timer = setTimeout(goNext, AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [activeIndex, canAutoplay, goNext]);

  const current = slides[activeIndex];
  if (!current) return null;

  /* Padding to center first slide: (100% - 91%) / 2 = 4.5% */
  const padLeft = trackWidth * (1 - SLIDE_PCT) / 2;

  return (
    <section className="section-padding bg-cream-50 overflow-hidden">
      <div className="container-site">
        <AnimatedSectionHeading title={heading.en} titleJa={heading.ja} />

        {data.description ? (
          <ScrollReveal delay={0.2}>
            <p className="text-base md:text-lg font-serif-ja text-dark-muted leading-relaxed text-center max-w-2xl mx-auto -mt-4 mb-12 md:mb-16">
              {data.description}
            </p>
          </ScrollReveal>
        ) : null}
      </div>

      {/* ── Peek Carousel ── */}
      <ScrollReveal delay={0.3}>
        <div
          ref={wrapperRef}
          className="relative w-full overflow-hidden touch-pan-y select-none"
          onPointerDown={(e) => {
            dragRef.current = e.clientX;
          }}
          onPointerUp={(e) => {
            const dx = e.clientX - dragRef.current;
            if (Math.abs(dx) > SWIPE_THRESHOLD && slides.length > 1) {
              if (dx < 0) goNext();
              else goPrev();
            }
            dragRef.current = 0;
          }}
        >
          <m.div
            className="flex will-change-transform"
            style={{ gap: GAP, paddingLeft: padLeft }}
            animate={{ x: offsetX }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: DURATION.SLOWER, ease: EASE_EDITORIAL }
            }
          >
            {slides.map((slide, i) => {
              const isActive = i === activeIndex;
              return (
                <m.div
                  key={i}
                  className="shrink-0"
                  style={{ width: slideWidth || `${SLIDE_PCT * 100}%` }}
                  animate={{
                    scale: isActive ? 1 : 0.96,
                    opacity: isActive ? 1 : 0.55,
                  }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: DURATION.SLOW, ease: EASE_EDITORIAL }
                  }
                >
                  <div className="relative h-[400px] md:h-[540px] lg:h-[664px] overflow-hidden rounded-lg">
                    {/* Background image */}
                    <Image
                      src={urlFor(slide.image).width(1400).quality(80).url()}
                      alt={slide.title || `ハイライト ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 91vw, (max-width: 1280px) 91vw, 1164px"
                      priority={i === 0}
                    />

                    {/* Multiply overlay for text readability */}
                    <div className="absolute inset-0 bg-dark/55 mix-blend-multiply pointer-events-none" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-start justify-between p-6 md:p-8 lg:p-10">
                      {/* Top spacer */}
                      <div />

                      {/* Text: left-aligned */}
                      <div className="z-10 text-white text-left">
                        {slide.title ? (
                          <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight max-w-lg leading-[1.15]">
                            {slide.title}
                          </h3>
                        ) : null}
                        {slide.caption ? (
                          <p className="text-sm md:text-base lg:text-lg font-serif-ja max-w-lg my-4 md:my-6 leading-relaxed text-white/85">
                            {slide.caption}
                          </p>
                        ) : null}
                      </div>

                      {/* CTA: bottom-left */}
                      <div className="z-10 w-full flex justify-start">
                        <a
                          href={slide.ctaLink || "#contact"}
                          className="group inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/5 backdrop-blur-sm px-5 py-2.5 text-sm font-serif-ja text-white transition-all duration-300 hover:bg-terra hover:border-terra hover:shadow-lg"
                        >
                          {slide.ctaText || "相談する"}
                          <ArrowRight className="size-4 -rotate-45 transition-all duration-300 ease-out group-hover:rotate-0 group-hover:ml-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                </m.div>
              );
            })}
          </m.div>
        </div>

        {/* Dot navigation */}
        {slides.length > 1 ? (
          <div className="flex justify-center gap-1.5 mt-6">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`スライド ${i + 1}`}
                className={`h-2.5 rounded-full border-none cursor-pointer transition-all duration-400 ${
                  i === activeIndex
                    ? "w-4 bg-terra"
                    : "w-2.5 bg-dark-subtle/40 hover:bg-dark-subtle/60"
                }`}
                style={{
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            ))}
          </div>
        ) : null}
      </ScrollReveal>
    </section>
  );
}
