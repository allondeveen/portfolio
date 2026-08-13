export const getLeafSlug = (slug: string): string => {
  const segments = slug.split("/").filter(Boolean);

  return segments.at(-1) ?? "";
};
