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

export function CoordinateSection({ data }: { data: CoordinateItem[] | null }) {
  if (!data || data.length === 0) return null;
  return <CoordinateSectionInner data={data} />;
}
