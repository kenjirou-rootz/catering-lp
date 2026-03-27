"use client";

import dynamic from "next/dynamic";

const VenueSectionInner = dynamic(
  () =>
    import("./VenueSectionInner").then((mod) => ({
      default: mod.VenueSectionInner,
    })),
  { ssr: false }
);

type VenueCard = {
  category: string;
  title: string;
  description?: string;
  image: any;
};

type VenueData = {
  cards?: VenueCard[];
} | null;

type SectionHeading = { en: string; ja: string };

export function VenueSection({
  data,
  heading,
}: {
  data: VenueData;
  heading: SectionHeading;
}) {
  if (!data || !data.cards || data.cards.length === 0) return null;
  return <VenueSectionInner data={data} heading={heading} />;
}
