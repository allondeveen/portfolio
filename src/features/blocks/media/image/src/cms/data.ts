import z from "zod";

export const ImageSchema = z.object({
  id: z.string(),
  blockType: z.literal("image"),
  image: z.string(),
});

export type Image = z.infer<typeof ImageSchema>;
