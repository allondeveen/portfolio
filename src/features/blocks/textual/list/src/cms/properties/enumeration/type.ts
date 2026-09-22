import type { Field } from "payload";

export const type: Field = {
  type: "select",
  name: "type",
  options: [
    {
      label: "Ordered",
      value: "ordered",
    },
    {
      label: "Unordered",
      value: "unordered",
    },
  ],
  required: true,
};
