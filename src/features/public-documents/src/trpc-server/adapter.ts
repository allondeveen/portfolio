import { mapBlock } from "@allondeveen-portfolio/blocks-property/trpc-server";

import type { Document as CMSDocument } from "../cms";
import type { Document } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";
import type { Template } from "@allondeveen-portfolio/templates/website/data";

export const mapDocument =
  (header: Template): Adapter<CMSDocument, Document> =>
  async (document, context) => {
    return {
      id: document.id,
      kind: document.collection,
      meta: document.meta,
      slug: document.slug,
      header,
      blocks: await Promise.all(document.blocks.map((value) => mapBlock(value, context))),
    };
  };
