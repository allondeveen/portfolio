import { data } from "react-router";

import type { PublicDocumentsRouter } from "../trpc-server";
import type { TRPCClient } from "@allondeveen-portfolio/trpc/client";

export async function publicDocumentLoader(
  client: TRPCClient<PublicDocumentsRouter>,
  slug: string,
) {
  let contentProcedureResult: Awaited<ReturnType<typeof client.content.query>>;
  try {
    contentProcedureResult = await client.content.query(slug);
  } catch (error) {
    throw data(error, {
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
      throw data("Couldn't found the page you were looking for", {
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
}
