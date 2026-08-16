import { publicCollections, publicCollectionSlugToSingular } from "../collections";

import type { JsonObject, Payload, TypeWithID } from "payload";

export type FindByIDParams = {
  payload: Payload;
  id: string;
};
export async function findByID({
  payload,
  id,
}: FindByIDParams): Promise<(JsonObject & TypeWithID) | undefined> {
  const paginatedResults = await Promise.all(
    publicCollections.map(async (collection) => {
      const results = await payload.find({
        collection,
        where: {
          id: {
            equals: id,
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
