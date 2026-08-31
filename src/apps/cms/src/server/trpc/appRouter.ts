import { maintenanceContentRouter } from "@allondeveen-portfolio/maintenance-content/trpc-server";
import { publicDocumentsRouter } from "@allondeveen-portfolio/public-documents/trpc-server";
import { mergeTRPCRouters } from "@allondeveen-portfolio/trpc/server";

/**
 * When adding another procedure, you can use mergeTRPCRouters from @allondeveen-portfolio/public-documents/trpc-server
 */
export const appRouter = mergeTRPCRouters(publicDocumentsRouter, maintenanceContentRouter);

export type AppRouter = typeof appRouter;
