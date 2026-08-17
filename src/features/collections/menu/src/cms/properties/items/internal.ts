import type { Field } from "payload";

export const internal: Field = {
  name: "internal",
  admin: {
    condition: (_, siblingData) =>
      siblingData.externality ? siblingData.externality === "internal" : false,
  },
  label: "Internal location",
  type: "relationship",
  relationTo: ["pages"],
  required: true,
};
