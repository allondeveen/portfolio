import { getHeader } from "@allondeveen-portfolio/header/trpc-server";
import { getSiteSettings } from "@allondeveen-portfolio/site-settings/trpc-server";
import { protectedProcedure } from "@allondeveen-portfolio/trpc/server";
import * as z from "zod";

import { DocumentSchema as CMSDocumentSchema, findBySlug } from "../cms";
import { mapDocument } from "./adapter";
import { createDependencies } from "./dependencies";
import { createMappingContext } from "./mappingContext";
import { DocumentSchema } from "../website/data";

import type { MapBlockOptions } from "@allondeveen-portfolio/blocks-property/trpc-server";

export const contentProcedure = protectedProcedure
  .input(z.string().min(1))
  .output(DocumentSchema)
  .query(async ({ input, ctx }) => {
    const document = await findBySlug({ payload: ctx.payload, slug: input });
    const validatedDocument = CMSDocumentSchema.parse(document);
    const dependencies = createDependencies(ctx.payload);
    const context = createMappingContext(dependencies);
    const siteSettings = await getSiteSettings(ctx.payload, context);
    const mapBlockOptions: MapBlockOptions = {
      siteTitle: {
        siteSettings,
      },
    };
    const header = await getHeader(ctx.payload, context, mapBlockOptions);
    const mappedDocument = await mapDocument(
      header,
      siteSettings,
      mapBlockOptions,
    )(validatedDocument, context);
    return mappedDocument;
  });
