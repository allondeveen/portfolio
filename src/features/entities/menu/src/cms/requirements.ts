import { MenuSchema } from "./data";
import { getByLocation } from "./queries/getByLocation";

import type { SetupRequirementResult } from "@allondeveen-portfolio/setup-requirements";
import type { CMSSetupRequirements } from "@allondeveen-portfolio/setup-requirements/cms";
import type { PayloadRequest } from "payload";

const checkMenu =
  (location: string, label: string) =>
  async (req: PayloadRequest): Promise<SetupRequirementResult> => {
    try {
      const menuResults = await getByLocation(req.payload, location);
      const menu = menuResults.docs.at(0);
      const menuParseResult = MenuSchema.safeParse(menu);
      if (menuParseResult.success) {
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

export const menuRequirements: CMSSetupRequirements = {
  label: "Menus",
  requirements: [
    {
      label: "Main menu",
      instruction: "Setup the main menu",
      check: checkMenu("main", "Main menu"),
    },
    {
      label: "Maintenance menu",
      instruction: "Setup the maintenance menu",
      check: checkMenu("maintenance", "Maintenance menu"),
    },
  ],
};
