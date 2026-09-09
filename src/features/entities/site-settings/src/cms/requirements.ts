import { type SiteSettings, SiteSettingsSchema } from "./data";
import { getSiteSettingsWithoutParse } from "./queries/getSiteSettings";

import type { SetupRequirementResult } from "@allondeveen-portfolio/setup-requirements";
import type { CMSSetupRequirements } from "@allondeveen-portfolio/setup-requirements/cms";
import type { PayloadRequest } from "payload";

const checkAttribute =
  <Key extends keyof SiteSettings>(key: Key, label: string) =>
  async (req: PayloadRequest): Promise<SetupRequirementResult> => {
    try {
      const siteSettings = await getSiteSettingsWithoutParse(req.payload);
      if (key in siteSettings) {
        const result = SiteSettingsSchema.shape[key].safeParse(siteSettings[key]);
        if (result.success) {
          return {
            status: "complete",
          };
        }
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

export const siteSettingsRequirements: CMSSetupRequirements = {
  label: "Site settings",
  requirements: [
    {
      label: "Site title",
      instruction: "Fill in the site title",
      check: checkAttribute("siteTitle", "Site title"),
    },
    {
      label: "Support email",
      instruction: "Fill in the support email",
      check: checkAttribute("supportEmail", "Support email"),
    },
    {
      label: "Social image",
      instruction: "Upload an image and set it as the social image",
      check: checkAttribute("socialImage", "Social image"),
    },
  ],
};
