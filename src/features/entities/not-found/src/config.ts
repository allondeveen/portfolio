import { blocks } from "@allondeveen-portfolio/blocks-property/config";

import type { GlobalConfig } from "payload";

export const notFound: GlobalConfig = {
  slug: "not-found",
  admin: {
    group: "Fixed template",
  },
  fields: [blocks],
};
