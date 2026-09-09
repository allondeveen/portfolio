import type { Field } from "payload";

export const articles: Field = {
  name: "articles",
  type: "join",
  collection: "articles",
  on: "series",
  orderable: true,
  admin: {
    condition: (_data, _siblingData, { operation }) => operation === "update",
  },
};
