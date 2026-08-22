import { HeadingSchema } from "@allondeveen-portfolio/heading-block/website/data";
import { RichTextSchema } from "@allondeveen-portfolio/rich-text-block/website/data";
import z from "zod";

export const StackSchema = z.object({
  id: z.string(),
  kind: z.literal("stack"),
  blocks: z.array(z.discriminatedUnion("kind", [HeadingSchema, RichTextSchema])).min(1),
});

export type Stack = z.infer<typeof StackSchema>;
