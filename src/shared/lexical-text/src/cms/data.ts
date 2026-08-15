import * as z from "zod";

export type LexicalNode = {
  children?: LexicalNode[];
  fields?: Record<string, unknown>;
  format?: number | string;
  style?: string;
  text?: string;
  type?: string;
};

export const LexicalNodeSchema: z.ZodType<LexicalNode> = z.lazy(() =>
  z.object({
    children: z.array(LexicalNodeSchema).optional(),
    fields: z.record(z.string(), z.unknown()).optional(),
    format: z.union([z.number(), z.string()]).optional(),
    style: z.string().optional(),
    text: z.string().optional(),
    type: z.string().optional(),
  }),
);

export const LexicalEditorStateSchema = z.object({
  root: z.object({
    children: z.array(LexicalNodeSchema),
  }),
});

export type LexicalEditorState = z.infer<typeof LexicalEditorStateSchema>;
