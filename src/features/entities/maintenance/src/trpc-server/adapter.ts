import { mapBlock, type MapBlockOptions } from "@allondeveen-portfolio/blocks-property/trpc-server";

import type { MaintenanceContent as CMSMaintenanceContent } from "../cms/data";
import type { MaintenanceContent } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";

export const mapMaintenanceContent =
  (options: MapBlockOptions): Adapter<CMSMaintenanceContent, MaintenanceContent> =>
  async (maintenanceContent, context) => {
    let header: MaintenanceContent["header"];
    if (maintenanceContent.header !== null && maintenanceContent.header.length > 0) {
      header = {
        location: "header",
        blocks: await Promise.all(
          maintenanceContent.header.map((block) => mapBlock(options)(block, context)),
        ),
      };
    }
    return {
      header,
      blocks: await Promise.all(
        maintenanceContent.blocks.map((block) => mapBlock(options)(block, context)),
      ),
    };
  };
