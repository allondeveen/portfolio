import * as z from "zod";

export declare const BlockSchema: z.ZodDiscriminatedUnion<
  [
    z.ZodObject<
      {
        id: z.ZodString;
        kind: z.ZodLiteral<"heading">;
        size: z.ZodNumber;
        text: z.ZodObject<
          {
            kind: z.ZodLiteral<"lexicalText">;
            paragraphs: z.ZodArray<
              z.ZodObject<
                {
                  kind: z.ZodLiteral<"paragraph">;
                  elements: z.ZodArray<
                    z.ZodDiscriminatedUnion<
                      [
                        z.ZodObject<
                          {
                            kind: z.ZodLiteral<"text">;
                            text: z.ZodString;
                            formats: z.ZodArray<
                              z.ZodEnum<{
                                bold: "bold";
                                italic: "italic";
                                strikethrough: "strikethrough";
                                underline: "underline";
                                code: "code";
                                subscript: "subscript";
                                superscript: "superscript";
                                highlight: "highlight";
                              }>
                            >;
                            style: z.ZodOptional<z.ZodString>;
                            link: z.ZodOptional<
                              z.ZodObject<
                                {
                                  type: z.ZodEnum<{
                                    custom: "custom";
                                    internal: "internal";
                                  }>;
                                  url: z.ZodOptional<z.ZodString>;
                                  newTab: z.ZodOptional<z.ZodBoolean>;
                                },
                                z.core.$strip
                              >
                            >;
                          },
                          z.core.$strip
                        >,
                        z.ZodObject<
                          {
                            kind: z.ZodLiteral<"linebreak">;
                          },
                          z.core.$strip
                        >,
                      ],
                      "kind"
                    >
                  >;
                },
                z.core.$strip
              >
            >;
          },
          z.core.$strip
        >;
        variant: z.ZodUnion<
          [z.ZodUnion<[z.ZodLiteral<"default">, z.ZodLiteral<"muted">]>, z.ZodLiteral<"primary">]
        >;
      },
      z.core.$strip
    >,
    z.ZodObject<
      {
        id: z.ZodString;
        kind: z.ZodLiteral<"richText">;
        text: z.ZodObject<
          {
            kind: z.ZodLiteral<"lexicalText">;
            paragraphs: z.ZodArray<
              z.ZodObject<
                {
                  kind: z.ZodLiteral<"paragraph">;
                  elements: z.ZodArray<
                    z.ZodDiscriminatedUnion<
                      [
                        z.ZodObject<
                          {
                            kind: z.ZodLiteral<"text">;
                            text: z.ZodString;
                            formats: z.ZodArray<
                              z.ZodEnum<{
                                bold: "bold";
                                italic: "italic";
                                strikethrough: "strikethrough";
                                underline: "underline";
                                code: "code";
                                subscript: "subscript";
                                superscript: "superscript";
                                highlight: "highlight";
                              }>
                            >;
                            style: z.ZodOptional<z.ZodString>;
                            link: z.ZodOptional<
                              z.ZodObject<
                                {
                                  type: z.ZodEnum<{
                                    custom: "custom";
                                    internal: "internal";
                                  }>;
                                  url: z.ZodOptional<z.ZodString>;
                                  newTab: z.ZodOptional<z.ZodBoolean>;
                                },
                                z.core.$strip
                              >
                            >;
                          },
                          z.core.$strip
                        >,
                        z.ZodObject<
                          {
                            kind: z.ZodLiteral<"linebreak">;
                          },
                          z.core.$strip
                        >,
                      ],
                      "kind"
                    >
                  >;
                },
                z.core.$strip
              >
            >;
          },
          z.core.$strip
        >;
      },
      z.core.$strip
    >,
    z.ZodObject<
      {
        id: z.ZodString;
        kind: z.ZodLiteral<"hero">;
        blocks: z.ZodArray<
          z.ZodDiscriminatedUnion<
            [
              z.ZodObject<
                {
                  id: z.ZodString;
                  kind: z.ZodLiteral<"heading">;
                  size: z.ZodNumber;
                  text: z.ZodObject<
                    {
                      kind: z.ZodLiteral<"lexicalText">;
                      paragraphs: z.ZodArray<
                        z.ZodObject<
                          {
                            kind: z.ZodLiteral<"paragraph">;
                            elements: z.ZodArray<
                              z.ZodDiscriminatedUnion<
                                [
                                  z.ZodObject<
                                    {
                                      kind: z.ZodLiteral<"text">;
                                      text: z.ZodString;
                                      formats: z.ZodArray<
                                        z.ZodEnum<{
                                          bold: "bold";
                                          italic: "italic";
                                          strikethrough: "strikethrough";
                                          underline: "underline";
                                          code: "code";
                                          subscript: "subscript";
                                          superscript: "superscript";
                                          highlight: "highlight";
                                        }>
                                      >;
                                      style: z.ZodOptional<z.ZodString>;
                                      link: z.ZodOptional<
                                        z.ZodObject<
                                          {
                                            type: z.ZodEnum<{
                                              custom: "custom";
                                              internal: "internal";
                                            }>;
                                            url: z.ZodOptional<z.ZodString>;
                                            newTab: z.ZodOptional<z.ZodBoolean>;
                                          },
                                          z.core.$strip
                                        >
                                      >;
                                    },
                                    z.core.$strip
                                  >,
                                  z.ZodObject<
                                    {
                                      kind: z.ZodLiteral<"linebreak">;
                                    },
                                    z.core.$strip
                                  >,
                                ],
                                "kind"
                              >
                            >;
                          },
                          z.core.$strip
                        >
                      >;
                    },
                    z.core.$strip
                  >;
                  variant: z.ZodUnion<
                    [
                      z.ZodUnion<[z.ZodLiteral<"default">, z.ZodLiteral<"muted">]>,
                      z.ZodLiteral<"primary">,
                    ]
                  >;
                },
                z.core.$strip
              >,
              z.ZodObject<
                {
                  id: z.ZodString;
                  kind: z.ZodLiteral<"richText">;
                  text: z.ZodObject<
                    {
                      kind: z.ZodLiteral<"lexicalText">;
                      paragraphs: z.ZodArray<
                        z.ZodObject<
                          {
                            kind: z.ZodLiteral<"paragraph">;
                            elements: z.ZodArray<
                              z.ZodDiscriminatedUnion<
                                [
                                  z.ZodObject<
                                    {
                                      kind: z.ZodLiteral<"text">;
                                      text: z.ZodString;
                                      formats: z.ZodArray<
                                        z.ZodEnum<{
                                          bold: "bold";
                                          italic: "italic";
                                          strikethrough: "strikethrough";
                                          underline: "underline";
                                          code: "code";
                                          subscript: "subscript";
                                          superscript: "superscript";
                                          highlight: "highlight";
                                        }>
                                      >;
                                      style: z.ZodOptional<z.ZodString>;
                                      link: z.ZodOptional<
                                        z.ZodObject<
                                          {
                                            type: z.ZodEnum<{
                                              custom: "custom";
                                              internal: "internal";
                                            }>;
                                            url: z.ZodOptional<z.ZodString>;
                                            newTab: z.ZodOptional<z.ZodBoolean>;
                                          },
                                          z.core.$strip
                                        >
                                      >;
                                    },
                                    z.core.$strip
                                  >,
                                  z.ZodObject<
                                    {
                                      kind: z.ZodLiteral<"linebreak">;
                                    },
                                    z.core.$strip
                                  >,
                                ],
                                "kind"
                              >
                            >;
                          },
                          z.core.$strip
                        >
                      >;
                    },
                    z.core.$strip
                  >;
                },
                z.core.$strip
              >,
            ],
            "kind"
          >
        >;
      },
      z.core.$strip
    >,
    z.ZodObject<
      {
        id: z.ZodString;
        kind: z.ZodLiteral<"grid-item">;
        size: z.ZodNumber;
        blocks: z.ZodArray<
          z.ZodDiscriminatedUnion<
            [
              z.ZodObject<
                {
                  id: z.ZodString;
                  kind: z.ZodLiteral<"heading">;
                  size: z.ZodNumber;
                  text: z.ZodObject<
                    {
                      kind: z.ZodLiteral<"lexicalText">;
                      paragraphs: z.ZodArray<
                        z.ZodObject<
                          {
                            kind: z.ZodLiteral<"paragraph">;
                            elements: z.ZodArray<
                              z.ZodDiscriminatedUnion<
                                [
                                  z.ZodObject<
                                    {
                                      kind: z.ZodLiteral<"text">;
                                      text: z.ZodString;
                                      formats: z.ZodArray<
                                        z.ZodEnum<{
                                          bold: "bold";
                                          italic: "italic";
                                          strikethrough: "strikethrough";
                                          underline: "underline";
                                          code: "code";
                                          subscript: "subscript";
                                          superscript: "superscript";
                                          highlight: "highlight";
                                        }>
                                      >;
                                      style: z.ZodOptional<z.ZodString>;
                                      link: z.ZodOptional<
                                        z.ZodObject<
                                          {
                                            type: z.ZodEnum<{
                                              custom: "custom";
                                              internal: "internal";
                                            }>;
                                            url: z.ZodOptional<z.ZodString>;
                                            newTab: z.ZodOptional<z.ZodBoolean>;
                                          },
                                          z.core.$strip
                                        >
                                      >;
                                    },
                                    z.core.$strip
                                  >,
                                  z.ZodObject<
                                    {
                                      kind: z.ZodLiteral<"linebreak">;
                                    },
                                    z.core.$strip
                                  >,
                                ],
                                "kind"
                              >
                            >;
                          },
                          z.core.$strip
                        >
                      >;
                    },
                    z.core.$strip
                  >;
                  variant: z.ZodUnion<
                    [
                      z.ZodUnion<[z.ZodLiteral<"default">, z.ZodLiteral<"muted">]>,
                      z.ZodLiteral<"primary">,
                    ]
                  >;
                },
                z.core.$strip
              >,
              z.ZodObject<
                {
                  id: z.ZodString;
                  kind: z.ZodLiteral<"richText">;
                  text: z.ZodObject<
                    {
                      kind: z.ZodLiteral<"lexicalText">;
                      paragraphs: z.ZodArray<
                        z.ZodObject<
                          {
                            kind: z.ZodLiteral<"paragraph">;
                            elements: z.ZodArray<
                              z.ZodDiscriminatedUnion<
                                [
                                  z.ZodObject<
                                    {
                                      kind: z.ZodLiteral<"text">;
                                      text: z.ZodString;
                                      formats: z.ZodArray<
                                        z.ZodEnum<{
                                          bold: "bold";
                                          italic: "italic";
                                          strikethrough: "strikethrough";
                                          underline: "underline";
                                          code: "code";
                                          subscript: "subscript";
                                          superscript: "superscript";
                                          highlight: "highlight";
                                        }>
                                      >;
                                      style: z.ZodOptional<z.ZodString>;
                                      link: z.ZodOptional<
                                        z.ZodObject<
                                          {
                                            type: z.ZodEnum<{
                                              custom: "custom";
                                              internal: "internal";
                                            }>;
                                            url: z.ZodOptional<z.ZodString>;
                                            newTab: z.ZodOptional<z.ZodBoolean>;
                                          },
                                          z.core.$strip
                                        >
                                      >;
                                    },
                                    z.core.$strip
                                  >,
                                  z.ZodObject<
                                    {
                                      kind: z.ZodLiteral<"linebreak">;
                                    },
                                    z.core.$strip
                                  >,
                                ],
                                "kind"
                              >
                            >;
                          },
                          z.core.$strip
                        >
                      >;
                    },
                    z.core.$strip
                  >;
                },
                z.core.$strip
              >,
              z.ZodObject<
                {
                  id: z.ZodString;
                  kind: z.ZodLiteral<"stack">;
                  blocks: z.ZodArray<
                    z.ZodDiscriminatedUnion<
                      [
                        z.ZodObject<
                          {
                            id: z.ZodString;
                            kind: z.ZodLiteral<"heading">;
                            size: z.ZodNumber;
                            text: z.ZodObject<
                              {
                                kind: z.ZodLiteral<"lexicalText">;
                                paragraphs: z.ZodArray<
                                  z.ZodObject<
                                    {
                                      kind: z.ZodLiteral<"paragraph">;
                                      elements: z.ZodArray<
                                        z.ZodDiscriminatedUnion<
                                          [
                                            z.ZodObject<
                                              {
                                                kind: z.ZodLiteral<"text">;
                                                text: z.ZodString;
                                                formats: z.ZodArray<
                                                  z.ZodEnum<{
                                                    bold: "bold";
                                                    italic: "italic";
                                                    strikethrough: "strikethrough";
                                                    underline: "underline";
                                                    code: "code";
                                                    subscript: "subscript";
                                                    superscript: "superscript";
                                                    highlight: "highlight";
                                                  }>
                                                >;
                                                style: z.ZodOptional<z.ZodString>;
                                                link: z.ZodOptional<
                                                  z.ZodObject<
                                                    {
                                                      type: z.ZodEnum<{
                                                        custom: "custom";
                                                        internal: "internal";
                                                      }>;
                                                      url: z.ZodOptional<z.ZodString>;
                                                      newTab: z.ZodOptional<z.ZodBoolean>;
                                                    },
                                                    z.core.$strip
                                                  >
                                                >;
                                              },
                                              z.core.$strip
                                            >,
                                            z.ZodObject<
                                              {
                                                kind: z.ZodLiteral<"linebreak">;
                                              },
                                              z.core.$strip
                                            >,
                                          ],
                                          "kind"
                                        >
                                      >;
                                    },
                                    z.core.$strip
                                  >
                                >;
                              },
                              z.core.$strip
                            >;
                            variant: z.ZodUnion<
                              [
                                z.ZodUnion<[z.ZodLiteral<"default">, z.ZodLiteral<"muted">]>,
                                z.ZodLiteral<"primary">,
                              ]
                            >;
                          },
                          z.core.$strip
                        >,
                        z.ZodObject<
                          {
                            id: z.ZodString;
                            kind: z.ZodLiteral<"richText">;
                            text: z.ZodObject<
                              {
                                kind: z.ZodLiteral<"lexicalText">;
                                paragraphs: z.ZodArray<
                                  z.ZodObject<
                                    {
                                      kind: z.ZodLiteral<"paragraph">;
                                      elements: z.ZodArray<
                                        z.ZodDiscriminatedUnion<
                                          [
                                            z.ZodObject<
                                              {
                                                kind: z.ZodLiteral<"text">;
                                                text: z.ZodString;
                                                formats: z.ZodArray<
                                                  z.ZodEnum<{
                                                    bold: "bold";
                                                    italic: "italic";
                                                    strikethrough: "strikethrough";
                                                    underline: "underline";
                                                    code: "code";
                                                    subscript: "subscript";
                                                    superscript: "superscript";
                                                    highlight: "highlight";
                                                  }>
                                                >;
                                                style: z.ZodOptional<z.ZodString>;
                                                link: z.ZodOptional<
                                                  z.ZodObject<
                                                    {
                                                      type: z.ZodEnum<{
                                                        custom: "custom";
                                                        internal: "internal";
                                                      }>;
                                                      url: z.ZodOptional<z.ZodString>;
                                                      newTab: z.ZodOptional<z.ZodBoolean>;
                                                    },
                                                    z.core.$strip
                                                  >
                                                >;
                                              },
                                              z.core.$strip
                                            >,
                                            z.ZodObject<
                                              {
                                                kind: z.ZodLiteral<"linebreak">;
                                              },
                                              z.core.$strip
                                            >,
                                          ],
                                          "kind"
                                        >
                                      >;
                                    },
                                    z.core.$strip
                                  >
                                >;
                              },
                              z.core.$strip
                            >;
                          },
                          z.core.$strip
                        >,
                      ],
                      "kind"
                    >
                  >;
                },
                z.core.$strip
              >,
              z.ZodObject<
                {
                  location: z.ZodString;
                  items: z.ZodArray<
                    z.ZodObject<
                      {
                        label: z.ZodString;
                        icon: z.ZodOptional<
                          z.ZodUnion<z.ZodLiteral<import("@allondeveen-portfolio/ui").IconName>[]>
                        >;
                        externality: z.ZodUnion<
                          [z.ZodLiteral<"external">, z.ZodLiteral<"internal">]
                        >;
                        location: z.ZodString;
                        order: z.ZodNumber;
                      },
                      z.core.$strip
                    >
                  >;
                  id: z.ZodString;
                  kind: z.ZodLiteral<"menu">;
                },
                z.core.$strip
              >,
              z.ZodObject<
                {
                  id: z.ZodString;
                  kind: z.ZodLiteral<"siteTitle">;
                  siteTitle: z.ZodString;
                  withLink: z.ZodBoolean;
                },
                z.core.$strip
              >,
            ],
            "kind"
          >
        >;
      },
      z.core.$strip
    >,
    z.ZodObject<
      {
        id: z.ZodString;
        kind: z.ZodLiteral<"grid">;
        verticalAlign: z.ZodBoolean;
        blocks: z.ZodArray<
          z.ZodObject<
            {
              id: z.ZodString;
              kind: z.ZodLiteral<"grid-item">;
              size: z.ZodNumber;
              blocks: z.ZodArray<
                z.ZodDiscriminatedUnion<
                  [
                    z.ZodObject<
                      {
                        id: z.ZodString;
                        kind: z.ZodLiteral<"heading">;
                        size: z.ZodNumber;
                        text: z.ZodObject<
                          {
                            kind: z.ZodLiteral<"lexicalText">;
                            paragraphs: z.ZodArray<
                              z.ZodObject<
                                {
                                  kind: z.ZodLiteral<"paragraph">;
                                  elements: z.ZodArray<
                                    z.ZodDiscriminatedUnion<
                                      [
                                        z.ZodObject<
                                          {
                                            kind: z.ZodLiteral<"text">;
                                            text: z.ZodString;
                                            formats: z.ZodArray<
                                              z.ZodEnum<{
                                                bold: "bold";
                                                italic: "italic";
                                                strikethrough: "strikethrough";
                                                underline: "underline";
                                                code: "code";
                                                subscript: "subscript";
                                                superscript: "superscript";
                                                highlight: "highlight";
                                              }>
                                            >;
                                            style: z.ZodOptional<z.ZodString>;
                                            link: z.ZodOptional<
                                              z.ZodObject<
                                                {
                                                  type: z.ZodEnum<{
                                                    custom: "custom";
                                                    internal: "internal";
                                                  }>;
                                                  url: z.ZodOptional<z.ZodString>;
                                                  newTab: z.ZodOptional<z.ZodBoolean>;
                                                },
                                                z.core.$strip
                                              >
                                            >;
                                          },
                                          z.core.$strip
                                        >,
                                        z.ZodObject<
                                          {
                                            kind: z.ZodLiteral<"linebreak">;
                                          },
                                          z.core.$strip
                                        >,
                                      ],
                                      "kind"
                                    >
                                  >;
                                },
                                z.core.$strip
                              >
                            >;
                          },
                          z.core.$strip
                        >;
                        variant: z.ZodUnion<
                          [
                            z.ZodUnion<[z.ZodLiteral<"default">, z.ZodLiteral<"muted">]>,
                            z.ZodLiteral<"primary">,
                          ]
                        >;
                      },
                      z.core.$strip
                    >,
                    z.ZodObject<
                      {
                        id: z.ZodString;
                        kind: z.ZodLiteral<"richText">;
                        text: z.ZodObject<
                          {
                            kind: z.ZodLiteral<"lexicalText">;
                            paragraphs: z.ZodArray<
                              z.ZodObject<
                                {
                                  kind: z.ZodLiteral<"paragraph">;
                                  elements: z.ZodArray<
                                    z.ZodDiscriminatedUnion<
                                      [
                                        z.ZodObject<
                                          {
                                            kind: z.ZodLiteral<"text">;
                                            text: z.ZodString;
                                            formats: z.ZodArray<
                                              z.ZodEnum<{
                                                bold: "bold";
                                                italic: "italic";
                                                strikethrough: "strikethrough";
                                                underline: "underline";
                                                code: "code";
                                                subscript: "subscript";
                                                superscript: "superscript";
                                                highlight: "highlight";
                                              }>
                                            >;
                                            style: z.ZodOptional<z.ZodString>;
                                            link: z.ZodOptional<
                                              z.ZodObject<
                                                {
                                                  type: z.ZodEnum<{
                                                    custom: "custom";
                                                    internal: "internal";
                                                  }>;
                                                  url: z.ZodOptional<z.ZodString>;
                                                  newTab: z.ZodOptional<z.ZodBoolean>;
                                                },
                                                z.core.$strip
                                              >
                                            >;
                                          },
                                          z.core.$strip
                                        >,
                                        z.ZodObject<
                                          {
                                            kind: z.ZodLiteral<"linebreak">;
                                          },
                                          z.core.$strip
                                        >,
                                      ],
                                      "kind"
                                    >
                                  >;
                                },
                                z.core.$strip
                              >
                            >;
                          },
                          z.core.$strip
                        >;
                      },
                      z.core.$strip
                    >,
                    z.ZodObject<
                      {
                        id: z.ZodString;
                        kind: z.ZodLiteral<"stack">;
                        blocks: z.ZodArray<
                          z.ZodDiscriminatedUnion<
                            [
                              z.ZodObject<
                                {
                                  id: z.ZodString;
                                  kind: z.ZodLiteral<"heading">;
                                  size: z.ZodNumber;
                                  text: z.ZodObject<
                                    {
                                      kind: z.ZodLiteral<"lexicalText">;
                                      paragraphs: z.ZodArray<
                                        z.ZodObject<
                                          {
                                            kind: z.ZodLiteral<"paragraph">;
                                            elements: z.ZodArray<
                                              z.ZodDiscriminatedUnion<
                                                [
                                                  z.ZodObject<
                                                    {
                                                      kind: z.ZodLiteral<"text">;
                                                      text: z.ZodString;
                                                      formats: z.ZodArray<
                                                        z.ZodEnum<{
                                                          bold: "bold";
                                                          italic: "italic";
                                                          strikethrough: "strikethrough";
                                                          underline: "underline";
                                                          code: "code";
                                                          subscript: "subscript";
                                                          superscript: "superscript";
                                                          highlight: "highlight";
                                                        }>
                                                      >;
                                                      style: z.ZodOptional<z.ZodString>;
                                                      link: z.ZodOptional<
                                                        z.ZodObject<
                                                          {
                                                            type: z.ZodEnum<{
                                                              custom: "custom";
                                                              internal: "internal";
                                                            }>;
                                                            url: z.ZodOptional<z.ZodString>;
                                                            newTab: z.ZodOptional<z.ZodBoolean>;
                                                          },
                                                          z.core.$strip
                                                        >
                                                      >;
                                                    },
                                                    z.core.$strip
                                                  >,
                                                  z.ZodObject<
                                                    {
                                                      kind: z.ZodLiteral<"linebreak">;
                                                    },
                                                    z.core.$strip
                                                  >,
                                                ],
                                                "kind"
                                              >
                                            >;
                                          },
                                          z.core.$strip
                                        >
                                      >;
                                    },
                                    z.core.$strip
                                  >;
                                  variant: z.ZodUnion<
                                    [
                                      z.ZodUnion<[z.ZodLiteral<"default">, z.ZodLiteral<"muted">]>,
                                      z.ZodLiteral<"primary">,
                                    ]
                                  >;
                                },
                                z.core.$strip
                              >,
                              z.ZodObject<
                                {
                                  id: z.ZodString;
                                  kind: z.ZodLiteral<"richText">;
                                  text: z.ZodObject<
                                    {
                                      kind: z.ZodLiteral<"lexicalText">;
                                      paragraphs: z.ZodArray<
                                        z.ZodObject<
                                          {
                                            kind: z.ZodLiteral<"paragraph">;
                                            elements: z.ZodArray<
                                              z.ZodDiscriminatedUnion<
                                                [
                                                  z.ZodObject<
                                                    {
                                                      kind: z.ZodLiteral<"text">;
                                                      text: z.ZodString;
                                                      formats: z.ZodArray<
                                                        z.ZodEnum<{
                                                          bold: "bold";
                                                          italic: "italic";
                                                          strikethrough: "strikethrough";
                                                          underline: "underline";
                                                          code: "code";
                                                          subscript: "subscript";
                                                          superscript: "superscript";
                                                          highlight: "highlight";
                                                        }>
                                                      >;
                                                      style: z.ZodOptional<z.ZodString>;
                                                      link: z.ZodOptional<
                                                        z.ZodObject<
                                                          {
                                                            type: z.ZodEnum<{
                                                              custom: "custom";
                                                              internal: "internal";
                                                            }>;
                                                            url: z.ZodOptional<z.ZodString>;
                                                            newTab: z.ZodOptional<z.ZodBoolean>;
                                                          },
                                                          z.core.$strip
                                                        >
                                                      >;
                                                    },
                                                    z.core.$strip
                                                  >,
                                                  z.ZodObject<
                                                    {
                                                      kind: z.ZodLiteral<"linebreak">;
                                                    },
                                                    z.core.$strip
                                                  >,
                                                ],
                                                "kind"
                                              >
                                            >;
                                          },
                                          z.core.$strip
                                        >
                                      >;
                                    },
                                    z.core.$strip
                                  >;
                                },
                                z.core.$strip
                              >,
                            ],
                            "kind"
                          >
                        >;
                      },
                      z.core.$strip
                    >,
                    z.ZodObject<
                      {
                        location: z.ZodString;
                        items: z.ZodArray<
                          z.ZodObject<
                            {
                              label: z.ZodString;
                              icon: z.ZodOptional<
                                z.ZodUnion<
                                  z.ZodLiteral<import("@allondeveen-portfolio/ui").IconName>[]
                                >
                              >;
                              externality: z.ZodUnion<
                                [z.ZodLiteral<"external">, z.ZodLiteral<"internal">]
                              >;
                              location: z.ZodString;
                              order: z.ZodNumber;
                            },
                            z.core.$strip
                          >
                        >;
                        id: z.ZodString;
                        kind: z.ZodLiteral<"menu">;
                      },
                      z.core.$strip
                    >,
                    z.ZodObject<
                      {
                        id: z.ZodString;
                        kind: z.ZodLiteral<"siteTitle">;
                        siteTitle: z.ZodString;
                        withLink: z.ZodBoolean;
                      },
                      z.core.$strip
                    >,
                  ],
                  "kind"
                >
              >;
            },
            z.core.$strip
          >
        >;
      },
      z.core.$strip
    >,
    z.ZodObject<
      {
        id: z.ZodString;
        kind: z.ZodLiteral<"stack">;
        blocks: z.ZodArray<
          z.ZodDiscriminatedUnion<
            [
              z.ZodObject<
                {
                  id: z.ZodString;
                  kind: z.ZodLiteral<"heading">;
                  size: z.ZodNumber;
                  text: z.ZodObject<
                    {
                      kind: z.ZodLiteral<"lexicalText">;
                      paragraphs: z.ZodArray<
                        z.ZodObject<
                          {
                            kind: z.ZodLiteral<"paragraph">;
                            elements: z.ZodArray<
                              z.ZodDiscriminatedUnion<
                                [
                                  z.ZodObject<
                                    {
                                      kind: z.ZodLiteral<"text">;
                                      text: z.ZodString;
                                      formats: z.ZodArray<
                                        z.ZodEnum<{
                                          bold: "bold";
                                          italic: "italic";
                                          strikethrough: "strikethrough";
                                          underline: "underline";
                                          code: "code";
                                          subscript: "subscript";
                                          superscript: "superscript";
                                          highlight: "highlight";
                                        }>
                                      >;
                                      style: z.ZodOptional<z.ZodString>;
                                      link: z.ZodOptional<
                                        z.ZodObject<
                                          {
                                            type: z.ZodEnum<{
                                              custom: "custom";
                                              internal: "internal";
                                            }>;
                                            url: z.ZodOptional<z.ZodString>;
                                            newTab: z.ZodOptional<z.ZodBoolean>;
                                          },
                                          z.core.$strip
                                        >
                                      >;
                                    },
                                    z.core.$strip
                                  >,
                                  z.ZodObject<
                                    {
                                      kind: z.ZodLiteral<"linebreak">;
                                    },
                                    z.core.$strip
                                  >,
                                ],
                                "kind"
                              >
                            >;
                          },
                          z.core.$strip
                        >
                      >;
                    },
                    z.core.$strip
                  >;
                  variant: z.ZodUnion<
                    [
                      z.ZodUnion<[z.ZodLiteral<"default">, z.ZodLiteral<"muted">]>,
                      z.ZodLiteral<"primary">,
                    ]
                  >;
                },
                z.core.$strip
              >,
              z.ZodObject<
                {
                  id: z.ZodString;
                  kind: z.ZodLiteral<"richText">;
                  text: z.ZodObject<
                    {
                      kind: z.ZodLiteral<"lexicalText">;
                      paragraphs: z.ZodArray<
                        z.ZodObject<
                          {
                            kind: z.ZodLiteral<"paragraph">;
                            elements: z.ZodArray<
                              z.ZodDiscriminatedUnion<
                                [
                                  z.ZodObject<
                                    {
                                      kind: z.ZodLiteral<"text">;
                                      text: z.ZodString;
                                      formats: z.ZodArray<
                                        z.ZodEnum<{
                                          bold: "bold";
                                          italic: "italic";
                                          strikethrough: "strikethrough";
                                          underline: "underline";
                                          code: "code";
                                          subscript: "subscript";
                                          superscript: "superscript";
                                          highlight: "highlight";
                                        }>
                                      >;
                                      style: z.ZodOptional<z.ZodString>;
                                      link: z.ZodOptional<
                                        z.ZodObject<
                                          {
                                            type: z.ZodEnum<{
                                              custom: "custom";
                                              internal: "internal";
                                            }>;
                                            url: z.ZodOptional<z.ZodString>;
                                            newTab: z.ZodOptional<z.ZodBoolean>;
                                          },
                                          z.core.$strip
                                        >
                                      >;
                                    },
                                    z.core.$strip
                                  >,
                                  z.ZodObject<
                                    {
                                      kind: z.ZodLiteral<"linebreak">;
                                    },
                                    z.core.$strip
                                  >,
                                ],
                                "kind"
                              >
                            >;
                          },
                          z.core.$strip
                        >
                      >;
                    },
                    z.core.$strip
                  >;
                },
                z.core.$strip
              >,
            ],
            "kind"
          >
        >;
      },
      z.core.$strip
    >,
    z.ZodObject<
      {
        location: z.ZodString;
        items: z.ZodArray<
          z.ZodObject<
            {
              label: z.ZodString;
              icon: z.ZodOptional<
                z.ZodUnion<z.ZodLiteral<import("@allondeveen-portfolio/ui").IconName>[]>
              >;
              externality: z.ZodUnion<[z.ZodLiteral<"external">, z.ZodLiteral<"internal">]>;
              location: z.ZodString;
              order: z.ZodNumber;
            },
            z.core.$strip
          >
        >;
        id: z.ZodString;
        kind: z.ZodLiteral<"menu">;
      },
      z.core.$strip
    >,
    z.ZodObject<
      {
        id: z.ZodString;
        kind: z.ZodLiteral<"image">;
        image: z.ZodOptional<
          z.ZodObject<
            {
              id: z.ZodString;
              name: z.ZodString;
              alt: z.ZodString;
              caption: z.ZodOptional<z.ZodString>;
              credits: z.ZodOptional<z.ZodString>;
              url: z.ZodString;
              width: z.ZodNumber;
              height: z.ZodNumber;
              sizes: z.ZodArray<
                z.ZodObject<
                  {
                    url: z.ZodString;
                    width: z.ZodNumber;
                    height: z.ZodNumber;
                  },
                  z.core.$strip
                >
              >;
            },
            z.core.$strip
          >
        >;
      },
      z.core.$strip
    >,
    z.ZodObject<
      {
        id: z.ZodString;
        kind: z.ZodLiteral<"siteTitle">;
        siteTitle: z.ZodString;
        withLink: z.ZodBoolean;
      },
      z.core.$strip
    >,
  ],
  "kind"
>;
export type Block = z.infer<typeof BlockSchema>;
//# sourceMappingURL=data.d.ts.map
