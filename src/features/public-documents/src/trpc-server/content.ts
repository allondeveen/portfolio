import { getVersions } from "@allondeveen-portfolio/caching";
import { type CacheTagInput, getCacheTags } from "@allondeveen-portfolio/content-cache-tags";
import { getErrorPage } from "@allondeveen-portfolio/error-page/cms";
import { mapErrorPage } from "@allondeveen-portfolio/error-page/trpc-server";
import { getFooter } from "@allondeveen-portfolio/footer/trpc-server";
import { getHeader } from "@allondeveen-portfolio/header/trpc-server";
import { getNotFound } from "@allondeveen-portfolio/not-found/cms";
import { mapNotFoundContent } from "@allondeveen-portfolio/not-found/trpc-server";
import { ProcedureResultSchema } from "@allondeveen-portfolio/procedure-result";
import { findBySlug } from "@allondeveen-portfolio/public-documents-queries/cms";
import { findBySource } from "@allondeveen-portfolio/redirects/cms";
import { getSiteSettings } from "@allondeveen-portfolio/site-settings/trpc-server";
import { protectedProcedure } from "@allondeveen-portfolio/trpc/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as z from "zod";

import { DocumentSchema as CMSDocumentSchema } from "../cms";
import { mapDocument } from "./adapter";
import { createDependencies } from "./dependencies";
import { createMappingContext } from "./mappingContext";
import { type Document, DocumentResponseSchema } from "../website/data";

import type { MappingContext } from "@allondeveen-portfolio/adapter/trpc-server";
import type { MapBlockOptions } from "@allondeveen-portfolio/blocks-property/trpc-server";
import type { ErrorPage } from "@allondeveen-portfolio/error-page/website/data";
import type { Template } from "@allondeveen-portfolio/templates/website/data";
import type { Payload } from "payload";

type GetErrorPageTemplateOptions = {
  env: CloudflareEnv;
  payload: Payload;
  header: Template;
  footer: Template;
  mapBlockOptions: MapBlockOptions;
  context: MappingContext;
  errorMessage: string | undefined | null;
};
async function getErrorPageTemplate({
  env,
  payload,
  header,
  footer,
  mapBlockOptions,
  context,
  errorMessage,
}: GetErrorPageTemplateOptions): Promise<ErrorPage> {
  const errorPageContent = await getErrorPage(payload);
  const errorPage = await mapErrorPage({ header, footer, ...mapBlockOptions })(
    errorPageContent,
    context,
  );
  if (env.ENVIRONMENT !== "production") {
    return {
      ...errorPage,
      blocks: errorPage.blocks.map((block) => {
        if (block.kind === "hero" && errorMessage) {
          return {
            ...block,
            blocks: block.blocks.map((block) => {
              if (block.kind === "heading") {
                return {
                  ...block,
                  text: {
                    kind: "lexicalText" as const,
                    paragraphs: [
                      {
                        kind: "paragraph" as const,
                        elements: [
                          {
                            kind: "text" as const,
                            text: errorMessage,
                            formats: [],
                          },
                        ],
                      },
                    ],
                  },
                };
              }
              return block;
            }),
          };
        }
        return block;
      }),
    };
  }
  return errorPage;
}

const ContentProcedureResult = ProcedureResultSchema(DocumentResponseSchema, z.string().min(1));

export const contentProcedure = protectedProcedure
  .input(z.string().min(1))
  .output(ContentProcedureResult)
  .query(async ({ input, ctx }) => {
    const { env } = getCloudflareContext();
    const redirect = await findBySource(ctx.payload, input);
    if (redirect !== undefined) {
      const tags = [`route:${input}`];
      const versionedTags = await getVersions({
        cache: env.CACHE,
        tags,
      });
      return {
        status: "success",
        data: {
          kind: "redirect",
          data: redirect,
          tags: versionedTags,
        },
      };
    }
    let errorMessage = "Something went wrong";
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
    const document = await findBySlug({ payload: ctx.payload, slug: input });
    if (!document) {
      const notFoundContent = await getNotFound(ctx.payload);
      return {
        status: "not-found",
        template: await mapNotFoundContent({ header, footer, ...mapBlockOptions })(
          notFoundContent,
          context,
        ),
      };
    }
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
        template: await getErrorPageTemplate({
          env,
          payload: ctx.payload,
          header,
          footer,
          mapBlockOptions,
          context,
          errorMessage,
        }),
      };
    }
    try {
      const mappedDocument = await mapDocument(
        header,
        footer,
        siteSettings,
        mapBlockOptions,
      )(validatedDocument.data, context);
      const tags = getCacheTags({
        slug: input,
        ...getBlockNamesAndData(mappedDocument.blocks),
        series: validatedDocument.data.series,
      });
      const versionedTags = await getVersions({
        cache: env.CACHE,
        tags,
      });
      return {
        status: "success",
        data: {
          kind: "document",
          data: mappedDocument,
          tags: versionedTags,
        },
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
          template: await getErrorPageTemplate({
            env,
            payload: ctx.payload,
            header,
            footer,
            mapBlockOptions,
            context,
            errorMessage,
          }),
        };
      } else {
        return {
          status: "error",
          error: errorMessage,
          template: await getErrorPageTemplate({
            env,
            payload: ctx.payload,
            header,
            footer,
            mapBlockOptions,
            context,
            errorMessage,
          }),
        };
      }
    }
  });

function getBlockNamesAndData(
  blocks: Document["blocks"],
): Pick<CacheTagInput, "blockData" | "blockNames"> {
  let blockNames: string[] = [];
  const blockData: CacheTagInput["blockData"] = {};
  for (const block of blocks) {
    blockNames = [...blockNames, block.kind];
    switch (block.kind) {
      case "image":
        if (block.image) {
          blockData.image = [...(blockData.image ?? []), block.image.id];
        }
        break;
      case "menu":
        blockData.menu = [...(blockData.menu ?? []), block.location];
        break;
    }
    if ("blocks" in block) {
      const childData = getBlockNamesAndData(block.blocks);
      blockNames = [...blockNames, ...childData.blockNames];
      if (childData.blockData.image) {
        blockData.image = [...(blockData.image ?? []), ...childData.blockData.image];
      }
      if (childData.blockData.menu) {
        blockData.menu = [...(blockData.menu ?? []), ...childData.blockData.menu];
      }
    }
  }
  return {
    blockData,
    blockNames,
  };
}
