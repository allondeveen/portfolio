import type { Story as CMSStory } from "../cms";
import type { Story } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";

export const mapStory: Adapter<CMSStory, Story> = async (textsection) => {
  return {
    id: textsection.id,
    kind: textsection.blockType,
    columnDistribution: textsection.columnDistribution ?? "1/1",
    mobileColumnDistribution: textsection.mobileColumnDistribution ?? "1/1",
  };
};
