import type { Menu as CMSMenu } from "../cms";
import type { Menu } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";

export const mapMenu: Adapter<CMSMenu, Menu> = (menu) => ({
  id: menu.id,
  location: menu.location,
  items: menu.items
    .map((item) => {
      let icon: Menu["items"][number]["icon"];
      if (item.icon !== null) {
        icon = item.icon;
      }
      if (item.externality == "external") {
        return {
          label: item.label,
          icon,
          externality: item.externality,
          location: item.external,
          order: item.order,
        };
      }
      return {
        label: item.label,
        icon,
        externality: item.externality,
        location: item.internal.value.slug,
        order: item.order,
      };
    })
    .sort((item) => item.order),
});
