import { defaultImage } from "./enumeration/defaultImage";
import { listStyleType } from "./enumeration/listStyleType";
import { type } from "./enumeration/type";

import type { Field } from "payload";

export const enumeration: Field = {
  type: "group",
  name: "enumeration",
  fields: [type, listStyleType, defaultImage],
};
