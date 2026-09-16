import z from "zod";

export const GroupSchema = z.object({
  id: z.string(),
  kind: z.literal("group"),
});

export type Group = z.infer<typeof GroupSchema>;
