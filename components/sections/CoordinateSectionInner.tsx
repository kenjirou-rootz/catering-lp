"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { AnimatedSectionHeading } from "@/components/ui/AnimatedSectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

type CoordinateItem = {
  _id: string;
  slug?: string;
  description?: string;
  photos?: any[];
};

const COORDINATE_TITLES: Record<string, string> = {
  elegant: "エレガントコーディネート",
  casual: "カジュアルコーディネート",
  "wa-modern": "和モダンコーディネート",
};

function getTitle(slug?: string): string {
  if (!slug) return "コーディネート";
  return COORDINATE_TITLES[slug] || `${slug}コーディネート`;
}

function CoordinateCard({ item }: { item: CoordinateItem }) {
  const title = getTitle(item.slug);
  const hasMultiplePhotos = item.photos && item.photos.length > 1;

  return (
    <div className="coordinate-card group relative overflow-hidden aspect-[3/4] cursor-pointer">
      {item.photos && item.photos.length > 0 ? (
        hasMultiplePhotos ? (
          <Swiper
            modules={[Autoplay, EffectFade]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={1200}
            loop={true}
            className="h-full"
          >
            {item.photos.map((photo: any, pi: number) => (
              <SwiperSlide key={pi}>
                <div className="relative w-full h-full">
                  <Image
                    src={urlFor(photo).width(600).quality(80).url()}
                    alt={`${title} ${pi + 1}`}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-[1.05] group-hover:brightness-110"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Image
            src={urlFor(item.photos[0]).width(600).quality(80).url()}
            alt={title}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-[1.05] group-hover:brightness-110"
          />
        )
      ) : (
        <div className="w-full h-full bg-cream-200" />
      )}

      {/* Gradient: light default, deeper on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Text overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
        <div className="h-[1px] bg-terra mb-3 transition-all duration-500 ease-out w-8 group-hover:w-16" />
        <h3 className="text-xl md:text-2xl font-serif font-medium text-white tracking-wider mb-2">
          {title}
        </h3>
        {item.description ? (
          <p className="text-sm text-white/80 leading-relaxed max-w-xs opacity-0 translate-y-2.5 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0">
            {item.description}
          </p>
        ) : null}
      </div>
    </div>
  );
}

type SectionHeading = { en: string; ja: string };

export function CoordinateSectionInner({
  data,
  heading,
}: {
  data: CoordinateItem[] | null;
  heading: SectionHeading;
}) {
  if (!data || data.length === 0) return null;

  return (
    <section id="coordinate" className="section-padding bg-white overflow-hidden">
      <div className="container-site">
        <AnimatedSectionHeading
          title={heading.en}
          titleJa={heading.ja}
          subtitle="空間を彩る、こだわりのコーディネート"
        />

        {/* Desktop: grid */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {data.map((item, i) => (
            <ScrollReveal key={item._id} delay={i * 0.1}>
              <CoordinateCard item={item} />
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Mobile: swiper carousel */}
      <div className="md:hidden">
        <ScrollReveal>
          <Swiper
            modules={[Pagination, A11y]}
            pagination={{
              clickable: true,
              bulletClass: "coord-bullet",
              bulletActiveClass: "coord-bullet-active",
            }}
            a11y={{
              prevSlideMessage: "前のコーディネート",
              nextSlideMessage: "次のコーディネート",
            }}
            slidesPerView={1.15}
            centeredSlides
            spaceBetween={12}
            className="coordinate-swiper !overflow-visible !pb-10"
          >
            {data.map((item) => (
              <SwiperSlide key={item._id} className="!h-auto">
                <CoordinateCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </ScrollReveal>
      </div>

      <style jsx global>{`
        .coordinate-swiper .swiper-slide {
          opacity: 0.5;
          transition: opacity 0.4s ease, transform 0.4s ease;
          transform: scale(0.95);
        }
        .coordinate-swiper .swiper-slide-active {
          opacity: 1;
          transform: scale(1);
        }
        .coord-bullet {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background: var(--color-dark-subtle, #c4b5a3);
          opacity: 0.4;
          margin: 0 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .coord-bullet-active {
          opacity: 1;
          width: 20px;
          background: var(--color-terra, #a0522d);
        }
      `}</style>
    </section>
  );
}
