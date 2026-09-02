import type { SiteTitle as CMSSiteTitle } from "../cms";
import type { SiteTitle } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";
import type { SiteSettings } from "@allondeveen-portfolio/site-settings/website/data";

export type SiteTitleAdapterOptions = {
  siteSettings: SiteSettings;
  withLink?: boolean;
};

export const mapSiteTitle =
  ({
    siteSettings: { siteTitle },
    withLink = true,
  }: SiteTitleAdapterOptions): Adapter<CMSSiteTitle, SiteTitle> =>
  (siteTitleBlock) => {
    return {
      id: siteTitleBlock.id,
      kind: siteTitleBlock.blockType,
      siteTitle: siteTitle,
      withLink,
    };
  };
