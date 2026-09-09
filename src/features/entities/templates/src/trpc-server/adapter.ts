import { mapBlock, type MapBlockOptions } from "@allondeveen-portfolio/blocks-property/trpc-server";

import type { Template as CMSTemplate } from "../cms/data";
import type { Template } from "../website/data";
import type { MappingContext } from "@allondeveen-portfolio/adapter/trpc-server";

export async function mapTemplate(
  template: CMSTemplate,
  context: MappingContext,
  mapBlockOptions: MapBlockOptions,
): Promise<Template> {
  return {
    id: template.id,
    location: template.location,
    blocks: await Promise.all(
      template.blocks.map((block) => mapBlock(mapBlockOptions)(block, context)),
    ),
  };
}
