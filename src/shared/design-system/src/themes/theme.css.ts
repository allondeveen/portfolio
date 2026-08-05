import { createThemeContract } from "@vanilla-extract/css";

export const vars = createThemeContract({
  colors: {
    background: null,
    backgroundElevated: null,
    backgroundOverlay: null,
    border: null,
    textPrimary: null,
    textSecondary: null,
    textDisabled: null,
    primary: null,
  },
});
