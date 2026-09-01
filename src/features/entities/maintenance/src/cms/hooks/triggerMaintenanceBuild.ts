import { triggerMaintenanceBuild as internalTrigger } from "@allondeveen-portfolio/maintenance-build";

import type { GlobalAfterChangeHook } from "payload";

export const triggerMaintenanceBuild: GlobalAfterChangeHook = async ({ req }) => {
  await internalTrigger(req);
};
