import * as z from "zod";

export const DocumentSchema = z.object({
  collection: z.string(),
  id: z.string(),
  parent: z.string().optional(),
  slug: z.string(),
  title: z.string(),
  blocks: z.array(z.unknown()).nullish(),
});

export type Document = z.infer<typeof DocumentSchema>;
