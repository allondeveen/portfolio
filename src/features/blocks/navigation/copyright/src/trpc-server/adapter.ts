import type { Copyright as CMSCopyright } from "../cms";
import type { Copyright } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";
import type { SiteSettings } from "@allondeveen-portfolio/site-settings/website/data";

export type CopyrightAdapterOptions = {
  siteSettings: SiteSettings;
  withLink?: boolean;
};

export const mapCopyright =
  ({ siteSettings: { siteTitle } }: CopyrightAdapterOptions): Adapter<CMSCopyright, Copyright> =>
  (copyrightBlock) => {
    return {
      id: copyrightBlock.id,
      kind: copyrightBlock.blockType,
      siteTitle: siteTitle,
    };
  };
