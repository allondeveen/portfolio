import { pageSeeds } from "@allondeveen-portfolio/pages/seed";
import {
  type CollectionSlug,
  type Payload,
  type RequiredDataFromCollectionSlug,
  ValidationError,
} from "payload";

function seedCollection(payload: Payload) {
  return async function <
    Slug extends CollectionSlug,
    Data extends RequiredDataFromCollectionSlug<Slug>,
  >(collection: CollectionSlug, data: Data) {
    const docsCount = await payload.count({ collection });
    if (docsCount.totalDocs === 0) {
      try {
        await payload.create({
          collection,
          data,
          draft: false,
        });
      } catch (e) {
        if (e instanceof ValidationError) {
          for (const error of e.data.errors) {
            console.error(error);
          }
        } else {
          console.error(e);
        }
      }
    }
  };
}

export async function onInit(payload: Payload) {
  console.log("Seeding..");
  const seed = seedCollection(payload);

  const pages = await pageSeeds(payload);
  for (const page of pages) {
    seed("pages", page);
  }
}
