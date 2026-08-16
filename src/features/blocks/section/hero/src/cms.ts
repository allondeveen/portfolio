export { HeroSchema } from "./cms/data";
export type { Hero } from "./cms/data";

export {
  findHeroes,
  type HeadingResult,
  type HeroBlocksBlockResult,
  type HeroResult,
  type HeroSearchResults,
  type RichTextResult,
} from "./cms/selectors/findHeroes";
export { getDescription } from "./cms/selectors/getDescription";
export { getTitle } from "./cms/selectors/getTitle";
