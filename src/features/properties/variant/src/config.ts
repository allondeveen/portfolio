import type { SelectField } from "payload";

export const variant: SelectField = {
  name: "variant",
  type: "select",
  defaultValue: "default",
  required: true,
  options: [
    {
      label: "Default",
      value: "default",
    },
    {
      label: "Primary",
      value: "primary",
    },
    {
      label: "Secondary",
      value: "secondary",
    },
    {
      label: "Disabled",
      value: "disabled",
    },
  ],
};
