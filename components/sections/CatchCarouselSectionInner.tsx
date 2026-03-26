"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { TextReveal } from "@/components/ui/TextReveal";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

type CatchCarouselData = {
  catchCopy?: string;
  description?: string;
  carouselImages?: any[];
  carouselVideoUrls?: (string | null)[];
} | null;

function CarouselSlide({
  img,
  videoUrl,
  index,
}: {
  img: any;
  videoUrl?: string | null;
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const handleLeave = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  return (
    <div
      className="relative aspect-[16/9] overflow-hidden group cursor-pointer"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onTouchStart={handleEnter}
      onTouchEnd={handleLeave}
    >
      {/* Thumbnail image — always rendered */}
      <Image
        src={urlFor(img).width(1400).quality(80).url()}
        alt={`ケータリングの様子 ${index + 1}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
        className="object-cover transition-opacity duration-500"
        style={{ opacity: 1 }}
      />

      {/* Video overlay — preloaded, plays on hover/tap */}
      {videoUrl ? (
        <>
          <video
            ref={videoRef}
            src={videoUrl}
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
          {/* Play icon hint */}
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-0 transition-opacity duration-300">
              <svg
                className="w-5 h-5 text-white ml-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          {/* Small video badge */}
          <div className="absolute top-3 right-3 z-10 px-2 py-1 bg-black/40 backdrop-blur-sm rounded text-[10px] text-white/70 font-medium tracking-wider uppercase opacity-70 group-hover:opacity-0 transition-opacity duration-300">
            Video
          </div>
        </>
      ) : null}
    </div>
  );
}

export function CatchCarouselSectionInner({
  data,
  headingEn,
}: {
  data: CatchCarouselData;
  headingEn: string;
}) {
  if (!data) return null;

  const videoUrls = data.carouselVideoUrls || [];

  return (
    <section className="section-padding bg-cream-200 overflow-hidden">
      <div className="container-site text-center mb-12">
        <ScrollReveal>
          <div className="w-20 h-[1px] bg-terra mx-auto mb-8" />
        </ScrollReveal>
        <TextReveal
          as="h2"
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-light text-terra leading-editorial tracking-heading"
        >
          {headingEn}
        </TextReveal>
        {data.catchCopy ? (
          <ScrollReveal delay={0.2}>
            <div className="w-8 h-[1px] bg-dark-subtle/40 mt-5 mb-4 mx-auto" />
            <p className="text-sm md:text-base font-serif-ja text-dark-muted leading-relaxed">
              {data.catchCopy}
            </p>
          </ScrollReveal>
        ) : null}
        {data.description ? (
          <ScrollReveal delay={0.3}>
            <p className="mt-4 subtitle-editorial max-w-2xl mx-auto leading-relaxed">
              {data.description}
            </p>
          </ScrollReveal>
        ) : null}
      </div>
      {data.carouselImages && data.carouselImages.length > 0 ? (
        <div className="w-full overflow-hidden">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            slidesPerView={1}
            spaceBetween={16}
            breakpoints={{
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="!overflow-visible"
          >
            {data.carouselImages.map((img: any, i: number) => (
              <SwiperSlide key={i}>
                <CarouselSlide
                  img={img}
                  videoUrl={videoUrls[i] || null}
                  index={i}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : null}
    </section>
  );
}
