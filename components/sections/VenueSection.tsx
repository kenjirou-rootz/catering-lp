import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { AnimatedSectionHeading } from "@/components/ui/AnimatedSectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

type VenueData = {
  description?: string;
  photos?: any[];
} | null;

type SectionHeading = { en: string; ja: string };

export function VenueSection({ data, heading }: { data: VenueData; heading: SectionHeading }) {
  if (!data) return null;

  const mainPhoto = data.photos?.[0];
  const additionalPhotos = data.photos?.slice(1) || [];

  return (
    <section className="section-padding bg-cream-200 overflow-hidden">
      <div className="container-site">
        <AnimatedSectionHeading
          title={heading.en}
          titleJa={heading.ja}
          subtitle="会場の手配もお任せください"
        />

        {mainPhoto ? (
          <ScrollReveal delay={0.1} variant="imageReveal">
            <ParallaxImage className="relative aspect-[16/9] w-full mb-0">
              <Image
                src={urlFor(mainPhoto).width(1280).quality(85).url()}
                alt="レンタル会場"
                fill
                className="object-cover"
              />
            </ParallaxImage>
          </ScrollReveal>
        ) : null}

        <ScrollReveal delay={0.2} variant="editorialSlide">
          <div className="bg-cream-50 relative z-10 -mt-16 mx-4 md:mx-12 lg:mx-24 p-8 md:p-12 shadow-sm">
            {data.description ? (
              <p className="text-base md:text-lg leading-reading text-dark whitespace-pre-line">
                {data.description}
              </p>
            ) : null}
          </div>
        </ScrollReveal>

        {additionalPhotos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {additionalPhotos.map((photo: any, i: number) => (
              <ScrollReveal key={i} delay={0.3 + i * 0.1} variant="imageReveal">
                <ParallaxImage className="relative aspect-[16/10]">
                  <Image
                    src={urlFor(photo).width(800).quality(80).url()}
                    alt={`レンタル会場 ${i + 2}`}
                    fill
                    className="object-cover"
                  />
                </ParallaxImage>
              </ScrollReveal>
            ))}
          </div>
        ) : null}

        {(!data.photos || data.photos.length === 0) ? (
          <div className="aspect-[16/10] bg-cream-300 flex items-center justify-center text-dark-muted">
            会場写真準備中
          </div>
        ) : null}
      </div>
    </section>
  );
}
