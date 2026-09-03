export { type Block, BlockSchema } from "./cms/data";
export { getDescription } from "./cms/selectors/getDescription";
export { getTitle } from "./cms/selectors/getTitle";

export {
  blocksValidationError,
  childBlockValidationError,
  validationError,
} from "./cms/hooks/validation/errors";
export { dataIsDefined } from "./cms/hooks/validation/dataIsDefined";
export { atLeastOneBlock, type DocumentWithBlocks } from "./cms/hooks/validation/atLeastOneBlock";
export { documentValidation } from "./cms/hooks/validation/documentValidation";

export { exactlyOneHero } from "./cms/hooks/validation/hero/exactlyOneHero";
export { heroAtFirstPosition } from "./cms/hooks/validation/hero/heroAtFirstPosition";
export { heroHasAtLeastOneRichText } from "./cms/hooks/validation/hero/heroHasAtLeastOneRichText";
export { heroHasExactlyOneHeading } from "./cms/hooks/validation/hero/heroHasExactlyOneHeading";
export { heroHeadingHasSizeOne } from "./cms/hooks/validation/hero/heroHeadingHasSizeOne";
export { minimumHeroValidation } from "./cms/hooks/validation/hero/minimumHeroValidation";
export { heroValidation } from "./cms/hooks/validation/hero/heroValidation";
