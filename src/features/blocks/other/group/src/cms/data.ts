import z from "zod";

export const GroupSchema = z.object({
  id: z.string(),
  blockType: z.literal("group"),
});

export type Group = z.infer<typeof GroupSchema>;
