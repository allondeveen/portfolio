import z from "zod";

export const SiteTitleSchema = z.object({
  id: z.string(),
  blockType: z.literal("siteTitle"),
});

export type SiteTitle = z.infer<typeof SiteTitleSchema>;
