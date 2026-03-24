"use client";

import dynamic from "next/dynamic";

const PricingSectionInner = dynamic(
  () =>
    import("./PricingSectionInner").then((mod) => ({
      default: mod.PricingSectionInner,
    })),
  { ssr: false }
);

type PricingPlan = {
  _id: string;
  category?: string;
  planName?: string;
  thumbnail?: any;
  overview?: string;
  includes?: string[];
  notes?: string;
};

type SectionHeading = { en: string; ja: string };

export function PricingSection({
  data,
  heading,
}: {
  data: PricingPlan[] | null;
  heading: SectionHeading;
}) {
  if (!data || data.length === 0) return null;
  return <PricingSectionInner data={data} heading={heading} />;
}
