import { mapLexicalText } from "@allondeveen-portfolio/lexical-text/trpc-server";
import { MediaSchema } from "@allondeveen-portfolio/media/cms";
import { mapMedia } from "@allondeveen-portfolio/media/trpc-server";

import type { List as CMSList } from "../cms/data";
import type { List } from "../website/data";
import type { Adapter } from "@allondeveen-portfolio/adapter/trpc-server";

export const mapList: Adapter<CMSList, List> = async (list, context) => {
  const base = {
    id: list.id,
    kind: list.blockType,
    type: list.enumeration.type,
  };
  const items = await Promise.all(
    list.items
      .sort((value) => value.order)
      .map(async (item) => ({
        text: await mapLexicalText(item.value, context),
        order: item.order,
      })),
  );
  if (list.enumeration.listStyleType === "image") {
    const defaultImage = await context.resolvePublic(
      {
        collection: "media",
        id: list.enumeration.defaultImage,
      },
      MediaSchema,
    );
    if (defaultImage.status !== "resolved") {
      return {
        ...base,
        listStyle: "default",
        items,
      };
    }
    return {
      ...base,
      listStyle: "image",
      items: await Promise.all(
        list.items
          .sort((value) => value.order)
          .map(async (item) => {
            const image = item.image
              ? await context.resolvePublic(
                  {
                    collection: "media",
                    id: item.image,
                  },
                  MediaSchema,
                )
              : null;
            if (image && image.status === "resolved") {
              return {
                text: await mapLexicalText(item.value, context),
                order: item.order,
                image: image
                  ? await mapMedia(image.source, context)
                  : await mapMedia(defaultImage.source, context),
              };
            }
            return {
              text: await mapLexicalText(item.value, context),
              order: item.order,
              image: await mapMedia(defaultImage.source, context),
            };
          }),
      ),
    };
  }
  return {
    ...base,
    listStyle: list.enumeration.listStyleType,
    items,
  };
};
