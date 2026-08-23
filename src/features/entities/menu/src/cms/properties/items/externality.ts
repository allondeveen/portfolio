import type { Field } from "payload";

export const externality: Field = {
  name: "externality",
  type: "radio",
  options: [
    {
      label: "External",
      value: "external",
    },
    {
      label: "Internal",
      value: "internal",
    },
  ],
  required: true,
  defaultValue: "external",
};
