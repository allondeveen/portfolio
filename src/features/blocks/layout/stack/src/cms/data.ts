import z from "zod";

export const StackSchema = z.object({
  id: z.string(),
  blockType: z.literal("stack"),
});

export type Stack = z.infer<typeof StackSchema>;
