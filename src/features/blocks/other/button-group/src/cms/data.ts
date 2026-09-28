import z from "zod";

export const ButtonGroupSchema = z.object({
  id: z.string(),
  blockType: z.literal("buttonGroup"),
});

export type ButtonGroup = z.infer<typeof ButtonGroupSchema>;
