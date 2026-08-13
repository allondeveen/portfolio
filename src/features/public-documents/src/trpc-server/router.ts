import { createTRPCRouter } from "@allondeveen-portfolio/trpc/server";

import { contentProcedure } from "./content";

export const publicDocumentsRouter = createTRPCRouter({
  content: contentProcedure,
});

export type PublicDocumentsRouter = typeof publicDocumentsRouter;
