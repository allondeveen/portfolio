import type { CallToAction as CMSCallToAction } from "../cms";
import type { CallToAction } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";

export const mapCallToAction: Adapter<CMSCallToAction, CallToAction> = async (callToAction) => {
  return {
    id: callToAction.id,
    kind: callToAction.blockType,
    variant: callToAction.variant,
  };
};
