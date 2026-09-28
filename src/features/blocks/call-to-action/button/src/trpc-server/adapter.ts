import { mapLexicalText } from "@allondeveen-portfolio/lexical-text/trpc-server";
import z from "zod";

import type { Button as CMSbutton } from "../cms/data";
import type { Button } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";

export const mapButton: Adapter<CMSbutton, Button> = async (button, context) => {
  let location: string;
  if (button.location.externality === "external") {
    location = button.location.external;
  } else {
    const page = await context.resolvePublic(
      {
        collection: button.location.internal.relationTo,
        id: button.location.internal.value,
      },
      z.object({ slug: z.string().min(1) }),
    );
    if (page.status !== "resolved") {
      location = "#";
    } else {
      location = page.source.slug;
    }
  }
  return {
    id: button.id,
    kind: button.blockType,
    variant: button.variant,
    icon: button.icon,
    externality: button.location.externality,
    location: location,
    label: await mapLexicalText(button.label, context),
  };
};
