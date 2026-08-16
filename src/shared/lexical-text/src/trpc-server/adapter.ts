import { type Adapter, type MappingContext } from "@allondeveen-portfolio/adapter/trpc-server";
import z from "zod";

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

const getLink = async (
  node: LexicalNode,
  context: MappingContext,
): Promise<TextLink | undefined> => {
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

    if (typeof candidate.relationTo === "string" && typeof candidate.value === "string") {
      const reference = {
        collection: candidate.relationTo,
        id: candidate.value,
      };
      const url = await context.resolvePublic(
        reference,
        z.object({
          slug: z.string(),
        }),
      );
      if (url.status === "resolved") {
        link.url = url.source.slug;
      }
    }
  }

  return link;
};

const getElements = async (
  node: LexicalNode,
  context: MappingContext,
  inheritedLink?: TextLink,
): Promise<TextParagraph["elements"]> => {
  const link = (await getLink(node, context)) ?? inheritedLink;

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
