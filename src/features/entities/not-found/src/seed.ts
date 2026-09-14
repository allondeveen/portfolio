import { documentValidation, heroValidation } from "@allondeveen-portfolio/blocks-property/cms";
import { pipe } from "fp-ts/lib/function";

import type { GlobalSeedFunction } from "@allondeveen-portfolio/seed-function";
import type { DataFromGlobalSlug, JsonObject } from "payload";

export const notFoundSeeds: GlobalSeedFunction<
  Omit<DataFromGlobalSlug<"not-found">, "id">
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
                        text: "Oops, this content doesn't exist",
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
    ] as DataFromGlobalSlug<"not-found">["blocks"],
  };
};

export function notFoundIsInitialised(data: JsonObject) {
  const check = "blocks" in data && Array.isArray(data.blocks) && data.blocks.length > 0;
  if (!check) {
    return false;
  }
  const result = pipe(data, documentValidation, heroValidation(true));
  return result._tag === "Right";
}
