import { type MaintenanceContent, MaintenanceContentSchema } from "./data";
import { getMaintenance } from "./query/getMaintenance";

import type { SetupRequirementResult } from "@allondeveen-portfolio/setup-requirements";
import type { CMSSetupRequirements } from "@allondeveen-portfolio/setup-requirements/cms";
import type { PayloadRequest } from "payload";

const checkAttribute =
  <Key extends keyof MaintenanceContent>(key: Key, label: string) =>
  async (req: PayloadRequest): Promise<SetupRequirementResult> => {
    try {
      const maintenance = await getMaintenance(req.payload);
      if (key in maintenance) {
        const result = MaintenanceContentSchema.shape[key].safeParse(maintenance[key]);
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

export const maintenanceRequirements: CMSSetupRequirements = {
  label: "Maintenance",
  requirements: [
    {
      label: "Header",
      instruction: "Setup the maintenance page header",
      check: checkAttribute("header", "Header"),
    },
    {
      label: "Blocks",
      instruction: "Setup the maintenance page blocks",
      check: checkAttribute("blocks", "Blocks"),
    },
  ],
};
