import { cache } from "react";
import { client } from "@/sanity/lib/client";

export const sanityFetch = cache(async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  revalidate = 60
): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate },
  });
});
