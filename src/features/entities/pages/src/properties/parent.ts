import type { Field } from "payload";

export const parent: Field = {
  name: "parent",
  type: "relationship",
  relationTo: "pages",
  hasMany: false,
  required: false,
};
