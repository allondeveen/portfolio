import { HeadingSchema } from "@allondeveen-portfolio/heading-block/website/data";
import { RichTextSchema } from "@allondeveen-portfolio/rich-text-block/website/data";
import { StackSchema } from "@allondeveen-portfolio/stack-block/website/data";
import * as z from "zod";

export const GridItemSchema = z.object({
  id: z.string(),
  kind: z.literal("grid-item"),
  size: z.number().min(1).max(12),
  blocks: z
    .array(z.discriminatedUnion("kind", [HeadingSchema, RichTextSchema, StackSchema]))
    .min(1),
});

export type GridItem = z.infer<typeof GridItemSchema>;
