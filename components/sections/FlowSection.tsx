import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { AnimatedSectionHeading } from "@/components/ui/AnimatedSectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type FlowStep = {
  _id: string;
  stepNumber?: number;
  title?: string;
  description?: string;
  icon?: any;
};

type SectionHeading = { en: string; ja: string };

export function FlowSection({ data, heading }: { data: FlowStep[] | null; heading: SectionHeading }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="flow" className="section-padding bg-cream-50">
      <div className="container-site">
        <AnimatedSectionHeading
          title={heading.en}
          titleJa={heading.ja}
          subtitle="お問い合わせから当日まで、安心のサポート"
        />

        {/* Desktop: horizontal editorial strip */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-0">
          {data.map((step, i) => (
            <ScrollReveal key={step._id} delay={i * 0.12}>
              <div className="relative px-6 py-8">
                <span className="text-4xl md:text-5xl font-serif text-terra leading-none">
                  {String(step.stepNumber || i + 1).padStart(2, "0")}
                </span>

                {i < data.length - 1 && (
                  <div className="absolute top-12 right-0 w-full h-[1px] border-t border-dashed border-terra/40 -z-10" />
                )}

                {step.icon ? (
                  <div className="w-10 h-10 mt-4 mb-3">
                    <Image
                      src={urlFor(step.icon).width(48).url()}
                      alt={step.title || ""}
                      width={40}
                      height={40}
                    />
                  </div>
                ) : null}
                {step.title ? (
                  <h3 className="text-base font-serif font-medium text-dark mb-2 mt-4">
                    {step.title}
                  </h3>
                ) : null}
                {step.description ? (
                  <p className="text-sm text-dark-muted leading-relaxed">
                    {step.description}
                  </p>
                ) : null}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile/Tablet: vertical timeline */}
        <div className="lg:hidden space-y-0">
          {data.map((step, i) => (
            <ScrollReveal key={step._id} delay={i * 0.1} variant="editorialSlide">
              <div className="flex gap-6 py-6 border-t border-terra/20">
                <div className="flex-shrink-0 w-16">
                  <span className="text-4xl font-serif text-terra leading-none">
                    {String(step.stepNumber || i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  {step.icon ? (
                    <div className="w-8 h-8 mb-2">
                      <Image
                        src={urlFor(step.icon).width(48).url()}
                        alt={step.title || ""}
                        width={32}
                        height={32}
                      />
                    </div>
                  ) : null}
                  {step.title ? (
                    <h3 className="text-base font-serif font-medium text-dark mb-2">
                      {step.title}
                    </h3>
                  ) : null}
                  {step.description ? (
                    <p className="text-sm text-dark-muted leading-relaxed">
                      {step.description}
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
