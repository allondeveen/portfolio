import { triggerMaintenanceBuild as internalTrigger } from "@allondeveen-portfolio/maintenance-build";

import type { CollectionAfterChangeHook } from "payload";

export const triggerMaintenanceBuild: CollectionAfterChangeHook = async (args) => {
  const { req, doc, previousDoc } = args;
  if (doc?.location === "maintenance" || previousDoc?.location === "maintenance")
    await internalTrigger(req);
};
