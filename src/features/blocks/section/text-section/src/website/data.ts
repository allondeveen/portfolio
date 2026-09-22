import * as z from "zod";

export const TextSectionSchema = z.object({
  id: z.string(),
  kind: z.literal("textSection"),
});

export type TextSection = z.infer<typeof TextSectionSchema>;
