"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { m, useReducedMotion } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";
import { AnimatedSectionHeading } from "@/components/ui/AnimatedSectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { EASE_EDITORIAL, DURATION } from "@/lib/animation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

type ImagePair = {
  imageLarge: any;
  imageSmall: any;
};

type HighlightsData = {
  description?: string;
  slides?: ImagePair[];
};

type SectionHeading = { en: string; ja: string };

/* ─── Slide sub-component ─── */
function HighlightSlide({ pair, index }: { pair: ImagePair; index: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-end">
      {/* Large image — left, 8/12 cols */}
      <ScrollReveal variant="imageReveal" className="md:col-span-8">
        <ParallaxImage speed={0.03} className="relative aspect-[3/4] md:aspect-[4/5]">
          {pair.imageLarge ? (
            <Image
              src={urlFor(pair.imageLarge).width(900).quality(80).url()}
              alt={`ハイライト ${index + 1} メイン`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 65vw"
            />
          ) : (
            <div className="w-full h-full bg-cream-200 flex items-center justify-center text-dark-muted">
              画像準備中
            </div>
          )}
        </ParallaxImage>
      </ScrollReveal>

      {/* Small image — right, 4/12 cols */}
      <ScrollReveal variant="imageReveal" delay={0.15} className="md:col-span-4">
        <div className="relative aspect-[3/4] overflow-hidden">
          {pair.imageSmall ? (
            <Image
              src={urlFor(pair.imageSmall).width(500).quality(80).url()}
              alt={`ハイライト ${index + 1} サブ`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-cream-200 flex items-center justify-center text-dark-muted">
              画像準備中
            </div>
          )}
        </div>
      </ScrollReveal>
    </div>
  );
}

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
  const prefersReducedMotion = useReducedMotion();

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  const padIndex = (n: number) => String(n + 1).padStart(2, "0");

  return (
    <section className="section-padding bg-cream-50 overflow-hidden">
      <div className="container-site">
        {/* ── Heading block ── */}
        <AnimatedSectionHeading title={heading.en} titleJa={heading.ja} />

        {/* ── Description ── */}
        {data.description ? (
          <ScrollReveal delay={0.2}>
            <p className="text-base md:text-lg font-serif-ja text-dark-muted leading-relaxed text-center max-w-2xl mx-auto -mt-4 mb-12 md:mb-16">
              {data.description}
            </p>
          </ScrollReveal>
        ) : null}

        {/* ── Carousel area ── */}
        <div className="relative">
          {/* Slide counter — editorial decoration */}
          <ScrollReveal delay={0.3}>
            <div className="flex items-center justify-end gap-3 mb-6">
              <m.span
                key={activeIndex}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DURATION.DEFAULT, ease: EASE_EDITORIAL }}
                className="text-3xl md:text-4xl font-serif font-light text-terra leading-none tabular-nums"
              >
                {padIndex(activeIndex)}
              </m.span>
              <span className="w-8 h-[1px] bg-dark-subtle/40" />
              <span className="text-sm font-serif text-dark-subtle leading-none tabular-nums">
                {padIndex(slides.length - 1)}
              </span>
            </div>
          </ScrollReveal>

          {/* Swiper */}
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={
              slides.length > 1
                ? { delay: 5000, disableOnInteraction: false }
                : false
            }
            loop={slides.length > 1}
            slidesPerView={1}
            speed={800}
            pagination={{
              clickable: true,
              el: ".highlights-pagination",
              bulletClass: "highlights-bullet",
              bulletActiveClass: "highlights-bullet-active",
            }}
            onSlideChange={handleSlideChange}
          >
            {slides.map((pair, i) => (
              <SwiperSlide key={i}>
                <HighlightSlide pair={pair} index={i} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom pagination */}
          <ScrollReveal delay={0.4}>
            <div className="highlights-pagination flex items-center justify-center gap-3 mt-10" />
          </ScrollReveal>
        </div>
      </div>

      {/* Scoped pagination styles */}
      <style jsx global>{`
        .highlights-bullet {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: #A8A29E;
          opacity: 0.45;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .highlights-bullet-active {
          background: #e74a00;
          opacity: 1;
          width: 28px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
}
