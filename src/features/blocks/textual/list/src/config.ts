import { enumeration } from "./cms/properties/enumeration";
import { items } from "./cms/properties/items";

import type { Block } from "payload";

export const listblock: Block = {
  slug: "list",
  admin: {
    group: "Textual",
  },
  fields: [enumeration, items],
};
