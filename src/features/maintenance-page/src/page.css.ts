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
