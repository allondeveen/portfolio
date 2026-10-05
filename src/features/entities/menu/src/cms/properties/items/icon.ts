import { allIcons, mapIconsToOptions } from "@allondeveen-portfolio/ui/icons/data";

import type { Field } from "payload";

export const icon: Field = {
  name: "icon",
  type: "select",
  options: mapIconsToOptions(allIcons),
};
