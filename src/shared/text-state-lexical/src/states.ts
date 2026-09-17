export const textStates = {
  highlight: {
    label: "Highlight",
    className: "text-highlight",
    css: {
      "background-color": "var(--text-highlight-background, #ffe066)",
      color: "var(--text-highlight-color, #171717)",
    },
  },
} as const;

export type TextState = keyof typeof textStates;

export const allTextStates = Object.keys(textStates) as TextState[];

export function isTextState(value: unknown): value is TextState {
  return typeof value === "string" && Object.hasOwn(textStates, value);
}
