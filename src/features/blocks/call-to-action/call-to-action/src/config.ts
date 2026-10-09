import { backgroundVariant } from "@allondeveen-portfolio/background-variant-property/config";

import type { Block, BlockSlug } from "payload";

export const callToActionBlock = (allowedBlocks: readonly BlockSlug[]): Block => ({
  slug: "callToAction",
  admin: {
    group: "Call to action",
  },
  fields: [
    backgroundVariant,
    {
      type: "blocks",
      name: "blocks",
      blocks: [],
      blockReferences: [...allowedBlocks],
    },
  ],
});
