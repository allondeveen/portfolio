import { mapBlock } from "@allondeveen-portfolio/blocks-property/trpc-server";

import type { Document as CMSDocument } from "../cms";
import type { Document } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";

export const mapDocument: Adapter<CMSDocument, Document> = async (document, context) => {
  return {
    id: document.id,
    kind: document.collection,
    meta: document.meta,
    slug: document.slug,
    blocks: await Promise.all(document.blocks.map((value) => mapBlock(value, context))),
  };
};
