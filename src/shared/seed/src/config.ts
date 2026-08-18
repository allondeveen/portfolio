import { menuSeeds } from "@allondeveen-portfolio/menu/seed";
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
    Data extends RequiredDataFromCollectionSlug<Slug>[],
  >(collection: CollectionSlug, data: Data | Promise<Data>) {
    const docsCount = await payload.count({ collection });
    if (docsCount.totalDocs === 0) {
      try {
        const seedData = await data;
        for (const data of seedData) {
          await payload.create({
            collection,
            data: data,
            draft: false,
          });
        }
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

export function onInit(seedEmail: string = "", seedPass: string = "") {
  return async function (payload: Payload) {
    console.log("Seeding..");
    const seed = seedCollection(payload);

    if (seedEmail.length > 0 && seedPass.length > 0) {
      await seed("users", [
        {
          email: seedEmail,
          password: seedPass,
        },
      ]);
    }

    await seed("pages", pageSeeds(payload));

    await seed("menu", menuSeeds(payload));

    console.log("Seeding finished");
  };
}
