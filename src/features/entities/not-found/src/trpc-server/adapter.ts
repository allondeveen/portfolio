import { mapBlock, type MapBlockOptions } from "@allondeveen-portfolio/blocks-property/trpc-server";

import type { NotFoundContent as CMSMaintenanceContent } from "../cms/data";
import type { NotFoundContent } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";
import type { Template } from "@allondeveen-portfolio/templates/website/data";

export type MapNotFoundOptions = MapBlockOptions & {
  header: Template;
  footer: Template;
};

export const mapNotFoundContent =
  ({
    header,
    footer,
    ...options
  }: MapNotFoundOptions): Adapter<CMSMaintenanceContent, NotFoundContent> =>
  async (notFoundContent, context) => {
    return {
      header,
      blocks: await Promise.all(
        notFoundContent.blocks.map((block) => mapBlock(options)(block, context)),
      ),
      footer,
      siteTitle: options.siteTitle.siteSettings.siteTitle,
    };
  };
