import { TextStateFeature } from "@payloadcms/richtext-lexical";

import { allTextStates, type TextState, textStates } from "./states";

export function AllowedTextStateFeature(
  getAllowedStates: (allTextState: TextState[]) => readonly TextState[],
): ReturnType<typeof TextStateFeature> {
  const allowedStates = getAllowedStates(allTextStates);
  const styles = Object.fromEntries(
    allowedStates.map((name) => {
      if (!Object.hasOwn(textStates, name)) {
        throw new Error(`Unknown text state: "${name}".`);
      }

      const { label, css } = textStates[name];
      return [name, { label, css }];
    }),
  );

  return TextStateFeature({ state: { textStyle: styles } });
}
