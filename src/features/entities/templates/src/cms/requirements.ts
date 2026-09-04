import { TemplateSchema } from "./data";
import { findByLocation } from "./queries";

import type { SetupRequirementResult } from "@allondeveen-portfolio/setup-requirements";
import type { CMSSetupRequirements } from "@allondeveen-portfolio/setup-requirements/cms";
import type { PayloadRequest } from "payload";

const checkTemplate =
  (location: string, label: string) =>
  async (req: PayloadRequest): Promise<SetupRequirementResult> => {
    try {
      const template = await findByLocation({ location, payload: req.payload });
      const templateParseResult = TemplateSchema.safeParse(template);
      if (templateParseResult.success) {
        return {
          status: "complete",
        };
      }
      return {
        status: "incomplete",
        missing: label,
      };
    } catch (e) {
      return {
        status: "error",
        error: `${e}`,
      };
    }
  };

export const templateRequirements: CMSSetupRequirements = {
  label: "Templates",
  requirements: [
    {
      label: "Header",
      instruction: "Setup header template.",
      check: checkTemplate("header", "Header"),
    },
    {
      label: "Footer",
      instruction: "Setup footer template.",
      check: checkTemplate("footer", "Footer"),
    },
  ],
};
