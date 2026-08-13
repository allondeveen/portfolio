import * as z from "zod";

export const RichTextSchema = z.object({
  blockType: z.literal("richText"),
  text: z.unknown(),
});

export type RichText = z.infer<typeof RichTextSchema>;
