import { DocumentSchema, findBySlug } from "../cms";

import type { CMSSetupRequirements } from "@allondeveen-portfolio/setup-requirements/cms";

export const publicDocumentsRequirements: CMSSetupRequirements = {
  label: "Public documents",
  requirements: [
    {
      label: "Homepage",
      instruction: "Create a homepage",
      async check(req) {
        try {
          const page = await findBySlug({ payload: req.payload, slug: "/" });
          const pageParseResult = DocumentSchema.safeParse(page);
          if (pageParseResult.success) {
            return {
              status: "complete",
            };
          }
          return {
            status: "incomplete",
            missing: "Homepage",
          };
        } catch (e) {
          return {
            status: "error",
            error: `${e}`,
          };
        }
      },
    },
  ],
};
