import { fileURLToPath } from "node:url";

import { requestAccessToken } from "@allondeveen-portfolio/client-credentials-flow/client";
import { createTRPCClient, type TRPCClient } from "@allondeveen-portfolio/trpc/client";
import { httpLink } from "@trpc/client";
import { getPlatformProxy } from "wrangler";

import type { MaintenanceContentRouter } from "@allondeveen-portfolio/maintenance-content/trpc-server";
import type { MaintenanceContent } from "@allondeveen-portfolio/maintenance-content/website/data";

type Environment = "development" | "staging" | "production";

type LoadOptions = {
  waitForCMS?: boolean;
};

type MaintenanceCMSClient = {
  maintenance: {
    query(): Promise<MaintenanceContent>;
  };
};

type CMSPlatformEnv = {
  CMS: {
    fetch(input: string, init?: RequestInit): Promise<Response>;
  };
  CMS_HOST: string;
};

const LOCAL_CMS_WAIT_TIMEOUT_MS = 90_000;
const LOCAL_CMS_RETRY_INTERVAL_MS = 1_000;
const TOKEN_CACHE_DURATION_MS = 4 * 60_000;
const wranglerConfig = fileURLToPath(new URL("../wrangler.jsonc", import.meta.url));

class PermanentCMSError extends Error {}

const wait = (milliseconds: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, milliseconds);
  });

function getEnvironment(): Environment {
  const environment = process.env.CLOUDFLARE_ENV ?? "development";

  if (!["development", "staging", "production"].includes(environment)) {
    throw new Error(`Unsupported CLOUDFLARE_ENV: ${environment}`);
  }

  return environment as Environment;
}

async function createCMSTransport() {
  const environment = getEnvironment();
  const isDevelopment = environment === "development";

  if (!isDevelopment && (!process.env.CLOUDFLARE_ACCOUNT_ID || !process.env.CLOUDFLARE_API_TOKEN)) {
    throw new Error(
      "CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN are required for remote CMS service bindings",
    );
  }

  const platform = await getPlatformProxy<CMSPlatformEnv>({
    configPath: wranglerConfig,
    environment: isDevelopment ? undefined : environment,
    persist: false,
    remoteBindings: !isDevelopment,
  });
  const origin = `https://${platform.env.CMS_HOST}`;

  async function fetchCMS(request: Request) {
    const body = ["GET", "HEAD"].includes(request.method) ? undefined : await request.arrayBuffer();

    return platform.env.CMS.fetch(request.url, {
      body,
      headers: Array.from(request.headers.entries()),
      method: request.method,
      redirect: request.redirect,
    });
  }

  return {
    close: () => platform.dispose(),
    description: `the ${isDevelopment ? "local development" : environment} CMS service binding`,
    environment,
    fetch: fetchCMS,
    origin,
  };
}

function validateContent(content: MaintenanceContent) {
  if (!Array.isArray(content.blocks) || content.blocks.length === 0) {
    throw new PermanentCMSError("The CMS returned invalid or empty maintenance content");
  }

  return content;
}

export async function createMaintenanceContentSource() {
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("OAUTH_CLIENT_ID and OAUTH_CLIENT_SECRET are required");
  }

  const oauthClientId = clientId;
  const oauthClientSecret = clientSecret;
  const transport = await createCMSTransport();
  let cachedToken: { expiresAt: number; value: string } | undefined;

  async function getAccessToken() {
    if (cachedToken && cachedToken.expiresAt > Date.now()) {
      return cachedToken.value;
    }

    const value = await requestAccessToken({
      tokenEndpoint: new URL("/oauth/token", transport.origin).toString(),
      clientId: oauthClientId,
      clientSecret: oauthClientSecret,
      scope: "website-downstream",
      async fetchRequest(request) {
        const response = await transport.fetch(new Request(request, { redirect: "manual" }));

        if (
          (response.status >= 300 && response.status < 400) ||
          [400, 401, 403].includes(response.status)
        ) {
          throw new PermanentCMSError(
            `The CMS rejected the build credentials or origin with status ${response.status}`,
          );
        }

        return response;
      },
    });

    cachedToken = {
      expiresAt: Date.now() + TOKEN_CACHE_DURATION_MS,
      value,
    };

    return value;
  }

  const cms = createTRPCClient<MaintenanceContentRouter>({
    links: [
      httpLink<MaintenanceContentRouter>({
        url: new URL("/trpc", transport.origin),
        async headers() {
          return { Authorization: `Bearer ${await getAccessToken()}` };
        },
        fetch(input: string | URL | Request, init?: RequestInit) {
          return transport.fetch(new Request(input, init));
        },
      }),
    ],
  }) as TRPCClient<MaintenanceContentRouter> & MaintenanceCMSClient;

  async function loadOnce() {
    try {
      return validateContent(await cms.maintenance.query());
    } catch (error) {
      if (error instanceof PermanentCMSError) {
        throw error;
      }

      cachedToken = undefined;
      throw error;
    }
  }

  return {
    close: transport.close,
    description: transport.description,
    async load({ waitForCMS = false }: LoadOptions = {}) {
      const deadline =
        Date.now() +
        (transport.environment === "development" && waitForCMS ? LOCAL_CMS_WAIT_TIMEOUT_MS : 0);
      let announcedWait = false;

      while (true) {
        try {
          return await loadOnce();
        } catch (error) {
          if (error instanceof PermanentCMSError || Date.now() >= deadline) {
            throw error;
          }

          if (!announcedWait) {
            console.log(`Waiting for the local CMS service binding at ${transport.origin}...`);
            announcedWait = true;
          }

          await wait(LOCAL_CMS_RETRY_INTERVAL_MS);
        }
      }
    },
  };
}
