import { publicCollections, publicCollectionSlugToSingular } from "./collections";

import type { JsonObject, Payload, PayloadRequest, TypeWithID } from "payload";

export type FindBySlugParams = {
  payload: Payload;
  slug: string;
  req?: PayloadRequest;
};
export async function findBySlug({
  payload,
  slug,
  req,
}: FindBySlugParams): Promise<(JsonObject & TypeWithID) | undefined> {
  const paginatedResults = await Promise.all(
    publicCollections.map(async (collection) => {
      const results = await payload.find({
        collection,
        where: {
          slug: {
            equals: slug,
          },
          _status: {
            equals: "published",
          },
        },
        limit: 1,
        depth: 0,
        pagination: false,
        req,
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

export { publicCollections, publicCollectionSlugToSingular };
