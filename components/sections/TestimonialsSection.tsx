"use client";

import dynamic from "next/dynamic";

const TestimonialsSectionInner = dynamic(
  () => import("./TestimonialsSectionInner").then((mod) => ({ default: mod.TestimonialsSectionInner })),
  { ssr: false }
);

type TestimonialItem = {
  _id: string;
  reviewText?: string;
  personPhoto?: any;
  eventPhoto?: any;
  name?: string;
  company?: string;
};

type SectionHeading = { en: string; ja: string };

export function TestimonialsSection({ data, heading }: { data: TestimonialItem[] | null; heading: SectionHeading }) {
  if (!data || data.length === 0) return null;
  return <TestimonialsSectionInner data={data} heading={heading} />;
}
