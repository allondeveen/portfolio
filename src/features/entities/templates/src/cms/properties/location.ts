import type { Field } from "payload";

export const location: Field = {
  name: "location",
  type: "text",
  required: true,
  unique: true,
};
