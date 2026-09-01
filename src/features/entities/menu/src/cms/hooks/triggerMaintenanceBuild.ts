import { triggerMaintenanceBuild as internalTrigger } from "@allondeveen-portfolio/maintenance-build";

import type { CollectionAfterChangeHook } from "payload";

export const triggerMaintenanceBuild: CollectionAfterChangeHook = async (args) => {
  const { req, doc } = args;
  if (doc?.location !== "maintenance") return;
  await internalTrigger(req);
};
