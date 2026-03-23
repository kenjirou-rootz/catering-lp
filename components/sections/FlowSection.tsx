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

export function FlowSection({ data }: { data: FlowStep[] | null }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="flow" className="section-padding bg-white">
      <div className="container-site">
        <AnimatedSectionHeading
          title="ご利用の流れ"
          subtitle="お問い合わせから当日まで、安心のサポート"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.map((step, i) => (
            <ScrollReveal key={step._id} delay={i * 0.1}>
              <div className="relative text-center">
                {/* Step number */}
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-brand-orange text-white flex items-center justify-center text-lg font-bold">
                  {step.stepNumber || i + 1}
                </div>
                {/* Connecting line (hidden on mobile, shown lg+) */}
                {i < data.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[calc(50%+28px)] w-[calc(100%-56px)] h-[2px] bg-beige-200" />
                )}
                {/* Icon */}
                {step.icon && (
                  <div className="w-12 h-12 mx-auto mb-3">
                    <Image
                      src={urlFor(step.icon).width(48).url()}
                      alt={step.title || ""}
                      width={48}
                      height={48}
                    />
                  </div>
                )}
                {step.title && (
                  <h3 className="text-base font-serif font-medium text-brand-dark mb-2">
                    {step.title}
                  </h3>
                )}
                {step.description && (
                  <p className="text-sm text-brand-muted leading-relaxed">
                    {step.description}
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
