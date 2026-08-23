import type { JsonObject, Payload, TypeWithID } from "payload";

export type FindByLocationParams = {
  location: string;
  payload: Payload;
};

export async function findByLocation({
  location,
  payload,
}: FindByLocationParams): Promise<(JsonObject & TypeWithID) | undefined> {
  const templates = await payload.find({
    collection: "templates",
    where: {
      location: {
        equals: location,
      },
    },
    limit: 1,
  });
  return templates.docs.at(0);
}
