import { allIcons } from "@allondeveen-portfolio/ui";

import type { Field } from "payload";

export const icon: Field = {
  name: "icon",
  type: "select",
  options: allIcons.map((name) => {
    const value: string = name;
    switch (name) {
      case "github":
        return {
          label: "GitHub",
          value,
        };
      case "linkedin":
        return {
          label: "LinkedIn",
          value,
        };
      case "logo":
        return {
          label: "Logo",
          value,
        };
      default:
        return {
          label: `${value[0].toUpperCase()}${value.slice(1)}`,
          value: name,
        };
    }
  }),
};
