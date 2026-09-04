import type { Block } from "@allondeveen-portfolio/blocks-property/cms";
import type { SeedFunction } from "@allondeveen-portfolio/seed-function";
import type { RequiredDataFromCollectionSlug } from "payload";

function pageSeed(
  slug: string,
  title: string,
  description: string,
  imageId: string | undefined,
  extraDescription: string = "",
  variant: Extract<Block, { blockType: "heading" }>["variant"] = "default",
): RequiredDataFromCollectionSlug<"pages"> {
  const fullDescription =
    extraDescription.length > 0 ? `${description} ${extraDescription}` : description;
  return {
    title,
    slug,
    meta: {
      title: `${title} | Allon de Veen`,
      description,
      image: imageId,
    },
    blocks: [
      {
        blockType: "hero",
        blocks: [
          {
            blockType: "heading",
            size: 1,
            variant,
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
                        text: title,
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
                        text: fullDescription,
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  };
}

export const pageSeeds: SeedFunction<ReturnType<typeof pageSeed>> = async (payload) => {
  const socialImageResults = await payload.find({
    collection: "media",
    where: {
      name: {
        equals: "Allon de Veen - Logo",
      },
    },
  });
  const socialImage = socialImageResults.docs.at(0);
  return [
    pageSeed(
      "/",
      "TypeScript-first full-stack engineer",
      "I build scalable web applications with 100% end-to-end type-safety and a focus on user interaction, state management and React architecture.",
      socialImage?.id.toString() ?? "",
      "Using tools like Zod and tRPC, I catch runtime-errors before they happen. I also build AI integrations using modern database layers like Turso, Drizzle ORM and D1, or whatever technology the use case requires.",
    ),
    pageSeed(
      "/contact",
      "Work together on your next project",
      "If you need a TypeScript first architect or full-stack engineer for you next project, get in touch with me.",
      socialImage?.id.toString() ?? "",
    ),
  ];
};
