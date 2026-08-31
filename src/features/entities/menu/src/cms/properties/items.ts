import { id } from "@allondeveen-portfolio/id-property/config";

import { external } from "./items/external";
import { externality } from "./items/externality";
import { icon } from "./items/icon";
import { internal } from "./items/internal";
import { label } from "./items/label";
import { order } from "./items/order";

import type { Field } from "payload";

export const items: Field = {
  name: "items",
  type: "array",
  fields: [
    // prevent collapse
    id,
    label,
    icon,
    externality,
    external,
    internal,
    order,
  ],
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
