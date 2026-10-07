import { languagesOptions } from "./languages";

import type { Block } from "payload";

export const codeBlock: Block = {
  slug: "code",
  admin: {
    group: "Technical",
  },
  fields: [
    {
      type: "array",
      name: "files",
      fields: [
        {
          type: "select",
          name: "language",
          options: languagesOptions,
          required: true,
        },
        {
          type: "text",
          name: "fileName",
          required: true,
        },
        {
          type: "textarea",
          name: "code",
          required: true,
        },
      ],
      required: true,
    },
  ],
};
