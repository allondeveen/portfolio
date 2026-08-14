import type { PublicDocumentsRouter } from "../trpc-server";
import type { TRPCClient } from "@allondeveen-portfolio/trpc/client";

export async function publicDocumentLoader(
  client: TRPCClient<PublicDocumentsRouter>,
  slug: string,
) {
  return await client.content.query(slug);
}
