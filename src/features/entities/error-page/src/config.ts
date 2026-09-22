import { blocks } from "@allondeveen-portfolio/blocks-property/config";

import type { GlobalConfig } from "payload";

export const errorPage: GlobalConfig = {
  slug: "error-page",
  admin: {
    group: "Fixed template",
  },
  fields: [blocks],
};
