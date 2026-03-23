import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

type PortfolioItem = {
  _id: string;
  title?: string;
  description?: string;
  images?: any[];
  ctaText?: string;
};

export function PortfolioSection({ data }: { data: PortfolioItem[] | null }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="portfolio" className="section-padding bg-white">
      <div className="container-site">
        <ScrollReveal>
          <SectionHeading title="実績レポート" subtitle="これまでにお手伝いしたケータリングの一部をご紹介します" />
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {data.map((item, i) => (
            <ScrollReveal key={item._id} delay={i * 0.1}>
              <Card className="h-full flex flex-col">
                <div className="relative aspect-[4/3]">
                  {item.images && item.images[0] ? (
                    <Image
                      src={urlFor(item.images[0]).width(600).quality(80).url()}
                      alt={item.title || "実績写真"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-beige-100" />
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  {item.title && (
                    <h3 className="text-lg font-serif font-medium text-brand-dark mb-2">
                      {item.title}
                    </h3>
                  )}
                  {item.description && (
                    <p className="text-sm text-brand-muted leading-relaxed flex-1">
                      {item.description}
                    </p>
                  )}
                  {item.ctaText && (
                    <div className="mt-4">
                      <Button href="#contact" variant="outline" className="w-full text-xs py-3">
                        {item.ctaText}
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
