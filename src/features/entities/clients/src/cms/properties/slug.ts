import type { Field } from "payload";

export const slug: Field = {
  name: "slug",
  type: "text",
  required: true,
  unique: true,
};
