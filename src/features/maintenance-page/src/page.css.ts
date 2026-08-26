import { vars } from "@allondeveen-portfolio/design-system";
import { style } from "@vanilla-extract/css";

export const secondaryBodyText = style({
  color: vars.colors.textSecondary,
});

export const maintenanceLink = style([
  secondaryBodyText,
  {
    ":hover": {
      color: vars.colors.textPrimary,
    },
    ":active": {
      color: vars.colors.textDisabled,
    },
  },
]);

export const maintenanceLinkIcon = style({
  fill: vars.colors.textSecondary,
  transition: "fill 0.2s ease-in-out",
  selectors: {
    "a:hover &": {
      fill: vars.colors.textPrimary,
    },
    "a:active &": {
      fill: vars.colors.textDisabled,
    },
  },
});
