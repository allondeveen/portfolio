import { type LexicalEditorState, type LexicalNode } from "../cms/data";

import type { LexicalText, TextFormat, TextLink, TextParagraph } from "../website/data";

const FORMAT_FLAGS: ReadonlyArray<readonly [number, TextFormat]> = [
  [1, "bold"],
  [2, "italic"],
  [4, "strikethrough"],
  [8, "underline"],
  [16, "code"],
  [32, "subscript"],
  [64, "superscript"],
  [128, "highlight"],
];

const getFormats = (format: LexicalNode["format"]): TextFormat[] => {
  if (typeof format !== "number") {
    return [];
  }

  return FORMAT_FLAGS.filter(([flag]) => (format & flag) !== 0).map(([, name]) => name);
};

const getLink = (node: LexicalNode): TextLink | undefined => {
  if (node.type !== "link" || !node.fields) {
    return undefined;
  }

  const linkType = node.fields.linkType;
  const url = node.fields.url;
  const newTab = node.fields.newTab;
  const doc = node.fields.doc;

  if (linkType !== "internal" && linkType !== "custom") {
    return undefined;
  }

  const link: TextLink = { type: linkType };

  if (typeof url === "string") {
    link.url = url;
  }

  if (typeof newTab === "boolean") {
    link.newTab = newTab;
  }

  if (typeof doc === "object" && doc !== null) {
    const candidate = doc as Record<string, unknown>;

    if (
      typeof candidate.relationTo === "string" &&
      (typeof candidate.value === "string" || typeof candidate.value === "number")
    ) {
      link.reference = {
        collection: candidate.relationTo,
        id: candidate.value,
      };
    }
  }

  return link;
};

const getElements = (node: LexicalNode, inheritedLink?: TextLink): TextParagraph["elements"] => {
  const link = getLink(node) ?? inheritedLink;

  if (node.type === "linebreak") {
    return [{ kind: "linebreak" }];
  }

  if (typeof node.text === "string") {
    return [
      {
        kind: "text",
        text: node.text,
        formats: getFormats(node.format),
        ...(node.style ? { style: node.style } : {}),
        ...(link ? { link } : {}),
      },
    ];
  }

  return node.children?.flatMap((child) => getElements(child, link)) ?? [];
};

export const mapLexicalText = (value: LexicalEditorState): LexicalText => {
  return {
    kind: "lexicalText",
    paragraphs: value.root.children.map((node) => ({
      kind: "paragraph",
      elements: getElements(node),
    })),
  };
};
