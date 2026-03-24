"use client";

import dynamic from "next/dynamic";

const CoordinateSectionInner = dynamic(
  () => import("./CoordinateSectionInner").then((mod) => ({ default: mod.CoordinateSectionInner })),
  { ssr: false }
);

type CoordinateItem = {
  _id: string;
  slug?: string;
  description?: string;
  photos?: any[];
};

type SectionHeading = { en: string; ja: string };

export function CoordinateSection({ data, heading }: { data: CoordinateItem[] | null; heading: SectionHeading }) {
  if (!data || data.length === 0) return null;
  return <CoordinateSectionInner data={data} heading={heading} />;
}
