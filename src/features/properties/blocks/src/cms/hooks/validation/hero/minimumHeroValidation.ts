import { flow } from "fp-ts/lib/function";

import { exactlyOneHero } from "./exactlyOneHero";
import { heroAtFirstPosition } from "./heroAtFirstPosition";

export const minimumHeroValidation = flow(exactlyOneHero, heroAtFirstPosition);
