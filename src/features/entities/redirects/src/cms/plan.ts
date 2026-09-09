import { findBySlug } from "@allondeveen-portfolio/public-documents-queries/cms";

import { type Redirect, RedirectSchema } from "./data";

import type { JsonObject, PayloadRequest } from "payload";

export function isAbsoluteURL(url: string) {
  return url.startsWith("//") || url.startsWith("https://") || url.startsWith("http://");
}

export function normaliseAndEncode(input: string): string {
  const value = input.trim();

  if (/^(?:https?:)?\/\//i.test(value)) {
    const absolute = value.startsWith("//") ? `https:${value}` : value;
    return new URL(absolute).href;
  }

  const path = value.startsWith("/") ? value : `/${value}`;
  const url = new URL(path, "https://internal.invalid");

  const pathname =
    url.pathname
      .toLowerCase()
      .replace(/%[0-9a-f]{2}/gi, (escape) => escape.toUpperCase())
      .replace(/\/+$/, "") || "/";

  return `${pathname}${url.search}${url.hash}`;
}

type Operation = "add" | "update";

function createRedirectPlan(req: PayloadRequest, redirects: Redirect[]) {
  const { payload } = req;
  const current = new Map(redirects.map((redirect) => [redirect.source, redirect]));
  let updates = new Map<string, [Operation, Redirect]>();
  function parseAndNormalise(redirect: JsonObject) {
    return RedirectSchema.parse({
      ...redirect,
      source:
        typeof redirect.source === "string" ? normaliseAndEncode(redirect.source) : redirect.source,
      destination:
        typeof redirect.destination === "string"
          ? normaliseAndEncode(redirect.destination)
          : redirect.destination,
    });
  }
  function innerUpdate(redirect: Redirect, operation: Operation) {
    const current = updates.get(redirect.id);
    updates.set(redirect.id, [current ? current[0] : operation, redirect]);
  }
  function getProposals() {
    let proposed: Redirect[] = current.values().toArray();
    const updateOperationRedirectIDs = updates
      .values()
      .filter(([operation]) => operation === "update")
      .map((value) => value[1].id)
      .toArray();
    proposed = proposed.filter((redirect) => !updateOperationRedirectIDs.includes(redirect.id));
    proposed = [...proposed, ...updates.values().map((value) => value[1])];
    return proposed;
  }
  async function validate() {
    const proposed = getProposals();
    const sources = new Set<string>();
    for (const redirect of proposed) {
      if (redirect.destination === redirect.source) {
        throw `Source '${redirect.source}' and destination must differ.`;
      }
      if (sources.has(redirect.source)) {
        throw `Source '${redirect.source}' already exists.`;
      }
      if (isAbsoluteURL(redirect.source)) {
        throw `Source '${redirect.source}' must be an internal path.`;
      }
      sources.add(redirect.source);
    }

    for (const redirect of proposed) {
      if (sources.has(redirect.destination)) {
        throw `Redirect chain detected: destination '${redirect.destination}' is another redirect source.`;
      }
    }

    const routeChecks = await Promise.all([
      ...proposed.map(async (redirect) => ({
        redirect,
        document: await findBySlug({
          payload,
          slug: redirect.source,
          req,
        }),
      })),
    ]);

    for (const { redirect, document } of routeChecks) {
      if (document) {
        throw `Source '${redirect.source}' is a published document.`;
      }
    }
  }
  return {
    update(redirect: JsonObject) {
      const parsedRedirect = parseAndNormalise(redirect);
      innerUpdate(parsedRedirect, "update");
      return parsedRedirect;
    },
    add(redirect: JsonObject) {
      const parsedRedirect = parseAndNormalise(redirect);
      innerUpdate(parsedRedirect, "add");
      return parsedRedirect;
    },
    create(source: string, destination: string) {
      const redirect: Redirect = {
        id: crypto.randomUUID(),
        source: normaliseAndEncode(source),
        destination: normaliseAndEncode(destination),
        active: true,
        queryString: false,
      };
      updates = new Map<string, [Operation, Redirect]>([
        ...current
          .values()
          .filter((intermediateRedirect) => intermediateRedirect.destination === redirect.source)
          .map(
            (intermediateRedirect) =>
              [
                intermediateRedirect.id,
                [
                  "update" as const,
                  {
                    ...intermediateRedirect,
                    destination: redirect.destination,
                  },
                ],
              ] as [string, [Operation, Redirect]],
          )
          .toArray(),
        ...updates.values().map(([operation, pending]) => {
          let mappedPending = pending;
          if (pending.destination === redirect.source) {
            mappedPending = {
              ...mappedPending,
              destination: redirect.destination,
            };
          }
          return [pending.id, [operation, mappedPending]] as [string, [Operation, Redirect]];
        }),
        [redirect.id, ["add", redirect]],
      ]);
    },
    validate,
    async commit() {
      await validate();
      for (const redirect of updates
        .values()
        .filter(([operation]) => operation === "update")
        .map((value) => value[1])) {
        await payload.update({
          collection: "redirects",
          id: redirect.id,
          data: redirect,
          req,
        });
        const contextIntermediates =
          req.context["intermediates"] && Array.isArray(req.context["intermediates"])
            ? req.context["intermediates"]
            : [];
        req.context["intermediates"] = [...contextIntermediates, redirect.source];
      }
      for (const redirect of updates
        .values()
        .filter(([operation]) => operation === "add")
        .map((value) => value[1])) {
        await payload.create({
          collection: "redirects",
          data: redirect,
          req,
        });
      }
    },
  };
}

export const RedirectPlan = {
  load: async function (req: PayloadRequest) {
    const redirectsResults = await req.payload.find({
      collection: "redirects",
      pagination: false,
      req,
    });
    const redirects = redirectsResults.docs.map((redirect) => RedirectSchema.parse(redirect));
    return createRedirectPlan(req, redirects);
  },
};
