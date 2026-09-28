import type { ButtonGroup as CMSButtonGroup } from "../cms";
import type { ButtonGroup } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";

export const mapButtonGroup: Adapter<CMSButtonGroup, ButtonGroup> = async (gridItem) => {
  return {
    id: gridItem.id,
    kind: gridItem.blockType,
  };
};

type ChildBlock =
  | {
      blockType: "fileDownload";
      style: "link" | "button";
    }
  | {
      blockType: string;
    };

export function buttonGroupChildPredicate(block: ChildBlock) {
  return block.blockType === "fileDownload" && "style" in block
    ? block.style === "button"
    : block.blockType === "button" || block.blockType === "label";
}
