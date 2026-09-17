import * as z from "zod";

export const TextSectionSchema = z.object({
  id: z.string(),
  blockType: z.literal("textSection"),
});

export type TextSection = z.infer<typeof TextSectionSchema>;
