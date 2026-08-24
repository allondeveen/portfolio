import type { SeedFunction } from "@allondeveen-portfolio/seed-function";
import type { RequiredDataFromCollectionSlug } from "payload";

export const templateSeeds: SeedFunction<RequiredDataFromCollectionSlug<"templates">> = async (
  payload,
) => {
  const mainMenuResults = await payload.find({
    collection: "menu",
    where: {
      location: {
        equals: "main",
      },
    },
    limit: 1,
  });
  const homePageResults = await payload.find({
    collection: "pages",
    where: {
      slug: {
        equals: "/",
      },
    },
    limit: 1,
  });
  const mainMenu = mainMenuResults.docs.at(0);
  const homePage = homePageResults.docs.at(0);
  return [
    {
      location: "header",
      blocks: [
        {
          blockType: "grid",
          verticalAlign: true,
          blocks: [
            {
              blockType: "grid-item",
              size: 2,
              blocks: [
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
                              type: "link",
                              direction: "ltr",
                              format: "",
                              indent: 0,
                              version: 3,
                              fields: {
                                doc: {
                                  label:
                                    (<string>homePage?.title).replace(" | Allon de Veen", "") ?? "",
                                  relationTo: "pages",
                                  value: homePage,
                                },
                                linkType: "internal",
                              },
                              children: [
                                {
                                  type: "text",
                                  version: 1,
                                  text: "Allon de Veen",
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  },
                },
              ],
            },
            {
              blockType: "grid-item",
              size: 8,
              blocks: [
                {
                  blockType: "menu",
                  menu: mainMenu,
                },
              ],
            },
          ],
        },
      ] as RequiredDataFromCollectionSlug<"templates">["blocks"],
    },
  ];
};
