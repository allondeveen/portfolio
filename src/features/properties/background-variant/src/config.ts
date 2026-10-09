import type { SelectField } from "payload";

export const backgroundVariant: SelectField = {
  name: "variant",
  type: "select",
  required: true,
  options: [
    {
      label: "Default",
      value: "default",
    },
    {
      label: "Elevated",
      value: "elevated",
    },
    {
      label: "Overlay",
      value: "overlay",
    },
  ],
  defaultValue: "default",
};
