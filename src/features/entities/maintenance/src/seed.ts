import type { GlobalSeedFunction } from "@allondeveen-portfolio/seed-function";
import type { DataFromGlobalSlug, JsonObject } from "payload";

export const maintenanceSeeds: GlobalSeedFunction<
  Omit<DataFromGlobalSlug<"maintenance">, "id">
> = async (payload) => {
  const maintenanceMenuResults = await payload.find({
    collection: "menu",
    where: {
      location: {
        equals: "maintenance",
      },
    },
    limit: 1,
  });
  const maintenanceMenu = maintenanceMenuResults.docs.at(0);
  return {
    header: [
      {
        blockType: "siteTitle",
      },
    ] as DataFromGlobalSlug<"maintenance">["header"],
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
                    text: "Coming soon",
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
                    text: "I am building something cool. Keep checking in to find out more.",
                  },
                ],
              },
            ],
          },
        },
      },
      {
        blockType: "menu",
        menu: maintenanceMenu,
      },
    ] as DataFromGlobalSlug<"maintenance">["blocks"],
  };
};

export function maintenanceIsInitialised(data: JsonObject) {
  return "blocks" in data && Array.isArray(data.blocks) && data.blocks.length > 0;
}
