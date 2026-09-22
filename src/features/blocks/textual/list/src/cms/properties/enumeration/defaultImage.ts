import type { Field } from "payload";

export const defaultImage: Field = {
  type: "relationship",
  name: "defaultImage",
  label: "Default marker image",
  relationTo: "media",
  hasMany: false,
  filterOptions: {
    type: {
      equals: "image",
    },
  },
  required: true,
  admin: {
    condition: (_data, siblingData) =>
      siblingData?.listStyleType === "image" && siblingData?.type === "unordered",
  },
};
