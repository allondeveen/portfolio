import { mapMedia } from "@allondeveen-portfolio/media/trpc-server";

import type { SiteSettings as CMSSiteSettings } from "../cms";
import type { SiteSettings } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";

export const mapSiteSettings: Adapter<CMSSiteSettings, SiteSettings> = async (
  siteSettings,
  context,
) => {
  return {
    siteTitle: siteSettings.siteTitle,
    supportEmail: siteSettings.supportEmail,
    socialImage: await mapMedia(siteSettings.socialImage, context),
  };
};
