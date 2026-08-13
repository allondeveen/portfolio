import { publicDocumentsRouter } from "@allondeveen-portfolio/public-documents/trpc-server";

/**
 * When adding another procedure, you can use mergeTRPCRouters from @allondeveen-portfolio/public-documents/trpc-server
 */
export const appRouter = publicDocumentsRouter;

export type AppRouter = typeof appRouter;
