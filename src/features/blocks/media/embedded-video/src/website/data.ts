import { ImageSchema } from "@allondeveen-portfolio/media/website/data";
import z from "zod";

export const EmbeddedVideoSchema = z.object({
  id: z.string(),
  kind: z.literal("embeddedVideo"),
  coverImage: ImageSchema.optional(),
  videoUrl: z.string().min(1),
});

export type EmbeddedVideo = z.infer<typeof EmbeddedVideoSchema>;
