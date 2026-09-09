import { isAbsoluteURL } from "../cms/plan";

import type { Redirect } from "../cms";

export function getDestination(redirect: Redirect, queryString: string) {
  const destination = redirect.destination;
  const normalisedQueryString = queryString.startsWith("?") ? queryString.slice(1) : queryString;
  const isAbsolute = isAbsoluteURL(destination);
  const url = isAbsolute ? new URL(destination) : new URL(destination, "https://internal.invalid");
  if (redirect.queryString && normalisedQueryString.length > 0) {
    if (url.search && url.search.length > 0) {
      url.search = `${url.search}&${normalisedQueryString}`;
    } else {
      url.search = `?${normalisedQueryString}`;
    }
  }
  if (isAbsolute) {
    return url.href;
  }
  return `${url.pathname}${url.search}${url.hash}`;
}
