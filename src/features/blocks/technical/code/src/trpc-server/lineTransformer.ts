import type { ShikiTransformer } from "shiki";

export const lineStructureTransformer: ShikiTransformer = {
  name: "portfolio:line-structure",

  line(node, line) {
    node.children = [
      {
        type: "element",
        tagName: "span",
        properties: {
          class: "line-number",
          "aria-hidden": "true",
        },
        children: [
          {
            type: "text",
            value: String(line),
          },
        ],
      },
      {
        type: "element",
        tagName: "span",
        properties: {
          class: "line-content",
        },
        children: node.children,
      },
    ];
  },
};
