import {
  createDependencies,
  createMappingContext,
} from "@allondeveen-portfolio/public-documents/trpc-server";
import { protectedProcedure } from "@allondeveen-portfolio/trpc/server";

import { mapMaintenanceContent } from "./adapter";
import { MaintenanceContentSchema as CMSMaintenanceContentSchema } from "../cms/data";
import { MaintenanceContentSchema } from "../website/data";

export const maintenanceProcedure = protectedProcedure
  .output(MaintenanceContentSchema)
  .query(async ({ ctx }) => {
    const maintenanceContent = await ctx.payload.findGlobal({
      slug: "maintenance",
    });
    const validateMaintenanceContent = CMSMaintenanceContentSchema.parse(maintenanceContent);
    const dependencies = createDependencies(ctx.payload);
    const context = createMappingContext(dependencies);
    return await mapMaintenanceContent(validateMaintenanceContent, context);
  });
