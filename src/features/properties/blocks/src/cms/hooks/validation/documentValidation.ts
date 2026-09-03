import { flow } from "fp-ts/lib/function";

import { atLeastOneBlock } from "./atLeastOneBlock";
import { dataIsDefined } from "./dataIsDefined";

export const documentValidation = flow(dataIsDefined, atLeastOneBlock);
