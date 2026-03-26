"use client";

import { useState, useEffect, useCallback, memo } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { AnimatedSectionHeading } from "@/components/ui/AnimatedSectionHeading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

type TestimonialItem = {
  _id: string;
  reviewText?: string;
  personPhoto?: any;
  eventPhoto?: any;
  name?: string;
  company?: string;
};

const FadeImage = memo(function FadeImage({
  personPhoto,
  eventPhoto,
  name,
}: {
  personPhoto?: any;
  eventPhoto?: any;
  name?: string;
}) {
  const [showEvent, setShowEvent] = useState(false);

  const toggle = useCallback(() => {
    setShowEvent((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!personPhoto || !eventPhoto) return;
    const interval = setInterval(toggle, 4000);
    return () => clearInterval(interval);
  }, [personPhoto, eventPhoto, toggle]);

  return (
    <div className="relative aspect-square overflow-hidden bg-cream-200">
      {personPhoto ? (
        <Image
          src={urlFor(personPhoto).width(800).quality(80).url()}
          alt={name || "利用者"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-opacity duration-700 ${
            showEvent ? "opacity-0" : "opacity-100"
          }`}
        />
      ) : null}
      {eventPhoto ? (
        <Image
          src={urlFor(eventPhoto).width(800).quality(80).url()}
          alt="会場の様子"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-opacity duration-700 ${
            showEvent ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : null}
    </div>
  );
});

type SectionHeading = { en: string; ja: string };

export function TestimonialsSectionInner({
  data,
  heading,
}: {
  data: TestimonialItem[] | null;
  heading: SectionHeading;
}) {
  if (!data || data.length === 0) return null;

  return (
    <section id="testimonials" className="section-padding bg-cream-100">
      <div className="container-site">
        <AnimatedSectionHeading
          title={heading.en}
          titleJa={heading.ja}
          subtitle="実際にご利用いただいたお客様からの声をご紹介します"
        />
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {data.map((item) => (
            <SwiperSlide key={item._id}>
              <div className="pb-12">
                <FadeImage
                  personPhoto={item.personPhoto}
                  eventPhoto={item.eventPhoto}
                  name={item.name}
                />
                <div className="mt-5 relative">
                  <span className="absolute -top-8 -left-1 text-[80px] font-serif text-terra/10 leading-none pointer-events-none select-none">
                    &ldquo;
                  </span>
                  {item.reviewText ? (
                    <p className="text-base md:text-lg font-serif text-dark leading-reading mb-4 line-clamp-5 relative z-10">
                      {item.reviewText}
                    </p>
                  ) : null}
                  <div className="flex items-center gap-2">
                    {item.name ? (
                      <span className="text-xs tracking-wider uppercase font-medium text-dark">
                        {item.name}
                      </span>
                    ) : null}
                    {item.company ? (
                      <span className="text-xs tracking-wider text-dark-subtle">
                        / {item.company}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
