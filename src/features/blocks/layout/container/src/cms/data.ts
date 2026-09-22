import z from "zod";

export const ContainerSchema = z.object({
  id: z.string(),
  blockType: z.literal("container"),
});

export type Container = z.infer<typeof ContainerSchema>;
