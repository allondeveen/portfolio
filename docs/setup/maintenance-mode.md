# Maintenance mode

Maintenance mode works by running a maintenance worker that processes all the traffic to website and cms. It first checks if maintenance mode is enabled, if it is, it serves its own contents (the maintenance page). If it is disabled, it routes the traffic to the website or cms based on the hostname. If maintenance mode is enabled, each document shows a maintenance page and returns a status code 503. The maintenance mode serves its own robots.txt that disallows robots to index the site.

## Used dependencies

### Key value namespace

It uses a key-value namespace that has a key `maintenance-mode` that can either be `enabled` or `disabled`. This key-value namespace is bound to the maintenance worker. There is a key-value namespace for each environment, so the maintenance mode works in each environment seperately. For development, it is a key-value namespace that is managed by wrangler on the local environment. So, each developer can test maintenance mode individually.

### Services

It uses two services to access the cms and website workers.

### Configuration

The following vars are required: `WEBSITE_HOST`, `CMS_HOST`, AND `ENVIRONMENT`, per environment. For development there is an extra required var called `DIRECT_HOST`. See more information about that in [Direct access](#direct-access).

### Routes

The website and cms routes have been setup for each environment, so the traffic for those routes is routed to the maintenance worker. For development, no routes are set, because routing goes through the [Development environments](./development-urls.md).

## Development specifics

The following things apply to development only.

### CMS Proxy

Because next js's dev server doesn't spin up a worker like vite does when it uses the cloudflare vite plugin, a CMS proxy worker is spun up. In development the service for the cms resolves to the CMS proxy, which performes a fetch through `127.0.0.1` on a port that is set in the wrangler config and must match the port that the cms dev server listens to. The fetch sets the `Host` header with the hostname that is setup in the wrangler config and must match the host in allowedDevOrigins in the next config, so host validation in the cms dev server passes.

### Direct access

For developing the maintenance page, access to the maintenance worker is provided through a direct host. If you navigate to the direct host, the maintenance mode is assumed to be enabled and the content is returned normally (without a 503 status code and status message). Maintenance mode still works the same for the cms and website workers.
