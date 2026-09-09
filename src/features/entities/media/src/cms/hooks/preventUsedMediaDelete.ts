import { APIError, type CollectionBeforeDeleteHook } from "payload";

export const preventUsedMediaDelete: CollectionBeforeDeleteHook = async ({ id, req }) => {
  // TODO: after the image block is usable in pages, this has to be implemented for pages too.
  let consumingContent: string[] = [];

  const consumingTemplatesResults = await req.payload.find({
    collection: "templates",
    where: {
      "blocks.image": {
        equals: id,
      },
    },
    depth: 0,
    pagination: false,
    select: {
      location: true,
    },
  });

  consumingContent = [
    ...consumingContent,
    ...consumingTemplatesResults.docs.map((doc) => `${doc.location}`),
  ];

  const maintenance = await req.payload.findGlobal({
    slug: "maintenance",
    depth: 0,
  });

  if ("header" in maintenance || "blocks" in maintenance) {
    const inHeader =
      Array.isArray(maintenance.header) &&
      maintenance.header.filter((block) => {
        return (
          "blockType" in block &&
          block.blockType === "image" &&
          "image" in block &&
          block.image === id
        );
      }).length > 0;
    const inBlocks =
      Array.isArray(maintenance.blocks) &&
      maintenance.blocks.filter((block) => {
        return (
          "blockType" in block &&
          block.blockType === "image" &&
          "image" in block &&
          block.image === id
        );
      }).length > 0;
    if (inHeader || inBlocks) {
      consumingContent = [...consumingContent, "Maintenance page"];
    }
  }

  const siteSettings = await req.payload.findGlobal({
    slug: "site-settings",
    depth: 0,
  });
  if ("socialImage" in siteSettings && siteSettings.socialImage === id) {
    consumingContent = [...consumingContent, "Site Settings"];
  }

  if (consumingContent.length > 0) {
    throw new APIError(`Image is being used by: ${consumingContent.join(", ")}`, 400);
  }
};
