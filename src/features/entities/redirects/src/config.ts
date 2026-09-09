import { id } from "@allondeveen-portfolio/id-property/config";

import { validateRedirects } from "./cms/hooks/validateRedirects";
import { active } from "./cms/properties/active";
import { destination } from "./cms/properties/destination";
import { queryString } from "./cms/properties/queryString";
import { source } from "./cms/properties/source";

import type { CollectionConfig } from "payload";

export const redirects: CollectionConfig = {
  slug: "redirects",
  admin: {
    group: "Supporting",
  },
  fields: [
    //
    id,
    source,
    destination,
    active,
    queryString,
  ],
  hooks: {
    beforeValidate: [validateRedirects],
  },
};
