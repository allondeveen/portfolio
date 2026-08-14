export type Credentials = {
  clientId: string;
  clientSecret: string;
};

export function parseClientCredentials(request: Request): Credentials | null {
  const authorization = request.headers.get("Authorization");

  if (!authorization?.startsWith("Basic ")) {
    return null;
  }

  try {
    const encoded = authorization.slice("Basic ".length);

    const decoded = atob(encoded);

    const separator = decoded.indexOf(":");

    if (separator === -1) {
      return null;
    }

    return {
      clientId: decodeURIComponent(decoded.slice(0, separator)),
      clientSecret: decodeURIComponent(decoded.slice(separator + 1)),
    };
  } catch {
    return null;
  }
}
