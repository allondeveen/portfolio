import z from "zod";

export const EmbeddedVideoSchema = z.object({
  id: z.string(),
  blockType: z.literal("embeddedVideo"),
  coverImage: z.string().nullish(),
  videoUrl: z.string().min(1),
});

export type EmbeddedVideo = z.infer<typeof EmbeddedVideoSchema>;
