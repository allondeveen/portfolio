export type IconName =
  "linkedin" | "github" | "logo" | "chevron-right" | "arrow-up-right" | "react" | "react-router";

export const allIcons: IconName[] = [
  "linkedin",
  "github",
  "logo",
  "chevron-right",
  "arrow-up-right",
  "react",
  "react-router",
];

export function mapIconsToOptions(icons: IconName[]): { label: string; value: string }[] {
  return icons.map((value) => {
    const name: string = value.replaceAll("-", " ");
    switch (value) {
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
      case "chevron-right":
        return {
          label: "Chevron Right",
          value,
        };
      case "arrow-up-right":
        return {
          label: "Arrow Up Right",
          value,
        };
      case "react-router":
        return {
          label: "React Router",
          value,
        };
      default:
        return {
          label: `${name[0].toUpperCase()}${name.slice(1)}`,
          value,
        };
    }
  });
}
