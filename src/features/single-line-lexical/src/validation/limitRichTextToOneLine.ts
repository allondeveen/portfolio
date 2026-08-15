import {
  LexicalEditorStateSchema,
  type LexicalNode,
} from "@allondeveen-portfolio/lexical-text/cms";

import type { RichTextFieldValidation } from "payload";

const containsLineBreak = (node: LexicalNode): boolean =>
  node.type === "linebreak" || node.children?.some(containsLineBreak) === true;

export const limitRichTextToOneLine: RichTextFieldValidation = (value) => {
  const result = LexicalEditorStateSchema.safeParse(value);

  if (!result.success) {
    return true;
  }

  const { children } = result.data.root;

  if (children.length > 1 || children.some(containsLineBreak)) {
    return "Rich text must contain only one line.";
  }

  return true;
};
