import type { TextSection as CMSTextSection } from "../cms";
import type { TextSection } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";

export const mapTextSection: Adapter<CMSTextSection, TextSection> = async (textsection) => {
  return {
    id: textsection.id,
    kind: textsection.blockType,
  };
};
