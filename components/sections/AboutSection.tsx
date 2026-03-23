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

export function AboutSection({ data }: { data: AboutData }) {
  return (
    <section id="about" className="section-padding bg-beige-100">
      <div className="container-site">
        <AnimatedSectionHeading title="Kitaoとは？" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <ScrollReveal delay={0.1}>
            <div className="space-y-6">
              {data?.salesText && (
                <p className="text-base md:text-lg leading-relaxed text-brand-dark whitespace-pre-line">
                  {data.salesText}
                </p>
              )}
              {data?.careerText && (
                <div className="pt-4 border-t border-beige-200">
                  <h3 className="text-lg font-serif font-medium text-brand-dark mb-3">経歴</h3>
                  <p className="text-sm md:text-base leading-relaxed text-brand-muted whitespace-pre-line">
                    {data.careerText}
                  </p>
                </div>
              )}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <ParallaxImage className="relative aspect-[4/3] rounded-lg">
              {data?.images && data.images[0] ? (
                <Image
                  src={urlFor(data.images[0]).width(800).quality(80).url()}
                  alt="Kitaoについて"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-beige-200 flex items-center justify-center text-brand-muted">
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
