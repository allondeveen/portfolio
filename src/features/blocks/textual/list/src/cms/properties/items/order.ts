import type { Field } from "payload";

export const order: Field = {
  name: "order",
  admin: {
    readOnly: true,
    hidden: true,
  },
  type: "number",
};
