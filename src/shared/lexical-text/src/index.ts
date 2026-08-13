import * as z from "zod";

export type LexicalNode = {
  children?: LexicalNode[];
  text?: string;
  type?: string;
};

export const LexicalNodeSchema: z.ZodType<LexicalNode> = z.lazy(() =>
  z.object({
    children: z.array(LexicalNodeSchema).optional(),
    text: z.string().optional(),
    type: z.string().optional(),
  }),
);

export const LexicalEditorStateSchema = z.object({
  root: z.object({
    children: z.array(LexicalNodeSchema),
  }),
});

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
