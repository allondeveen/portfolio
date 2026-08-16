import * as z from "zod";

export const TextFormatSchema = z.enum([
  "bold",
  "italic",
  "strikethrough",
  "underline",
  "code",
  "subscript",
  "superscript",
  "highlight",
]);

export type TextFormat = z.infer<typeof TextFormatSchema>;

export const TextLinkSchema = z.object({
  type: z.enum(["internal", "custom"]),
  url: z.string().optional(),
  newTab: z.boolean().optional(),
});

export type TextLink = z.infer<typeof TextLinkSchema>;

export const TextElementSchema = z.object({
  kind: z.literal("text"),
  text: z.string(),
  formats: z.array(TextFormatSchema),
  style: z.string().optional(),
  link: TextLinkSchema.optional(),
});

export const LineBreakElementSchema = z.object({
  kind: z.literal("linebreak"),
});

export const InlineTextElementSchema = z.discriminatedUnion("kind", [
  TextElementSchema,
  LineBreakElementSchema,
]);

export type InlineTextElement = z.infer<typeof InlineTextElementSchema>;

export const TextParagraphSchema = z.object({
  kind: z.literal("paragraph"),
  elements: z.array(InlineTextElementSchema),
});

export type TextParagraph = z.infer<typeof TextParagraphSchema>;

export const LexicalTextSchema = z.object({
  kind: z.literal("lexicalText"),
  paragraphs: z.array(TextParagraphSchema),
});

export type LexicalText = z.infer<typeof LexicalTextSchema>;
