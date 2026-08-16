import { BlockSchema } from "@allondeveen-portfolio/blocks-property/website/data";
import z from "zod";

export const DocumentSchema = z.object({
  id: z.string(),
  kind: z.literal("pages"),
  meta: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  }),
  slug: z.string(),
  blocks: z.array(BlockSchema).min(1),
});

export type Document = z.infer<typeof DocumentSchema>;
