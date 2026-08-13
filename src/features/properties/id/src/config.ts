import { generateId } from "./lib/generateId";

import type { Field } from "payload";

export const id: Field = {
  name: "id",
  type: "text",
  required: true,
  unique: true,
  hidden: true,
  defaultValue: generateId,
};
