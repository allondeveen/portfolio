import {
  maintenanceIsInitialised,
  maintenanceSeeds,
} from "@allondeveen-portfolio/maintenance-content/seed";
import { menuSeeds } from "@allondeveen-portfolio/menu/seed";
import { pageSeeds } from "@allondeveen-portfolio/pages/seed";
import {
  siteSettingsIsInitialised,
  siteSettingsSeeds,
} from "@allondeveen-portfolio/site-settings/seed";
import { templateSeeds } from "@allondeveen-portfolio/templates/seed";
import {
  type CollectionSlug,
  type DataFromGlobalSlug,
  type GlobalSlug,
  type JsonObject,
  type Payload,
  type RequiredDataFromCollectionSlug,
  ValidationError,
} from "payload";

import type { DeepPartial } from "ts-essentials";

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

function seedGlobal(payload: Payload) {
  return async function <Slug extends GlobalSlug>(
    slug: Slug,
    isInitialised: (data: JsonObject) => boolean,
    data:
      | DeepPartial<Omit<DataFromGlobalSlug<Slug>, "id">>
      | Promise<DeepPartial<Omit<DataFromGlobalSlug<Slug>, "id">>>,
  ) {
    const global = await payload.findGlobal({
      slug,
    });
    if (!isInitialised(global)) {
      try {
        const seedData = await data;
        await payload.updateGlobal({
          slug,
          data: seedData,
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

export function onInit(seedEmail: string = "", seedPass: string = "") {
  return async function (payload: Payload) {
    console.log("Seeding..");
    const seed = seedCollection(payload);
    const globalSeed = seedGlobal(payload);

    if (seedEmail.length > 0 && seedPass.length > 0) {
      await seed("users", [
        {
          email: seedEmail,
          password: seedPass,
        },
      ]);
    }

    await globalSeed("site-settings", siteSettingsIsInitialised, siteSettingsSeeds(payload));

    await seed("pages", pageSeeds(payload));

    await seed("menu", menuSeeds(payload));

    await seed("templates", templateSeeds(payload));

    await globalSeed("maintenance", maintenanceIsInitialised, maintenanceSeeds(payload));

    console.log("Seeding finished");
  };
}
