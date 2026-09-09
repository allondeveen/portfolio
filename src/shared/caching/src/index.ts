import * as z from "zod";

export type WithTags = {
  tags: Record<string, string | null>;
};

export type CachedRequestOptions<Data extends WithTags> = {
  cache: KVNamespace;
  key: string;
  schema: z.ZodType<Data>;
  resolve(): Promise<Data>;
  expirationTtl?: number;
};

export async function cachedRequest<Data extends WithTags>({
  cache,
  key,
  schema,
  resolve,
  expirationTtl = 31_536_000,
}: CachedRequestOptions<Data>): Promise<Data> {
  const dataKey = `data:v1:${key}`;

  try {
    const match = await cache.get(dataKey);
    if (match !== null) {
      const parsed = schema.safeParse(JSON.parse(match));

      if (parsed.success) {
        const matches = await Promise.all(
          Object.entries(parsed.data.tags).map(async ([tag, storedVersion]) => {
            const currentVersion = await cache.get(`tag:v1:${tag}`);
            return currentVersion === storedVersion;
          }),
        );
        if (matches.every(Boolean)) {
          return parsed.data;
        }
      }
    }
  } catch (error) {
    console.warn("Cache read failed", error);
  }

  const data = await resolve();

  try {
    await cache.put(dataKey, JSON.stringify(data), {
      expirationTtl,
    });
  } catch (error) {
    console.warn("Cache write failed", error);
  }

  return data;
}

export type GetVersionsOptions = {
  cache: KVNamespace;
  tags: string[];
};

export async function getVersions({
  cache,
  tags,
}: GetVersionsOptions): Promise<Record<string, string | null>> {
  const record: Record<string, string | null> = {};
  for (const tag of tags) {
    const version = await cache.get(`tag:v1:${tag}`);
    record[tag] = version;
  }
  return record;
}

export type DeleteTagsOptions = GetVersionsOptions;

export async function deleteTags({ cache, tags }: DeleteTagsOptions): Promise<void> {
  let promises: Promise<void>[] = [];
  for (const tag of new Set(tags)) {
    promises = [...promises, cache.put(`tag:v1:${tag}`, crypto.randomUUID())];
  }
  await Promise.all(promises);
}
