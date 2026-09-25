import z from "zod";

const BaseSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  caption: z.string().optional(),
  credits: z.string().optional(),
  url: z.string().min(1),
});

export const ImageSchema = BaseSchema.extend({
  kind: z.literal("image"),
  alt: z.string().min(1),
  width: z.number(),
  height: z.number(),
  sizes: z
    .array(
      z.object({
        url: z.string().min(1),
        width: z.number(),
        height: z.number(),
      }),
    )
    .min(1),
});

export type Image = z.infer<typeof ImageSchema>;

export const DownloadSchema = BaseSchema.extend({
  kind: z.literal("download"),
});

export type Download = z.infer<typeof DownloadSchema>;

export const MediaSchema = z.discriminatedUnion("kind", [ImageSchema, DownloadSchema]);

export type Media = z.infer<typeof MediaSchema>;
