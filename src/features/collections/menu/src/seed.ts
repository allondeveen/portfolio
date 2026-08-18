import type { SeedFunction } from "@allondeveen-portfolio/seed-function";
import type { RequiredDataFromCollectionSlug } from "payload";

export const menuSeeds: SeedFunction<RequiredDataFromCollectionSlug<"menu">> = async (payload) => {
  const homePageResults = await payload.find({
    collection: "pages",
    where: {
      slug: {
        equals: "/",
      },
    },
    limit: 1,
  });
  const contactPageResults = await payload.find({
    collection: "pages",
    where: {
      slug: {
        equals: "/contact",
      },
    },
    limit: 1,
  });
  if (homePageResults.totalDocs === 0 || contactPageResults.totalDocs === 0) {
    return [];
  }
  const homePage = homePageResults.docs.at(0);
  const contactPage = contactPageResults.docs.at(0);
  return [
    {
      location: "main",
      items: [
        {
          label: "Homepage",
          externality: "internal",
          internal: {
            relationTo: "pages",
            value: homePage,
          },
          order: 1,
        },
        {
          label: "Contact",
          externality: "internal",
          internal: {
            relationTo: "pages",
            value: contactPage,
          },
          order: 1,
        },
      ] as RequiredDataFromCollectionSlug<"menu">["items"],
    },
  ];
};
