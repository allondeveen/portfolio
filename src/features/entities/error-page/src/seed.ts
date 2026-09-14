import { documentValidation, heroValidation } from "@allondeveen-portfolio/blocks-property/cms";
import { pipe } from "fp-ts/lib/function";

import type { GlobalSeedFunction } from "@allondeveen-portfolio/seed-function";
import type { DataFromGlobalSlug, JsonObject } from "payload";

export const errorPageSeeds: GlobalSeedFunction<
  Omit<DataFromGlobalSlug<"error-page">, "id">
> = async (payload) => {
  const homePageResults = await payload.find({
    collection: "pages",
    where: {
      slug: {
        equals: "/",
      },
    },
    limit: 1,
  });
  const homePage = homePageResults.docs.at(0);
  return {
    blocks: [
      {
        blockType: "hero",
        blocks: [
          {
            blockType: "heading",
            size: 1,
            variant: "default",
            headingText: {
              root: {
                type: "root",
                direction: "ltr",
                format: "",
                indent: 0,
                version: 1,
                children: [
                  {
                    type: "paragraph",
                    version: 1,
                    children: [
                      {
                        type: "text",
                        version: 1,
                        text: "Oops, something went wrong",
                      },
                    ],
                  },
                ],
              },
            },
          },
          {
            blockType: "richText",
            text: {
              root: {
                type: "root",
                direction: "ltr",
                format: "",
                indent: 0,
                version: 1,
                children: [
                  {
                    type: "paragraph",
                    version: 1,
                    children: [
                      {
                        type: "text",
                        version: 1,
                        text: "Head back to the ",
                      },
                      {
                        type: "link",
                        fields: {
                          doc: {
                            value: homePage,
                            relationTo: "pages",
                          },
                          linkType: "internal",
                        },
                        children: [
                          {
                            type: "text",
                            version: 1,
                            text: "homepage",
                          },
                        ],
                      },
                      {
                        type: "text",
                        version: 1,
                        text: ".",
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
      },
    ] as DataFromGlobalSlug<"error-page">["blocks"],
  };
};

export function errorPageIsInitialised(data: JsonObject) {
  const check = "blocks" in data && Array.isArray(data.blocks) && data.blocks.length > 0;
  if (!check) {
    return false;
  }
  const result = pipe(data, documentValidation, heroValidation(true));
  return result._tag === "Right";
}
