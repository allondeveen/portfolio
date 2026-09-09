import type { Field } from "payload";

export const subjects: Field = {
  name: "subjects",
  type: "relationship",
  relationTo: "topics",
  hasMany: true,
  required: true,
  minRows: 1,
};
