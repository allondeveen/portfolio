import { getFooter } from "@allondeveen-portfolio/footer/trpc-server";
import { getHeader } from "@allondeveen-portfolio/header/trpc-server";
import { ProcedureResultSchema } from "@allondeveen-portfolio/procedure-result";
import { getSiteSettings } from "@allondeveen-portfolio/site-settings/trpc-server";
import { protectedProcedure } from "@allondeveen-portfolio/trpc/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as z from "zod";

import { DocumentSchema as CMSDocumentSchema, findBySlug } from "../cms";
import { mapDocument } from "./adapter";
import { createDependencies } from "./dependencies";
import { createMappingContext } from "./mappingContext";
import { DocumentSchema } from "../website/data";

import type { MapBlockOptions } from "@allondeveen-portfolio/blocks-property/trpc-server";

const ContentProcedureResult = ProcedureResultSchema(DocumentSchema, z.string().min(1));

export const contentProcedure = protectedProcedure
  .input(z.string().min(1))
  .output(ContentProcedureResult)
  .query(async ({ input, ctx }) => {
    const { env } = getCloudflareContext();
    const document = await findBySlug({ payload: ctx.payload, slug: input });
    if (!document) {
      return {
        status: "not-found",
      };
    }
    let errorMessage = "Something went wrong";
    const validatedDocument = CMSDocumentSchema.safeParse(document);
    if (!validatedDocument.success) {
      if (env.ENVIRONMENT !== "production") {
        errorMessage = `CMS Document invalid: ${validatedDocument.error.issues.at(0)?.message}`;
      } else {
        // track errors
      }
      return {
        status: "error",
        error: errorMessage,
      };
    }
    const dependencies = createDependencies(ctx.payload);
    const context = createMappingContext(dependencies);
    let siteSettings: Awaited<ReturnType<typeof getSiteSettings>>;
    try {
      siteSettings = await getSiteSettings(ctx.payload, context);
    } catch (error) {
      if (error instanceof z.ZodError) {
        if (env.ENVIRONMENT !== "production") {
          errorMessage = `Site settings parse failed: ${error.issues.at(0)?.message}`;
        } else {
          // track errors
        }
        return {
          status: "error",
          error: errorMessage,
        };
      } else {
        throw error;
      }
    }
    const mapBlockOptions: MapBlockOptions = {
      siteTitle: {
        siteSettings,
      },
    };
    let header: Awaited<ReturnType<typeof getHeader>>;
    try {
      header = await getHeader(ctx.payload, context, mapBlockOptions);
    } catch (error) {
      if (error instanceof z.ZodError) {
        if (env.ENVIRONMENT !== "production") {
          errorMessage = `Header parse failed: ${error.issues.at(0)?.message}`;
        } else {
          // track errors
        }
        return {
          status: "error",
          error: errorMessage,
        };
      } else {
        throw error;
      }
    }
    let footer: Awaited<ReturnType<typeof getFooter>>;
    try {
      footer = await getFooter(ctx.payload, context, mapBlockOptions);
    } catch (error) {
      if (error instanceof z.ZodError) {
        if (env.ENVIRONMENT !== "production") {
          errorMessage = `Footer parse failed: ${error.issues.at(0)?.message}`;
        } else {
          // track errors
        }
        return {
          status: "error",
          error: errorMessage,
        };
      } else {
        throw error;
      }
    }
    try {
      const mappedDocument = await mapDocument(
        header,
        footer,
        siteSettings,
        mapBlockOptions,
      )(validatedDocument.data, context);
      return {
        status: "success",
        data: mappedDocument,
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        if (env.ENVIRONMENT !== "production") {
          errorMessage = `Document parse failed: ${error.issues.at(0)?.message}`;
        } else {
          // track errors
        }
        return {
          status: "error",
          error: errorMessage,
        };
      } else {
        throw error;
      }
    }
  });
