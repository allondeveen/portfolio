import { allBlockTypes } from "@allondeveen-portfolio/blocks-property/all";

import type { Field } from "payload";

export const blocks: Field = {
  type: "blocks",
  name: "blocks",
  blocks: [],
  blockReferences: allBlockTypes,
};
