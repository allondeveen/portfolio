import { createTRPCClient } from "@allondeveen-portfolio/trpc/client";
import { httpLink } from "@trpc/client";

import type { PublicDocumentsRouter } from "../trpc-server";

export async function publicDocumentLoader(cmsUrl: string, cms: Fetcher, slug: string) {
  const client = createTRPCClient<PublicDocumentsRouter>({
    links: [
      httpLink({
        url: new URL("/trpc", cmsUrl),
        fetch(input, init) {
          return cms.fetch(new Request(input, init));
        },
      }),
    ],
  });
  return await client.content.query(slug);
}
