import { type SiteSettings, SiteSettingsSchema } from "../data";

import type { Payload } from "payload";

export async function getSiteSettings(payload: Payload): Promise<SiteSettings> {
  const siteSettings = await payload.findGlobal({
    slug: "site-settings",
    depth: 1,
  });

  const validatedSiteSettings = SiteSettingsSchema.parse(siteSettings);

  return validatedSiteSettings;
}
