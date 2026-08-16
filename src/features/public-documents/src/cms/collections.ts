import type { CollectionSlug } from "payload";

export const publicCollections: CollectionSlug[] = ["pages"];

function regularPluralToSingular(plural: string) {
  return plural.slice(0, -1);
}

const collectionSlugToSingularMap = publicCollections
  .map((slug) => {
    // a future public collection slug with irregular plural should be mapped separately here
    return [slug, regularPluralToSingular(slug)];
  })
  .reduce(
    (prev, [slug, singular]) => ({
      ...prev,
      [slug]: singular,
    }),
    {},
  ) as Record<CollectionSlug, string>;

export function publicCollectionSlugToSingular(slug: CollectionSlug) {
  return collectionSlugToSingularMap[slug] ?? slug;
}
