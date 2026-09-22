import { image } from "./items/image";
import { order } from "./items/order";
import { value } from "./items/value";

import type { Field } from "payload";

export const items: Field = {
  type: "array",
  name: "items",
  fields: [value, image, order],
  hooks: {
    beforeValidate: [
      ({ value }) => {
        if (Array.isArray(value)) {
          return value.map((row, index) => ({
            ...row,
            order: index + 1,
          }));
        }
        return value;
      },
    ],
  },
  required: true,
};
