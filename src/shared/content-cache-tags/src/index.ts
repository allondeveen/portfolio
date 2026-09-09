type ID = string;
type Location = string;

export type BlockData = {
  menu?: Location[] | null;
  image?: ID[] | null;
};

export type CacheTagInput = {
  slug: string;
  blockNames: readonly string[];
  blockData: BlockData;
  series?: string | null | undefined;
};

export function getCacheTags({ slug, blockNames, blockData, series }: CacheTagInput): string[] {
  let tags = [`route:${slug}`, "header", "footer"];
  if (
    blockNames.includes("menu") &&
    "menu" in blockData &&
    blockData.menu != null &&
    Array.isArray(blockData.menu)
  ) {
    tags = [...tags, ...blockData.menu.map((menu) => `menu-${menu}`)];
  }
  if (blockNames.includes("siteTitle") || blockNames.includes("copyright")) {
    tags = [...tags, "site-settings"];
  }
  if (
    blockNames.includes("image") &&
    "image" in blockData &&
    blockData.image !== null &&
    Array.isArray(blockData.image)
  ) {
    tags = [...tags, ...blockData.image.map((image) => `image:${image}`)];
  }
  if (series) {
    tags = [...tags, `series:${series}`];
  }
  return tags;
}
