"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { AnimatedSectionHeading } from "@/components/ui/AnimatedSectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

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

export function CoordinateSectionInner({ data }: { data: CoordinateItem[] | null }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="coordinate" className="section-padding bg-white">
      <div className="container-site">
        <AnimatedSectionHeading
          title="テーブルコーディネート"
          subtitle="空間を彩る、こだわりのコーディネート"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {data.map((item, i) => (
            <ScrollReveal key={item._id} delay={i * 0.1}>
              <div className="relative rounded-lg overflow-hidden aspect-[3/4]">
                {item.photos && item.photos.length > 0 ? (
                  item.photos.length === 1 ? (
                    <Image
                      src={urlFor(item.photos[0]).width(600).quality(80).url()}
                      alt={getTitle(item.slug)}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Swiper
                      modules={[Autoplay]}
                      autoplay={{ delay: 3500, disableOnInteraction: false }}
                      loop={true}
                      className="h-full"
                    >
                      {item.photos.map((photo: any, pi: number) => (
                        <SwiperSlide key={pi}>
                          <div className="relative w-full h-full">
                            <Image
                              src={urlFor(photo).width(600).quality(80).url()}
                              alt={`${getTitle(item.slug)} ${pi + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  )
                ) : (
                  <div className="w-full h-full bg-beige-200" />
                )}
                {/* Black multiply overlay */}
                <div className="absolute inset-0 bg-black/50 z-10" />
                {/* Centered title + description */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
                  <h3 className="text-xl md:text-2xl font-serif font-medium text-white mb-3">
                    {getTitle(item.slug)}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-white/80 leading-relaxed max-w-xs">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
