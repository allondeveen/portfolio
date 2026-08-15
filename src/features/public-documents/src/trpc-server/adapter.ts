import { mapBlock } from "@allondeveen-portfolio/blocks-property/trpc-server";

import type { Document as CMSDocument } from "../cms";
import type { Document } from "../website/data";

export async function mapDocument(document: CMSDocument): Promise<Document> {
  return {
    id: document.id,
    kind: document.collection,
    meta: document.meta,
    slug: document.slug,
    blocks: await Promise.all(document.blocks.map(mapBlock)),
  };
}
