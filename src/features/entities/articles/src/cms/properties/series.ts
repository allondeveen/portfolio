import type { Field } from "payload";

export const series: Field = {
  name: "series",
  type: "relationship",
  relationTo: "series",
  hasMany: false,
  required: false,
  index: true,
};
