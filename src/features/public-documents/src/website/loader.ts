import type { PublicDocumentsRouter } from "../trpc-server";
import type { TRPCClient } from "@allondeveen-portfolio/trpc/client";

export async function publicDocumentLoader(
  client: TRPCClient<PublicDocumentsRouter>,
  slug: string,
) {
  try {
    return await client.content.query(slug);
  } catch {
    throw new Response(null, {
      status: 503,
      statusText: "Service Unavailable",
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }
}
