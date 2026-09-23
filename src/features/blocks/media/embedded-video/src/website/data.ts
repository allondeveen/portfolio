import { MediaSchema } from "@allondeveen-portfolio/media/website/data";
import z from "zod";

export const EmbeddedVideoSchema = z.object({
  id: z.string(),
  kind: z.literal("embeddedVideo"),
  coverImage: MediaSchema.optional(),
  videoUrl: z.string().min(1),
});

export type EmbeddedVideo = z.infer<typeof EmbeddedVideoSchema>;
