"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { AnimatedSectionHeading } from "@/components/ui/AnimatedSectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { InfiniteTicker } from "@/components/ui/InfiniteTicker";
import { TICKER } from "@/lib/animation";

type PortfolioItem = {
  _id: string;
  title?: string;
  description?: string;
  images?: any[];
  ctaText?: string;
};

type SectionHeading = { en: string; ja: string };

function PortfolioCard({ item }: { item: PortfolioItem }) {
  const card = (
    <div className="group relative overflow-hidden rounded-lg w-[280px] h-[300px] md:w-[320px] md:h-[350px] lg:w-[360px] lg:h-[400px]">
      <div className="relative w-full h-full">
        {item.images && item.images[0] ? (
          <Image
            src={urlFor(item.images[0]).width(600).quality(80).url()}
            alt={item.title || "実績写真"}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="w-full h-full bg-cream-100" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        {item.title ? (
          <h3 className="text-lg font-serif font-medium text-white mb-2">
            {item.title}
          </h3>
        ) : null}
        {item.description ? (
          <p className="text-sm text-white/80 leading-relaxed line-clamp-2 mb-3">
            {item.description}
          </p>
        ) : null}
        {item.ctaText ? (
          <span className="inline-block text-xs tracking-wider uppercase text-terra-light border-b border-terra-light/50 pb-0.5 group-hover:border-white transition-colors">
            {item.ctaText}
          </span>
        ) : null}
      </div>
    </div>
  );

  if (item.ctaText) {
    return (
      <a href="#contact" className="block cursor-pointer">
        {card}
      </a>
    );
  }

  return card;
}

export function PortfolioSectionInner({
  data,
  heading,
}: {
  data: PortfolioItem[];
  heading: SectionHeading;
}) {
  return (
    <section id="portfolio" className="section-padding bg-cream-50">
      <div className="container-site">
        <AnimatedSectionHeading
          title={heading.en}
          titleJa={heading.ja}
          subtitle="これまでにお手伝いしたケータリングの一部をご紹介します"
        />
      </div>
      <ScrollReveal variant="fadeUp">
        <InfiniteTicker speed={TICKER.SPEED} gap={TICKER.GAP} pauseOnHover>
          {data.map((item) => (
            <PortfolioCard key={item._id} item={item} />
          ))}
        </InfiniteTicker>
      </ScrollReveal>
    </section>
  );
}
