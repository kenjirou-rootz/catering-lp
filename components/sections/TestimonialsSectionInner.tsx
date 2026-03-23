"use client";

import { useState, useEffect, useCallback } from "react";
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

// FadeImage defined at MODULE LEVEL (not inside component)
function FadeImage({
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
    <div className="relative aspect-square rounded-lg overflow-hidden bg-beige-200">
      {personPhoto && (
        <Image
          src={urlFor(personPhoto).width(400).quality(80).url()}
          alt={name || "利用者"}
          fill
          className={`object-cover transition-opacity duration-700 ${
            showEvent ? "opacity-0" : "opacity-100"
          }`}
        />
      )}
      {eventPhoto && (
        <Image
          src={urlFor(eventPhoto).width(400).quality(80).url()}
          alt="会場の様子"
          fill
          className={`object-cover transition-opacity duration-700 ${
            showEvent ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}

export function TestimonialsSectionInner({
  data,
}: {
  data: TestimonialItem[] | null;
}) {
  if (!data || data.length === 0) return null;

  return (
    <section id="testimonials" className="section-padding bg-beige-100">
      <div className="container-site">
        <AnimatedSectionHeading
          title="お客様の声"
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
                <div className="mt-5">
                  {item.reviewText && (
                    <p className="text-sm text-brand-dark leading-relaxed mb-4 line-clamp-5">
                      「{item.reviewText}」
                    </p>
                  )}
                  <div className="flex items-center gap-2">
                    {item.name && (
                      <span className="text-sm font-medium text-brand-dark">
                        {item.name}
                      </span>
                    )}
                    {item.company && (
                      <span className="text-xs text-brand-muted">
                        / {item.company}
                      </span>
                    )}
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
