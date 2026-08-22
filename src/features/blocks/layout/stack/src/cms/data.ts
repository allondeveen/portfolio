import { HeadingSchema } from "@allondeveen-portfolio/heading-block/cms";
import { RichTextSchema } from "@allondeveen-portfolio/rich-text-block/cms";
import z from "zod";

export const StackSchema = z.object({
  id: z.string(),
  blockType: z.literal("stack"),
  blocks: z.array(z.discriminatedUnion("blockType", [HeadingSchema, RichTextSchema])).min(1),
});

export type Stack = z.infer<typeof StackSchema>;
