import { LexicalEditorStateSchema, type LexicalNode } from "./data";

const getNodeText = (node: LexicalNode): string => {
  if (node.type === "linebreak") {
    return "\n";
  }

  return node.text ?? node.children?.map(getNodeText).join("") ?? "";
};

export const getLexicalText = (value: unknown): string | null => {
  const result = LexicalEditorStateSchema.safeParse(value);

  if (!result.success) {
    return null;
  }

  return result.data.root.children.map(getNodeText).join("\n").trim();
};
