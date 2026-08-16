import { publicCollections, publicCollectionSlugToSingular } from "../collections";

import type { JsonObject, Payload, TypeWithID } from "payload";

export type FindBySlugParams = {
  payload: Payload;
  slug: string;
};
export async function findBySlug({
  payload,
  slug,
}: FindBySlugParams): Promise<(JsonObject & TypeWithID) | undefined> {
  const paginatedResults = await Promise.all(
    publicCollections.map(async (collection) => {
      const results = await payload.find({
        collection,
        where: {
          slug: {
            equals: slug,
          },
        },
        limit: 1,
        depth: 0,
        pagination: false,
      });
      return {
        ...results,
        docs: results.docs.map((doc) => ({
          collection: publicCollectionSlugToSingular(collection),
          ...doc,
        })),
      };
    }),
  );
  return paginatedResults
    .map((result) => result.docs)
    .reduce((prev, cur) => [...prev, ...cur])
    .at(0);
}
