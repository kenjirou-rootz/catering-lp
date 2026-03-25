"use client";

import dynamic from "next/dynamic";

const HighlightsSectionInner = dynamic(
  () =>
    import("./HighlightsSectionInner").then((mod) => ({
      default: mod.HighlightsSectionInner,
    })),
  { ssr: false }
);

type ImagePair = {
  imageLarge: any;
  imageSmall: any;
};

type HighlightsData = {
  description?: string;
  slides?: ImagePair[];
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
