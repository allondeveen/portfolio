import { createTheme } from "@vanilla-extract/css";

import { vars } from "./theme.css";
import { colors } from "../tokens/colors.css";

export const darkTheme = createTheme(vars, {
  colors: {
    background: colors.neutral[0],
    backgroundElevated: colors.neutral[100],
    backgroundOverlay: colors.neutral[200],
    border: colors.neutral[500],
    textPrimary: colors.neutral[900],
    textSecondary: colors.neutral[700],
    textDisabled: colors.neutral[600],
    primary: colors.brand.primary,
  },
});
