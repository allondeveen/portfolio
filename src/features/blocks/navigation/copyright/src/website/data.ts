import z from "zod";

export const CopyrightSchema = z.object({
  id: z.string(),
  kind: z.literal("copyright"),
  siteTitle: z.string().min(1, { message: "Site title cannot be empty" }),
});

export type Copyright = z.infer<typeof CopyrightSchema>;
