import * as z from "zod";

export declare const BlockSchema: z.ZodDiscriminatedUnion<
  [
    z.ZodObject<
      {
        id: z.ZodString;
        blockType: z.ZodLiteral<"heading">;
        size: z.ZodNumber;
        headingText: z.ZodObject<
          {
            root: z.ZodObject<
              {
                children: z.ZodArray<
                  z.ZodType<
                    import("@allondeveen-portfolio/lexical-text/cms").LexicalNode,
                    unknown,
                    z.core.$ZodTypeInternals<
                      import("@allondeveen-portfolio/lexical-text/cms").LexicalNode,
                      unknown
                    >
                  >
                >;
              },
              z.core.$strip
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
        blockType: z.ZodLiteral<"richText">;
        text: z.ZodObject<
          {
            root: z.ZodObject<
              {
                children: z.ZodArray<
                  z.ZodType<
                    import("@allondeveen-portfolio/lexical-text/cms").LexicalNode,
                    unknown,
                    z.core.$ZodTypeInternals<
                      import("@allondeveen-portfolio/lexical-text/cms").LexicalNode,
                      unknown
                    >
                  >
                >;
              },
              z.core.$strip
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
        blockType: z.ZodLiteral<"hero">;
        blocks: z.ZodArray<
          z.ZodDiscriminatedUnion<
            [
              z.ZodObject<
                {
                  id: z.ZodString;
                  blockType: z.ZodLiteral<"heading">;
                  size: z.ZodNumber;
                  headingText: z.ZodObject<
                    {
                      root: z.ZodObject<
                        {
                          children: z.ZodArray<
                            z.ZodType<
                              import("@allondeveen-portfolio/lexical-text/cms").LexicalNode,
                              unknown,
                              z.core.$ZodTypeInternals<
                                import("@allondeveen-portfolio/lexical-text/cms").LexicalNode,
                                unknown
                              >
                            >
                          >;
                        },
                        z.core.$strip
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
                  blockType: z.ZodLiteral<"richText">;
                  text: z.ZodObject<
                    {
                      root: z.ZodObject<
                        {
                          children: z.ZodArray<
                            z.ZodType<
                              import("@allondeveen-portfolio/lexical-text/cms").LexicalNode,
                              unknown,
                              z.core.$ZodTypeInternals<
                                import("@allondeveen-portfolio/lexical-text/cms").LexicalNode,
                                unknown
                              >
                            >
                          >;
                        },
                        z.core.$strip
                      >;
                    },
                    z.core.$strip
                  >;
                },
                z.core.$strip
              >,
            ],
            "blockType"
          >
        >;
      },
      z.core.$strip
    >,
    z.ZodObject<
      {
        id: z.ZodString;
        blockType: z.ZodLiteral<"grid-item">;
        blocks: z.ZodArray<
          z.ZodDiscriminatedUnion<
            [
              z.ZodObject<
                {
                  id: z.ZodString;
                  blockType: z.ZodLiteral<"heading">;
                  size: z.ZodNumber;
                  headingText: z.ZodObject<
                    {
                      root: z.ZodObject<
                        {
                          children: z.ZodArray<
                            z.ZodType<
                              import("@allondeveen-portfolio/lexical-text/cms").LexicalNode,
                              unknown,
                              z.core.$ZodTypeInternals<
                                import("@allondeveen-portfolio/lexical-text/cms").LexicalNode,
                                unknown
                              >
                            >
                          >;
                        },
                        z.core.$strip
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
                  blockType: z.ZodLiteral<"richText">;
                  text: z.ZodObject<
                    {
                      root: z.ZodObject<
                        {
                          children: z.ZodArray<
                            z.ZodType<
                              import("@allondeveen-portfolio/lexical-text/cms").LexicalNode,
                              unknown,
                              z.core.$ZodTypeInternals<
                                import("@allondeveen-portfolio/lexical-text/cms").LexicalNode,
                                unknown
                              >
                            >
                          >;
                        },
                        z.core.$strip
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
                  blockType: z.ZodLiteral<"stack">;
                  blocks: z.ZodArray<
                    z.ZodDiscriminatedUnion<
                      [
                        z.ZodObject<
                          {
                            id: z.ZodString;
                            blockType: z.ZodLiteral<"heading">;
                            size: z.ZodNumber;
                            headingText: z.ZodObject<
                              {
                                root: z.ZodObject<
                                  {
                                    children: z.ZodArray<
                                      z.ZodType<
                                        import("@allondeveen-portfolio/lexical-text/cms").LexicalNode,
                                        unknown,
                                        z.core.$ZodTypeInternals<
                                          import("@allondeveen-portfolio/lexical-text/cms").LexicalNode,
                                          unknown
                                        >
                                      >
                                    >;
                                  },
                                  z.core.$strip
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
                            blockType: z.ZodLiteral<"richText">;
                            text: z.ZodObject<
                              {
                                root: z.ZodObject<
                                  {
                                    children: z.ZodArray<
                                      z.ZodType<
                                        import("@allondeveen-portfolio/lexical-text/cms").LexicalNode,
                                        unknown,
                                        z.core.$ZodTypeInternals<
                                          import("@allondeveen-portfolio/lexical-text/cms").LexicalNode,
                                          unknown
                                        >
                                      >
                                    >;
                                  },
                                  z.core.$strip
                                >;
                              },
                              z.core.$strip
                            >;
                          },
                          z.core.$strip
                        >,
                      ],
                      "blockType"
                    >
                  >;
                },
                z.core.$strip
              >,
              z.ZodObject<
                {
                  id: z.ZodString;
                  blockType: z.ZodLiteral<"menu">;
                  menu: z.ZodObject<
                    {
                      id: z.ZodString;
                      location: z.ZodString;
                      items: z.ZodArray<
                        z.ZodDiscriminatedUnion<
                          [
                            z.ZodObject<
                              {
                                label: z.ZodString;
                                icon: z.ZodNullable<
                                  z.ZodUnion<
                                    z.ZodLiteral<import("@allondeveen-portfolio/ui").IconName>[]
                                  >
                                >;
                                externality: z.ZodLiteral<"external">;
                                external: z.ZodString;
                                order: z.ZodNumber;
                              },
                              z.core.$strip
                            >,
                            z.ZodObject<
                              {
                                label: z.ZodString;
                                icon: z.ZodNullable<
                                  z.ZodUnion<
                                    z.ZodLiteral<import("@allondeveen-portfolio/ui").IconName>[]
                                  >
                                >;
                                externality: z.ZodLiteral<"internal">;
                                internal: z.ZodObject<
                                  {
                                    value: z.ZodObject<
                                      {
                                        slug: z.ZodString;
                                      },
                                      z.core.$strip
                                    >;
                                  },
                                  z.core.$strip
                                >;
                                order: z.ZodNumber;
                              },
                              z.core.$strip
                            >,
                          ],
                          "externality"
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
                  blockType: z.ZodLiteral<"siteTitle">;
                },
                z.core.$strip
              >,
            ],
            "blockType"
          >
        >;
        size: z.ZodNumber;
      },
      z.core.$strip
    >,
    z.ZodObject<
      {
        id: z.ZodString;
        blockType: z.ZodLiteral<"grid">;
        verticalAlign: z.ZodBoolean;
        blocks: z.ZodArray<
          z.ZodObject<
            {
              id: z.ZodString;
              blockType: z.ZodLiteral<"grid-item">;
              blocks: z.ZodArray<
                z.ZodDiscriminatedUnion<
                  [
                    z.ZodObject<
                      {
                        id: z.ZodString;
                        blockType: z.ZodLiteral<"heading">;
                        size: z.ZodNumber;
                        headingText: z.ZodObject<
                          {
                            root: z.ZodObject<
                              {
                                children: z.ZodArray<
                                  z.ZodType<
                                    import("@allondeveen-portfolio/lexical-text/cms").LexicalNode,
                                    unknown,
                                    z.core.$ZodTypeInternals<
                                      import("@allondeveen-portfolio/lexical-text/cms").LexicalNode,
                                      unknown
                                    >
                                  >
                                >;
                              },
                              z.core.$strip
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
                        blockType: z.ZodLiteral<"richText">;
                        text: z.ZodObject<
                          {
                            root: z.ZodObject<
                              {
                                children: z.ZodArray<
                                  z.ZodType<
                                    import("@allondeveen-portfolio/lexical-text/cms").LexicalNode,
                                    unknown,
                                    z.core.$ZodTypeInternals<
                                      import("@allondeveen-portfolio/lexical-text/cms").LexicalNode,
                                      unknown
                                    >
                                  >
                                >;
                              },
                              z.core.$strip
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
                        blockType: z.ZodLiteral<"stack">;
                        blocks: z.ZodArray<
                          z.ZodDiscriminatedUnion<
                            [
                              z.ZodObject<
                                {
                                  id: z.ZodString;
                                  blockType: z.ZodLiteral<"heading">;
                                  size: z.ZodNumber;
                                  headingText: z.ZodObject<
                                    {
                                      root: z.ZodObject<
                                        {
                                          children: z.ZodArray<
                                            z.ZodType<
                                              import("@allondeveen-portfolio/lexical-text/cms").LexicalNode,
                                              unknown,
                                              z.core.$ZodTypeInternals<
                                                import("@allondeveen-portfolio/lexical-text/cms").LexicalNode,
                                                unknown
                                              >
                                            >
                                          >;
                                        },
                                        z.core.$strip
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
                                  blockType: z.ZodLiteral<"richText">;
                                  text: z.ZodObject<
                                    {
                                      root: z.ZodObject<
                                        {
                                          children: z.ZodArray<
                                            z.ZodType<
                                              import("@allondeveen-portfolio/lexical-text/cms").LexicalNode,
                                              unknown,
                                              z.core.$ZodTypeInternals<
                                                import("@allondeveen-portfolio/lexical-text/cms").LexicalNode,
                                                unknown
                                              >
                                            >
                                          >;
                                        },
                                        z.core.$strip
                                      >;
                                    },
                                    z.core.$strip
                                  >;
                                },
                                z.core.$strip
                              >,
                            ],
                            "blockType"
                          >
                        >;
                      },
                      z.core.$strip
                    >,
                    z.ZodObject<
                      {
                        id: z.ZodString;
                        blockType: z.ZodLiteral<"menu">;
                        menu: z.ZodObject<
                          {
                            id: z.ZodString;
                            location: z.ZodString;
                            items: z.ZodArray<
                              z.ZodDiscriminatedUnion<
                                [
                                  z.ZodObject<
                                    {
                                      label: z.ZodString;
                                      icon: z.ZodNullable<
                                        z.ZodUnion<
                                          z.ZodLiteral<
                                            import("@allondeveen-portfolio/ui").IconName
                                          >[]
                                        >
                                      >;
                                      externality: z.ZodLiteral<"external">;
                                      external: z.ZodString;
                                      order: z.ZodNumber;
                                    },
                                    z.core.$strip
                                  >,
                                  z.ZodObject<
                                    {
                                      label: z.ZodString;
                                      icon: z.ZodNullable<
                                        z.ZodUnion<
                                          z.ZodLiteral<
                                            import("@allondeveen-portfolio/ui").IconName
                                          >[]
                                        >
                                      >;
                                      externality: z.ZodLiteral<"internal">;
                                      internal: z.ZodObject<
                                        {
                                          value: z.ZodObject<
                                            {
                                              slug: z.ZodString;
                                            },
                                            z.core.$strip
                                          >;
                                        },
                                        z.core.$strip
                                      >;
                                      order: z.ZodNumber;
                                    },
                                    z.core.$strip
                                  >,
                                ],
                                "externality"
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
                        blockType: z.ZodLiteral<"siteTitle">;
                      },
                      z.core.$strip
                    >,
                  ],
                  "blockType"
                >
              >;
              size: z.ZodNumber;
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
        blockType: z.ZodLiteral<"stack">;
        blocks: z.ZodArray<
          z.ZodDiscriminatedUnion<
            [
              z.ZodObject<
                {
                  id: z.ZodString;
                  blockType: z.ZodLiteral<"heading">;
                  size: z.ZodNumber;
                  headingText: z.ZodObject<
                    {
                      root: z.ZodObject<
                        {
                          children: z.ZodArray<
                            z.ZodType<
                              import("@allondeveen-portfolio/lexical-text/cms").LexicalNode,
                              unknown,
                              z.core.$ZodTypeInternals<
                                import("@allondeveen-portfolio/lexical-text/cms").LexicalNode,
                                unknown
                              >
                            >
                          >;
                        },
                        z.core.$strip
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
                  blockType: z.ZodLiteral<"richText">;
                  text: z.ZodObject<
                    {
                      root: z.ZodObject<
                        {
                          children: z.ZodArray<
                            z.ZodType<
                              import("@allondeveen-portfolio/lexical-text/cms").LexicalNode,
                              unknown,
                              z.core.$ZodTypeInternals<
                                import("@allondeveen-portfolio/lexical-text/cms").LexicalNode,
                                unknown
                              >
                            >
                          >;
                        },
                        z.core.$strip
                      >;
                    },
                    z.core.$strip
                  >;
                },
                z.core.$strip
              >,
            ],
            "blockType"
          >
        >;
      },
      z.core.$strip
    >,
    z.ZodObject<
      {
        id: z.ZodString;
        blockType: z.ZodLiteral<"menu">;
        menu: z.ZodObject<
          {
            id: z.ZodString;
            location: z.ZodString;
            items: z.ZodArray<
              z.ZodDiscriminatedUnion<
                [
                  z.ZodObject<
                    {
                      label: z.ZodString;
                      icon: z.ZodNullable<
                        z.ZodUnion<z.ZodLiteral<import("@allondeveen-portfolio/ui").IconName>[]>
                      >;
                      externality: z.ZodLiteral<"external">;
                      external: z.ZodString;
                      order: z.ZodNumber;
                    },
                    z.core.$strip
                  >,
                  z.ZodObject<
                    {
                      label: z.ZodString;
                      icon: z.ZodNullable<
                        z.ZodUnion<z.ZodLiteral<import("@allondeveen-portfolio/ui").IconName>[]>
                      >;
                      externality: z.ZodLiteral<"internal">;
                      internal: z.ZodObject<
                        {
                          value: z.ZodObject<
                            {
                              slug: z.ZodString;
                            },
                            z.core.$strip
                          >;
                        },
                        z.core.$strip
                      >;
                      order: z.ZodNumber;
                    },
                    z.core.$strip
                  >,
                ],
                "externality"
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
        blockType: z.ZodLiteral<"image">;
        image: z.ZodString;
      },
      z.core.$strip
    >,
    z.ZodObject<
      {
        id: z.ZodString;
        blockType: z.ZodLiteral<"siteTitle">;
      },
      z.core.$strip
    >,
  ],
  "blockType"
>;
export type Block = z.infer<typeof BlockSchema>;
//# sourceMappingURL=data.d.ts.map
