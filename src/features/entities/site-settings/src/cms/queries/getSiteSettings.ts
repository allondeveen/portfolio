import { type SiteSettings, SiteSettingsSchema } from "../data";

import type { JsonObject, Payload } from "payload";

export async function getSiteSettingsWithoutParse(payload: Payload): Promise<JsonObject> {
  return await payload.findGlobal({
    slug: "site-settings",
    depth: 1,
  });
}

export async function getSiteSettings(payload: Payload): Promise<SiteSettings> {
  const siteSettings = getSiteSettingsWithoutParse(payload);

  const validatedSiteSettings = SiteSettingsSchema.parse(siteSettings);

  return validatedSiteSettings;
}
