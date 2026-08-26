import z from "zod";

export const MediaSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  alt: z.string().min(1),
  prefix: z.string().min(1),
  caption: z.string().nullable(),
  credits: z.string().nullable(),
  filename: z.string().min(1),
  width: z.number(),
  height: z.number(),
});

export type Media = z.infer<typeof MediaSchema>;
