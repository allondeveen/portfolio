# Maintenance page

The maintenance page uses one typed tRPC content source for development and production builds.
During a build, React prerenders the retrieved content into `index.html` and embeds both the content
and the SSR stylesheet. Hydration is optional for the initial render and the deployed page never
fetches content from the CMS.

## Build order

1. Provide `OAUTH_CLIENT_ID` and `OAUTH_CLIENT_SECRET`.
2. Optionally set `CLOUDFLARE_ENV` (`development`, `staging`, or `production`).
3. Run `pnpm build` while the corresponding CMS Worker is deployed and reachable through its
   service binding.
4. Deploy the generated maintenance Worker.
5. Enable maintenance mode only after the deployment succeeds.

Every environment uses the `CMS` service binding and constructs its OAuth and tRPC request URLs from
the bound `CMS_HOST` variable. Development connects the binding to the locally running
`portfolio-cms-proxy`; staging and production connect to their deployed CMS Worker through a remote
binding. This bypasses the public CMS hostname, so an already-active maintenance route or Cloudflare Access setups cannot block
content retrieval. Remote builds also need `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`. Local
values can be placed in `.build.vars`; Cloudflare does not copy that file into its generated Worker
output. A development build waits up to 90 seconds for the local CMS binding to become available.

## Development

```sh
pnpm dev
```

The development command obtains the local `CMS` service binding and waits up to 90 seconds for the
CMS proxy and CMS to become available, then starts Vite with locally rendered CMS content. After the
maintenance global is saved, its Payload hook notifies the maintenance development server. The
server then retrieves the new content through the service binding, rebuilds the page, and reloads
connected browsers. Component and stylesheet changes continue to use the Vite development loop.
The application is available at `http://localhost:5174`.

The hook defaults to `http://localhost:5174/__maintenance/rebuild` outside production. For staging
and production, set `MAINTENANCE_BUILD_HOOK_URL` on the CMS Worker to
`https://api.github.com/repos/allondeveen/portfolio/actions/workflows/deploy-maintenance-page.yml/dispatches`,
set `MAINTENANCE_BUILD_REF` to `staging` or `main`, and store a fine-grained GitHub token with Actions
write access as `MAINTENANCE_BUILD_HOOK_TOKEN`. The same Payload hook will then dispatch
`.github/workflows/deploy-maintenance-page.yml`, whose existing build retrieves content from the
matching CMS service binding before deploying.

## Deployment

Build first, then deploy the already-generated output:

```sh
pnpm build
pnpm deploy
```

The build fails rather than publishing stale or empty content when the CMS request fails.
