import type { Field } from "payload";

export const image: Field = {
  type: "relationship",
  name: "image",
  label: "Marker image",
  relationTo: "media",
  hasMany: false,
  filterOptions: {
    type: {
      equals: "image",
    },
  },
  admin: {
    condition: (_data, _siblingData, { blockData }) =>
      blockData?.enumeration?.listStyleType === "image" &&
      blockData?.enumeration?.type === "unordered",
  },
};
