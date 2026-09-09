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
  const mainMenu = mainMenuResults.docs.at(0);
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
                  blockType: "siteTitle",
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
    {
      location: "footer",
      blocks: [
        {
          blockType: "copyright",
        },
      ] as RequiredDataFromCollectionSlug<"templates">["blocks"],
    },
  ];
};
