import { MediaSchema } from "@allondeveen-portfolio/media/website/data";
import z from "zod";

export const ImageSchema = z.object({
  id: z.string(),
  kind: z.literal("image"),
  image: MediaSchema.optional(),
});

export type Image = z.infer<typeof ImageSchema>;
