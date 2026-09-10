export function isHydrationEnabled() {
  const value = process.env.HYDRATE ?? "false";

  if (value !== "true" && value !== "false") {
    throw new Error("HYDRATE must be either true or false");
  }

  return value === "true";
}
