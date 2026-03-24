"use client";

import dynamic from "next/dynamic";

const PortfolioSectionInner = dynamic(
  () =>
    import("./PortfolioSectionInner").then((mod) => ({
      default: mod.PortfolioSectionInner,
    })),
  { ssr: false }
);

type PortfolioItem = {
  _id: string;
  title?: string;
  description?: string;
  images?: any[];
  ctaText?: string;
};

type SectionHeading = { en: string; ja: string };

export function PortfolioSection({
  data,
  heading,
}: {
  data: PortfolioItem[] | null;
  heading: SectionHeading;
}) {
  if (!data || data.length === 0) return null;
  return <PortfolioSectionInner data={data} heading={heading} />;
}
