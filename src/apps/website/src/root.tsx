import { darkTheme } from "@allondeveen-portfolio/design-system";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from "react-router";

import type { Route } from "./+types/root";

import "@allondeveen-portfolio/design-system/index.css";
import "@allondeveen-portfolio/design-system/global.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader() {
  const buffer = new Uint8Array(16);
  crypto.getRandomValues(buffer);
  const nonce = btoa(String.fromCharCode(...buffer));
  return new Response(JSON.stringify({ nonce }), {
    headers: {
      "Content-Type": "application/json",
      "X-Root-Loader-Nonce": nonce,
    },
  });
}

export function headers({ errorHeaders, loaderHeaders }: Route.HeadersArgs) {
  const nonce = loaderHeaders.get("X-Root-Loader-Nonce");

  const cspDirectives = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline' 'nonce-${nonce}' https://*.youtube.com https://*.ytimg.com`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "frame-src https://youtube-nocookie.com https://*.youtube.com",
    "frame-ancestors 'none'",
  ];

  const headers = new Headers(errorHeaders);
  headers.set("Content-Security-Policy", cspDirectives.join("; "));

  return headers;
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useRouteLoaderData<typeof loader>("root");
  if (!data) {
    throw new Error("Root loader data is unavailable");
  }
  const { nonce } = data;
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links nonce="" />
      </head>
      <body className={darkTheme}>
        {children}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
