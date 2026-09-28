import z from "zod";

export const GallerySchema = z.object({
  id: z.string(),
  kind: z.literal("gallery"),
  layout: z.literal("grid").or(z.literal("masonry")).or(z.literal("carousel")),
});

export type Gallery = z.infer<typeof GallerySchema>;
