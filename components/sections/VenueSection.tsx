import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { AnimatedSectionHeading } from "@/components/ui/AnimatedSectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

type VenueData = {
  description?: string;
  photos?: any[];
} | null;

export function VenueSection({ data }: { data: VenueData }) {
  if (!data) return null;

  return (
    <section className="section-padding bg-beige-50">
      <div className="container-site">
        <AnimatedSectionHeading
          title="レンタル会場"
          subtitle="会場の手配もお任せください"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal delay={0.1}>
            {data.description && (
              <p className="text-base md:text-lg leading-relaxed text-brand-dark whitespace-pre-line">
                {data.description}
              </p>
            )}
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-1 gap-4">
              {data.photos?.map((photo: any, i: number) => (
                <ParallaxImage
                  key={i}
                  className="relative aspect-[16/10] rounded-lg"
                >
                  <Image
                    src={urlFor(photo).width(800).quality(80).url()}
                    alt={`レンタル会場 ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </ParallaxImage>
              ))}
              {(!data.photos || data.photos.length === 0) && (
                <div className="aspect-[16/10] rounded-lg bg-beige-200 flex items-center justify-center text-brand-muted">
                  会場写真準備中
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
