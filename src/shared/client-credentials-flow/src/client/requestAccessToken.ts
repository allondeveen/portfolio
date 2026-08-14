type TokenResponse = {
  access_token: string;
  token_type: "Bearer";
  expires_in: number;
  scope: string;
};

type AccessTokenRequestArguments = {
  tokenEndpoint: string;
  clientId: string;
  clientSecret: string;
  scope: string;
  fetchRequest?: (request: Request) => Promise<Response>;
  signal?: AbortSignal;
};

export async function requestAccessToken({
  tokenEndpoint,
  clientId,
  clientSecret,
  scope,
  fetchRequest = globalThis.fetch,
  signal,
}: AccessTokenRequestArguments): Promise<string> {
  const credentials = btoa(`${encodeURIComponent(clientId)}:${encodeURIComponent(clientSecret)}`);

  const response = await fetchRequest(
    new Request(tokenEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        scope,
      }),
      signal,
    }),
  );

  if (!response.ok) {
    throw new Error(`Failed to obtain access token: ${response.status} ${await response.text()}`);
  }

  const result = (await response.json()) as TokenResponse;

  return result.access_token;
}
