import { protectedProcedure } from "@allondeveen-portfolio/trpc/server";
import * as z from "zod";

import { DocumentSchema as CMSDocumentSchema, findBySlug } from "../cms";
import { mapDocument } from "./adapter";
import { createDependencies } from "./dependencies";
import { createMappingContext } from "./mappingContext";
import { DocumentSchema } from "../website/data";

export const contentProcedure = protectedProcedure
  .input(z.string().min(1))
  .output(DocumentSchema)
  .query(async ({ input, ctx }) => {
    const document = await findBySlug({ payload: ctx.payload, slug: input });
    const validatedDocument = CMSDocumentSchema.parse(document);
    const dependencies = createDependencies(ctx.payload);
    return await mapDocument(validatedDocument, createMappingContext(dependencies));
  });
