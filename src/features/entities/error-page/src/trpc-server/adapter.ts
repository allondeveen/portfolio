import { mapBlock, type MapBlockOptions } from "@allondeveen-portfolio/blocks-property/trpc-server";

import type { ErrorPage as CMSMaintenanceContent } from "../cms/data";
import type { ErrorPage } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";
import type { Template } from "@allondeveen-portfolio/templates/website/data";

export type MapErrorPageOptions = MapBlockOptions & {
  header: Template;
  footer: Template;
};

export const mapErrorPage =
  ({
    header,
    footer,
    ...options
  }: MapErrorPageOptions): Adapter<CMSMaintenanceContent, ErrorPage> =>
  async (errorPageContent, context) => {
    return {
      header,
      blocks: await Promise.all(
        errorPageContent.blocks.map((block) => mapBlock(options)(block, context)),
      ),
      footer,
      siteTitle: options.siteTitle.siteSettings.siteTitle,
    };
  };
