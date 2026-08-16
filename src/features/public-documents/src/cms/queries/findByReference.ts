import type { CollectionSlug, JsonObject, Payload, TypeWithID } from "payload";

export type FindByReferenceParams = {
  payload: Payload;
  id: string;
  collection: CollectionSlug;
};
export async function findByReference({
  payload,
  id,
  collection,
}: FindByReferenceParams): Promise<(JsonObject & TypeWithID) | undefined> {
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
  return results.docs.at(0);
}
