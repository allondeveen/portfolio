import { MediaSchema } from "@allondeveen-portfolio/media/cms";
import z from "zod";

export const SiteSettingsSchema = z.object({
  siteTitle: z.string().min(1, { message: "Site title is required" }),
  supportEmail: z.string().min(1, { message: "Site title is required" }),
  socialImage: MediaSchema,
});

export type SiteSettings = z.infer<typeof SiteSettingsSchema>;
