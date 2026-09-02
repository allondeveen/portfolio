import { getSiteSettings } from "./getSiteSettings";

import type { Payload } from "payload";

export async function getSocialImage(payload: Payload): Promise<string> {
  const siteSettings = await getSiteSettings(payload);
  return siteSettings.socialImage.id;
}
