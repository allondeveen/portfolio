import z from "zod";

export const CopyrightSchema = z.object({
  id: z.string(),
  blockType: z.literal("copyright"),
});

export type Copyright = z.infer<typeof CopyrightSchema>;
