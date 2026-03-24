import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { AnimatedSectionHeading } from "@/components/ui/AnimatedSectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type FeatureItem = {
  _id: string;
  title?: string;
  description?: string;
  icon?: any;
};

type SectionHeading = { en: string; ja: string };

export function FeaturesSection({ data, heading }: { data: FeatureItem[] | null; heading: SectionHeading }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="features" className="section-padding bg-white">
      <div className="container-site">
        <AnimatedSectionHeading title={heading.en} titleJa={heading.ja} subtitle="ケータリングに対する不安を解消する6つのポイント" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {data.map((item, i) => (
            <ScrollReveal key={item._id} delay={i * 0.08} variant="editorialSlide">
              <div className="flex items-start gap-6 border-t border-terra/20 py-8 px-4">
                <div className="flex-shrink-0 w-20">
                  {item.icon ? (
                    <Image
                      src={urlFor(item.icon).width(64).url()}
                      alt={item.title || ""}
                      width={64}
                      height={64}
                    />
                  ) : (
                    <span className="text-5xl font-serif text-terra/30 leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                </div>
                <div>
                  {item.title ? (
                    <h3 className="text-lg font-serif font-medium text-dark mb-2">
                      {item.title}
                    </h3>
                  ) : null}
                  {item.description ? (
                    <p className="text-sm text-dark-muted leading-relaxed">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
