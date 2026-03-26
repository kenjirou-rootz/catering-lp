"use client";

import dynamic from "next/dynamic";

const HighlightsSectionInner = dynamic(
  () =>
    import("./HighlightsSectionInner").then((mod) => ({
      default: mod.HighlightsSectionInner,
    })),
  { ssr: false }
);

type HighlightSlide = {
  image: any;
  title?: string;
  caption?: string;
  ctaText?: string;
  ctaLink?: string;
};

type HighlightsData = {
  description?: string;
  slides?: HighlightSlide[];
} | null;

type SectionHeading = { en: string; ja: string };

export function HighlightsSection({
  data,
  heading,
}: {
  data: HighlightsData;
  heading: SectionHeading;
}) {
  if (!data || !data.slides || data.slides.length === 0) return null;
  return <HighlightsSectionInner data={data} heading={heading} />;
}
