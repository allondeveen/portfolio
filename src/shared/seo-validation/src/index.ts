import z from "zod";

import type { JsonObject } from "payload";

const MetaSchema = z.object({
  title: z.string().min(1, { error: "Title is required" }),
  description: z.string().min(1, { error: "Description is required" }),
  image: z.string().min(1, { error: "Image is required" }),
});

export function validateMeta(meta: JsonObject | undefined) {
  return MetaSchema.parse(meta);
}
