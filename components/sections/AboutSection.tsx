"use client";

import Image from "next/image";
import { m, useReducedMotion } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";
import { AnimatedSectionHeading } from "@/components/ui/AnimatedSectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { EASE_EDITORIAL, DURATION } from "@/lib/animation";

type AboutData = {
  salesText?: string;
  careerText?: string;
  images?: any[];
  mediaType?: "image" | "video";
  videoUrl?: string;
  videoPoster?: any;
} | null;

type SectionHeading = { en: string; ja: string };

export function AboutSection({
  data,
  heading,
}: {
  data: AboutData;
  heading: SectionHeading;
}) {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: {
            duration: DURATION.SLOWER,
            ease: EASE_EDITORIAL,
            delay,
          },
        };

  return (
    <section id="about" className="section-padding bg-cream-100">
      <div className="container-site">
        {/* ── Centered heading (Project 8B style) ── */}
        <div className="mb-14 md:mb-20 text-center">
          <AnimatedSectionHeading
            title={heading.en}
            titleJa={heading.ja}
          />
        </div>

        {/* ── Two-column grid (Project 8B: image left, text right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-10 lg:gap-16">
          {/* Left: Media (4:5 portrait — image or video) */}
          <m.div {...fadeUp(0)} className="order-1">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-dark">
              {data?.mediaType === "video" && data.videoUrl ? (
                <video
                  src={data.videoUrl}
                  poster={
                    data.videoPoster
                      ? urlFor(data.videoPoster).width(900).quality(80).url()
                      : undefined
                  }
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : data?.images && data.images[0] ? (
                <Image
                  src={urlFor(data.images[0]).width(900).quality(80).url()}
                  alt="Kitaoについて"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full bg-cream-200 flex items-center justify-center text-dark-muted">
                  画像準備中
                </div>
              )}
            </div>
          </m.div>

          {/* Right: Text content */}
          <div className="order-2 space-y-8 lg:py-8">
            {/* Category + year row (Project 8B metadata style) */}
            <m.div
              {...fadeUp(0.1)}
              className="flex items-baseline justify-between border-b border-dark/10 pb-4"
            >
              <h3 className="text-lg font-serif font-medium text-dark tracking-wide">
                French Chef
              </h3>
              <span className="text-2xl text-dark-muted font-serif font-light tabular-nums">
                Kitao
              </span>
            </m.div>

            {/* Sales text (main description) */}
            {data?.salesText ? (
              <m.div {...fadeUp(0.2)} className="space-y-6">
                <p className="text-lg md:text-xl lg:text-2xl font-serif font-light text-dark leading-[1.8] whitespace-pre-line">
                  {data.salesText}
                </p>
              </m.div>
            ) : null}

            {/* Career section (maps to Project 8B credits) */}
            {data?.careerText ? (
              <m.div {...fadeUp(0.3)} className="space-y-3 pt-4">
                <h4 className="text-sm font-serif-ja font-medium text-dark tracking-widest uppercase">
                  経歴
                </h4>
                <div className="border-l-2 border-terra/40 pl-5">
                  <p className="text-sm md:text-base leading-[1.85] text-dark-muted whitespace-pre-line font-serif-ja">
                    {data.careerText}
                  </p>
                </div>
              </m.div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
