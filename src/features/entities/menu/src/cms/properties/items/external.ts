import type { Field } from "payload";

export const external: Field = {
  name: "external",
  admin: {
    condition: (_, siblingData) =>
      siblingData.externality ? siblingData.externality === "external" : false,
  },
  label: "External Link",
  type: "text",
  required: true,
};
