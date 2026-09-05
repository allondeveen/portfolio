import type { Field } from "payload";

export const clients: Field = {
  name: "clients",
  type: "relationship",
  relationTo: "clients",
  hasMany: true,
  required: true,
  minRows: 1,
};
