import type { Field } from "payload";

export const title: Field = {
  name: "title",
  admin: {
    hidden: true,
  },
  type: "text",
  defaultValue: "",
  required: true,
};
