import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { AnimatedSectionHeading } from "@/components/ui/AnimatedSectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

type AboutData = {
  salesText?: string;
  careerText?: string;
  images?: any[];
} | null;

type SectionHeading = { en: string; ja: string };

export function AboutSection({ data, heading }: { data: AboutData; heading: SectionHeading }) {
  return (
    <section id="about" className="section-padding bg-cream-100">
      <div className="container-site">
        <AnimatedSectionHeading title={heading.en} titleJa={heading.ja} align="left" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* テキストエリア: 5/12 (≈ 黄金比 5:7) */}
          <ScrollReveal delay={0.1} variant="editorialSlide" className="lg:col-span-5 order-2 lg:order-1">
            <div className="space-y-6">
              {data?.salesText ? (
                <p className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium tracking-heading text-dark whitespace-pre-line" style={{ lineHeight: "1.7em" }}>
                  {data.salesText}
                </p>
              ) : null}
              {data?.careerText ? (
                <div className="border-l-2 border-terra pl-6">
                  <h3 className="text-lg font-serif font-medium text-dark mb-3">経歴</h3>
                  <p className="text-sm md:text-base leading-relaxed text-dark-muted whitespace-pre-line">
                    {data.careerText}
                  </p>
                </div>
              ) : null}
            </div>
          </ScrollReveal>
          {/* 画像エリア: 7/12 (≈ 黄金比 5:7) */}
          <ScrollReveal delay={0.2} className="lg:col-span-7 order-1 lg:order-2">
            <ParallaxImage className="relative aspect-video">
              {data?.images && data.images[0] ? (
                <Image
                  src={urlFor(data.images[0]).width(800).quality(80).url()}
                  alt="Kitaoについて"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-cream-200 flex items-center justify-center text-dark-muted">
                  画像準備中
                </div>
              )}
            </ParallaxImage>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
