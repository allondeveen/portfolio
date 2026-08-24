import { type Adapter, type MappingContext } from "@allondeveen-portfolio/adapter/trpc-server";

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

function isDoc(value: unknown): value is { value: { slug: string } } {
  return (
    value !== null &&
    typeof value == "object" &&
    "value" in value &&
    value.value !== null &&
    typeof value.value == "object" &&
    "slug" in value.value
  );
}

const getLink = async (node: LexicalNode): Promise<TextLink | undefined> => {
  if (node.type !== "link" || !node.fields) {
    return undefined;
  }

  const linkType = node.fields.linkType;
  let url = "";
  if (linkType == "internal" && isDoc(node.fields.doc)) {
    url = node.fields?.doc.value.slug;
  } else if (linkType == "custom" && typeof node.fields?.url == "string") {
    url = node.fields?.url;
  }
  const newTab = node.fields.newTab;

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

  return link;
};

const getElements = async (
  node: LexicalNode,
  context: MappingContext,
  inheritedLink?: TextLink,
): Promise<TextParagraph["elements"]> => {
  const link = (await getLink(node)) ?? inheritedLink;

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

  const result = await Promise.all(
    node.children?.map(async (child) => await getElements(child, context, link)) ?? [],
  );
  return result.reduce((prev, cur) => [...prev, ...cur]);
};

export const mapLexicalText: Adapter<LexicalEditorState, LexicalText> = async (value, context) => {
  return {
    kind: "lexicalText",
    paragraphs: await Promise.all(
      value.root.children.map(async (node) => ({
        kind: "paragraph",
        elements: await getElements(node, context),
      })),
    ),
  };
};
