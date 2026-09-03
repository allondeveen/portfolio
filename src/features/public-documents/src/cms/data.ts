import { BlockSchema } from "@allondeveen-portfolio/blocks-property/cms";
import * as z from "zod";

export const DocumentSchema = z.object({
  id: z.string(),
  collection: z.literal("page").or(z.literal("project")),
  meta: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  }),
  parent: z.string().nullish(),
  slug: z.string(),
  title: z.string(),
  blocks: z.array(BlockSchema).min(1),
});

export type Document = z.infer<typeof DocumentSchema>;
