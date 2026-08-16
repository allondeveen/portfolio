import type { LexicalFieldAdminProps } from "@payloadcms/richtext-lexical";

export { SingleLinePlugin } from "./plugin";
export { SingleLineFeature } from "./feature.server";
export { limitRichTextToOneLine } from "./validation/limitRichTextToOneLine";

export const singleLineAdminSettings: LexicalFieldAdminProps = {
  hideAddBlockButton: true,
  hideInsertParagraphAtEnd: true,
  hideDraggableBlockElement: true,
  hideGutter: true,
};
