import { validateEmail } from "./cms/hooks/validateEmail";

import type { GlobalConfig } from "payload";

export const siteSettings: GlobalConfig = {
  slug: "site-settings",
  admin: {
    group: "Global",
  },
  fields: [
    {
      name: "siteTitle",
      type: "text",
      required: true,
    },
    {
      name: "supportEmail",
      type: "email",
      required: true,
      hooks: {
        beforeValidate: [validateEmail],
      },
    },
    {
      name: "socialImage",
      type: "relationship",
      relationTo: "media",
      hasMany: false,
      required: true,
    },
  ],
};
