"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { AnimatedSectionHeading } from "@/components/ui/AnimatedSectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { memo } from "react";
import { Card } from "@/components/ui/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

type PricingPlan = {
  _id: string;
  category?: string;
  planName?: string;
  thumbnail?: any;
  overview?: string;
  includes?: string[];
  notes?: string;
};

type SectionHeading = { en: string; ja: string };

const PricingCard = memo(function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <Card className="h-full flex flex-col">
      {plan.thumbnail ? (
        <div className="relative aspect-[3/2]">
          <Image
            src={urlFor(plan.thumbnail).width(600).quality(80).url()}
            alt={plan.planName || "プラン"}
            fill
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="p-6 flex-1 flex flex-col">
        {plan.planName ? (
          <h3 className="text-xl font-serif font-medium text-dark mb-2">
            {plan.planName}
          </h3>
        ) : null}
        {plan.overview ? (
          <p className="text-sm text-dark-muted mb-4 leading-relaxed">
            {plan.overview}
          </p>
        ) : null}
        {plan.includes && plan.includes.length > 0 ? (
          <ul className="space-y-2 mb-4 flex-1">
            {plan.includes.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-dark">
                <span className="w-4 h-[1px] bg-terra mt-2.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        ) : null}
        {plan.notes ? (
          <div className="bg-cream-100 -mx-6 -mb-6 px-6 py-4 mt-4">
            <p className="text-xs text-dark-muted leading-relaxed">
              {plan.notes}
            </p>
          </div>
        ) : null}
      </div>
    </Card>
  );
});

function PlanCarouselOrGrid({
  plans,
  label,
}: {
  plans: PricingPlan[];
  label: string;
}) {
  return (
    <>
      {/* Desktop: grid */}
      <div className="hidden lg:grid grid-cols-3 gap-8">
        {plans.map((plan) => (
          <PricingCard key={plan._id} plan={plan} />
        ))}
      </div>

      {/* Mobile/Tablet: swiper */}
      <div className="lg:hidden">
        <Swiper
          modules={[Pagination, A11y]}
          pagination={{
            clickable: true,
            bulletClass: "pricing-bullet",
            bulletActiveClass: "pricing-bullet-active",
          }}
          a11y={{ prevSlideMessage: `前の${label}`, nextSlideMessage: `次の${label}` }}
          slidesPerView={1.15}
          centeredSlides
          spaceBetween={16}
          breakpoints={{
            640: { slidesPerView: 1.8, spaceBetween: 20 },
            768: { slidesPerView: 2.2, spaceBetween: 24 },
          }}
          className="pricing-swiper !overflow-visible !pb-10"
        >
          {plans.map((plan) => (
            <SwiperSlide key={plan._id} className="!h-auto">
              <div className="h-full transition-transform duration-300">
                <PricingCard plan={plan} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export function PricingSectionInner({
  data,
  heading,
}: {
  data: PricingPlan[];
  heading: SectionHeading;
}) {
  const basicPlans = data.filter((p) => p.category === "basic");
  const foodPlans = data.filter((p) => p.category === "food");
  const drinkPlans = data.filter((p) => p.category === "drink");

  return (
    <section id="pricing" className="section-padding bg-cream-200 overflow-hidden">
      <div className="container-site">
        <AnimatedSectionHeading
          title={heading.en}
          titleJa={heading.ja}
          subtitle="お客様のご要望に合わせた柔軟なプランをご用意しています"
        />

        {basicPlans.length > 0 ? (
          <ScrollReveal delay={0.1}>
            <div className="mb-16">
              <h3 className="text-2xl md:text-4xl font-serif font-medium text-dark text-center mb-2">
                基本料金
              </h3>
              <div className="w-12 h-[1px] bg-terra mx-auto mb-8" />
              <div className="max-w-md mx-auto">
                {basicPlans.map((plan) => (
                  <PricingCard key={plan._id} plan={plan} />
                ))}
              </div>
            </div>
          </ScrollReveal>
        ) : null}

        {foodPlans.length > 0 ? (
          <ScrollReveal delay={0.15}>
            <div className="mb-16">
              <h3 className="text-2xl md:text-4xl font-serif font-medium text-dark text-center mb-2">
                フードプラン
              </h3>
              <div className="w-12 h-[1px] bg-terra mx-auto mb-8" />
            </div>
          </ScrollReveal>
        ) : null}
      </div>

      {foodPlans.length > 0 ? (
        <ScrollReveal delay={0.15}>
          <div className="container-site lg:px-0 mb-16">
            <PlanCarouselOrGrid plans={foodPlans} label="フードプラン" />
          </div>
        </ScrollReveal>
      ) : null}

      <div className="container-site">
        {drinkPlans.length > 0 ? (
          <ScrollReveal delay={0.2}>
            <div>
              <h3 className="text-2xl md:text-4xl font-serif font-medium text-dark text-center mb-2">
                ドリンクプラン
              </h3>
              <div className="w-12 h-[1px] bg-terra mx-auto mb-8" />
            </div>
          </ScrollReveal>
        ) : null}
      </div>

      {drinkPlans.length > 0 ? (
        <ScrollReveal delay={0.2}>
          <div className="container-site lg:px-0">
            <PlanCarouselOrGrid plans={drinkPlans} label="ドリンクプラン" />
          </div>
        </ScrollReveal>
      ) : null}

      <style jsx global>{`
        .pricing-swiper .swiper-slide {
          opacity: 0.5;
          transition: opacity 0.4s ease, transform 0.4s ease;
          transform: scale(0.95);
        }
        .pricing-swiper .swiper-slide-active {
          opacity: 1;
          transform: scale(1);
        }
        .pricing-bullet {
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
        .pricing-bullet-active {
          opacity: 1;
          width: 20px;
          background: var(--color-terra, #a0522d);
        }
      `}</style>
    </section>
  );
}
