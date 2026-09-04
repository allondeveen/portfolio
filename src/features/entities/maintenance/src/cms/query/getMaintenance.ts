import type { JsonObject, Payload } from "payload";

export function getMaintenance(payload: Payload): Promise<JsonObject> {
  return payload.findGlobal({
    slug: "maintenance",
  });
}
