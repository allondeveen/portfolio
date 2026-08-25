import z from "zod";

export const MediaSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  alt: z.string().min(1),
  caption: z.string().optional(),
  credits: z.string().optional(),
  url: z.string().min(1),
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

export type Media = z.infer<typeof MediaSchema>;
