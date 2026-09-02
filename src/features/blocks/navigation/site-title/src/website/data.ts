import z from "zod";

export const SiteTitleSchema = z.object({
  id: z.string(),
  kind: z.literal("siteTitle"),
  siteTitle: z.string().min(1, { message: "Site title cannot be empty" }),
  withLink: z.boolean(),
});

export type SiteTitle = z.infer<typeof SiteTitleSchema>;
