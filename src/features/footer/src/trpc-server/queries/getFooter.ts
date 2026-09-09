import { findByLocation, TemplateSchema } from "@allondeveen-portfolio/templates/cms";
import { mapTemplate } from "@allondeveen-portfolio/templates/trpc-server";

import type { MappingContext } from "@allondeveen-portfolio/adapter/trpc-server";
import type { MapBlockOptions } from "@allondeveen-portfolio/blocks-property/trpc-server";
import type { Template } from "@allondeveen-portfolio/templates/website/data";
import type { Payload } from "payload";

export const getFooter = async (
  payload: Payload,
  context: MappingContext,
  mapBlockOptions: MapBlockOptions,
): Promise<Template> => {
  const headerDoc = await findByLocation({
    payload,
    location: "footer",
  });
  const validatedHeader = TemplateSchema.parse(headerDoc);
  return await mapTemplate(validatedHeader, context, mapBlockOptions);
};
