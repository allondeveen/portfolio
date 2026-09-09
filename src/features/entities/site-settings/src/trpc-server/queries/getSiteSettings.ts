import { getSiteSettings as cmsGetSiteSettings } from "../../cms/queries/getSiteSettings";
import { mapSiteSettings } from "../adapter";

import type { SiteSettings } from "../../website/data";
import type { MappingContext } from "@allondeveen-portfolio/adapter/trpc-server";
import type { Payload } from "payload";

export const getSiteSettings = async (
  payload: Payload,
  context: MappingContext,
): Promise<SiteSettings> => {
  const siteSettingsDoc = await cmsGetSiteSettings(payload);
  return await mapSiteSettings(siteSettingsDoc, context);
};
