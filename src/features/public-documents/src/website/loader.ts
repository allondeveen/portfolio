import {
  cachedRequest,
  type CachedRequestOptions,
  type WithTags,
} from "@allondeveen-portfolio/caching";
import { data, redirect } from "react-router";

import { DocumentResponseSchema } from "./data";

import type { PublicDocumentsRouter } from "../trpc-server";
import type { TRPCClient } from "@allondeveen-portfolio/trpc/client";

export async function publicDocumentLoader(
  client: TRPCClient<PublicDocumentsRouter>,
  cache: CachedRequestOptions<WithTags>["cache"],
  slug: string,
  queryString: string = "",
) {
  const resolve = async () => {
    let contentProcedureResult: Awaited<ReturnType<typeof client.content.query>>;
    try {
      contentProcedureResult = await client.content.query(slug);
    } catch (error) {
      let errorResponse: string = "Internal server error";
      if (error instanceof Error) {
        errorResponse = error.message;
      }
      if (process.env.ENVIRONMENT === "production") {
        errorResponse = "Internal server error";
      }
      throw data(errorResponse, {
        status: 503,
        statusText: "Service Unavailable",
        headers: {
          "Cache-Control": "no-store",
        },
      });
    }

    switch (contentProcedureResult.status) {
      case "success":
        return contentProcedureResult.data;
      case "not-found":
        throw data("Couldn't find the page you were looking for", {
          status: 404,
          statusText: "Not Found",
          headers: {
            "Cache-Control": "no-store",
          },
        });
      default:
      case "error":
        throw data(contentProcedureResult.error ?? null, {
          status: 500,
          statusText: "Internal Server Error",
          headers: {
            "Cache-Control": "no-store",
          },
        });
    }
  };
  const resolved = await cachedRequest({
    cache,
    key: `public-document:${slug}`,
    schema: DocumentResponseSchema,
    resolve,
  });
  if (resolved.kind === "redirect") {
    let destination = resolved.data.destination;
    const normalisedQueryString = queryString.startsWith("?") ? queryString.slice(1) : queryString;
    if (resolved.data.queryString && normalisedQueryString.length > 0) {
      destination = `${destination}?${normalisedQueryString}`;
    }
    throw redirect(destination, 301);
  }
  return resolved.data;
}
