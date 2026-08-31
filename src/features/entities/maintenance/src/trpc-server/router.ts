import { createTRPCRouter } from "@allondeveen-portfolio/trpc/server";

import { maintenanceProcedure } from "./maintenance";

export const maintenanceContentRouter = createTRPCRouter({
  maintenance: maintenanceProcedure,
});

export type MaintenanceContentRouter = typeof maintenanceContentRouter;
