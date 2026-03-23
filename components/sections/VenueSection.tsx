import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type VenueData = {
  description?: string;
  photos?: any[];
} | null;

export function VenueSection({ data }: { data: VenueData }) {
  if (!data) return null;

  return (
    <section className="section-padding bg-beige-50">
      <div className="container-site">
        <ScrollReveal>
          <SectionHeading
            title="レンタル会場"
            subtitle="会場の手配もお任せください"
          />
        </ScrollReveal>
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
                <div
                  key={i}
                  className="relative aspect-[16/10] rounded-lg overflow-hidden"
                >
                  <Image
                    src={urlFor(photo).width(800).quality(80).url()}
                    alt={`レンタル会場 ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
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
