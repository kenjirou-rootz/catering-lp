"use client";

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
} | null;

export function CatchCarouselSectionInner({ data, headingEn }: { data: CatchCarouselData; headingEn: string }) {
  if (!data) return null;

  return (
    <section className="section-padding bg-cream-200">
      <div className="container-site text-center mb-12">
        <ScrollReveal>
          <div className="w-20 h-[1px] bg-terra mx-auto mb-8" />
        </ScrollReveal>
        <TextReveal as="h2" className="text-5xl md:text-7xl lg:text-8xl font-serif font-light text-terra leading-editorial tracking-heading">
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
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={urlFor(img).width(800).quality(80).url()}
                    alt={`ケータリングの様子 ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : null}
    </section>
  );
}
