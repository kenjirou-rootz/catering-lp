import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Card } from "@/components/ui/Card";

type PricingPlan = {
  _id: string;
  category?: string;
  planName?: string;
  thumbnail?: any;
  overview?: string;
  includes?: string[];
  notes?: string;
};

function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <Card className="h-full flex flex-col">
      {plan.thumbnail && (
        <div className="relative aspect-[3/2]">
          <Image
            src={urlFor(plan.thumbnail).width(600).quality(80).url()}
            alt={plan.planName || "プラン"}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6 flex-1 flex flex-col">
        {plan.planName && (
          <h3 className="text-xl font-serif font-medium text-brand-dark mb-2">
            {plan.planName}
          </h3>
        )}
        {plan.overview && (
          <p className="text-sm text-brand-muted mb-4 leading-relaxed">
            {plan.overview}
          </p>
        )}
        {plan.includes && plan.includes.length > 0 && (
          <ul className="space-y-2 mb-4 flex-1">
            {plan.includes.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-brand-dark">
                <span className="text-brand-orange mt-0.5 flex-shrink-0">●</span>
                {item}
              </li>
            ))}
          </ul>
        )}
        {plan.notes && (
          <p className="text-xs text-brand-muted pt-4 border-t border-beige-200 leading-relaxed">
            {plan.notes}
          </p>
        )}
      </div>
    </Card>
  );
}

export function PricingSection({ data }: { data: PricingPlan[] | null }) {
  if (!data || data.length === 0) return null;

  const basicPlans = data.filter((p) => p.category === "basic");
  const foodPlans = data.filter((p) => p.category === "food");
  const drinkPlans = data.filter((p) => p.category === "drink");

  return (
    <section id="pricing" className="section-padding bg-beige-50">
      <div className="container-site">
        <ScrollReveal>
          <SectionHeading title="料金プラン" subtitle="お客様のご要望に合わせた柔軟なプランをご用意しています" />
        </ScrollReveal>

        {basicPlans.length > 0 && (
          <ScrollReveal delay={0.1}>
            <div className="mb-16">
              <h3 className="text-2xl font-serif font-medium text-brand-dark text-center mb-8">基本料金</h3>
              <div className="max-w-md mx-auto">
                {basicPlans.map((plan) => (
                  <PricingCard key={plan._id} plan={plan} />
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {foodPlans.length > 0 && (
          <ScrollReveal delay={0.15}>
            <div className="mb-16">
              <h3 className="text-2xl font-serif font-medium text-brand-dark text-center mb-8">フードプラン</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {foodPlans.map((plan) => (
                  <PricingCard key={plan._id} plan={plan} />
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {drinkPlans.length > 0 && (
          <ScrollReveal delay={0.2}>
            <div>
              <h3 className="text-2xl font-serif font-medium text-brand-dark text-center mb-8">ドリンクプラン</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {drinkPlans.map((plan) => (
                  <PricingCard key={plan._id} plan={plan} />
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
