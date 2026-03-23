"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { TextReveal } from "@/components/ui/TextReveal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

type CatchCarouselData = {
  catchCopy?: string;
  description?: string;
  carouselImages?: any[];
} | null;

export function CatchCarouselSectionInner({ data }: { data: CatchCarouselData }) {
  if (!data) return null;

  return (
    <section className="section-padding bg-beige-50">
      <div className="container-site text-center mb-12">
        {data.catchCopy && (
          <TextReveal as="h2" className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-brand-dark tracking-tight">
            {data.catchCopy}
          </TextReveal>
        )}
        {data.description && (
          <p className="mt-4 text-base md:text-lg text-brand-muted font-light max-w-2xl mx-auto leading-relaxed">
            {data.description}
          </p>
        )}
      </div>
      {data.carouselImages && data.carouselImages.length > 0 && (
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
                <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
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
      )}
    </section>
  );
}
