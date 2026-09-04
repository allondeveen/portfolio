import type { Field } from "payload";

export const technologies: Field = {
  name: "technologies",
  type: "relationship",
  relationTo: "topics",
  hasMany: true,
  required: true,
  minRows: 1,
};
