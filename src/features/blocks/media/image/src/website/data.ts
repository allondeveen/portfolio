import { ImageSchema as CMSImageSchema } from "@allondeveen-portfolio/media/website/data";
import z from "zod";

export const ImageSchema = z.object({
  id: z.string(),
  kind: z.literal("image"),
  image: CMSImageSchema.optional(),
});

export type Image = z.infer<typeof ImageSchema>;
