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

export function FeaturesSection({ data }: { data: FeatureItem[] | null }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="features" className="section-padding bg-white">
      <div className="container-site">
        <AnimatedSectionHeading title="弊社の特長" subtitle="ケータリングに対する不安を解消する6つのポイント" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {data.map((item, i) => (
            <ScrollReveal key={item._id} delay={i * 0.08}>
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center">
                  {item.icon ? (
                    <Image
                      src={urlFor(item.icon).width(64).url()}
                      alt={item.title || ""}
                      width={64}
                      height={64}
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-beige-100 flex items-center justify-center text-brand-orange text-2xl font-bold">
                      {i + 1}
                    </div>
                  )}
                </div>
                {item.title && (
                  <h3 className="text-lg font-serif font-medium text-brand-dark mb-3">
                    {item.title}
                  </h3>
                )}
                {item.description && (
                  <p className="text-sm text-brand-muted leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
