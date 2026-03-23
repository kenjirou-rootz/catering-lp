"use client";

import dynamic from "next/dynamic";

const CatchCarouselSectionInner = dynamic(
  () => import("./CatchCarouselSectionInner").then((mod) => ({ default: mod.CatchCarouselSectionInner })),
  { ssr: false }
);

type CatchCarouselData = {
  catchCopy?: string;
  description?: string;
  carouselImages?: any[];
} | null;

export function CatchCarouselSection({ data }: { data: CatchCarouselData }) {
  if (!data) return null;
  return <CatchCarouselSectionInner data={data} />;
}
