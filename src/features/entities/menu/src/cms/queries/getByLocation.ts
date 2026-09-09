import type { JsonObject, PaginatedDocs, Payload } from "payload";

export function getByLocation(
  payload: Payload,
  location: string,
): Promise<PaginatedDocs<JsonObject>> {
  return payload.find({
    collection: "menu",
    where: {
      location: {
        equals: location,
      },
    },
  });
}
