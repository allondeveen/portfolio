import { mapMenu as CMSMapMenu } from "@allondeveen-portfolio/menu/trpc-server";

import type { Menu as CMSMenu } from "../cms/data";
import type { Menu } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";

export const mapMenu: Adapter<CMSMenu, Menu> = async (block, context) => {
  const mappedMenu = await CMSMapMenu(block.menu, context);
  return {
    ...mappedMenu,
    id: block.id,
    kind: block.blockType,
  };
};
