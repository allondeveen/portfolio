import type { Container as CMSContainer } from "../cms";
import type { Container } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";

export const mapContainer: Adapter<CMSContainer, Container> = async (gridItem) => {
  return {
    id: gridItem.id,
    kind: gridItem.blockType,
  };
};
