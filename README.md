# Portfolio website

This is my portfolio website. Feel free to browse the docs and the code. The portfolio is still in development.

# Setup

Setup is simple:

- `pnpm install`
- `pnpm dev`

# Preview edge runtime compatibility

To preview the edge runtime compatibility run `pnpm preview`.

# Development URLs

Cloudflare tunnels the dev urls to the development environment. The following dev URLs are used:

- dev.allondeveen.com
- cms-dev.allondeveen.com
- maintenance-dev.allondeveen.com

## Add development URL

The development url has to have one subdomain. The subdomain should have the following format: `<component name>-dev`. To add the URL:

- Add cname DNS record for the subdomain and route it to the tunnel. Check the other dev DNS records for the tunnel UUID and add the following value: `<TUNNEL_UUID>.cfargotunnel.com`. Alternatively run: `cloudflared tunnel route dns macbook-development <component name>-dev.<hostname>.<tld>`
- Protect the dev URL with Cloudflare Access. Add the subdomain as a public hostname to the application, select the hostname and click on 'save'.
- Update your Caddyfile (located at `/opt/homebrew/etc/Caddyfile`) by adding a new hostname. Use the same fallback mechanism as the other dev URLs. Run `brew services restart caddy` to restart Caddy.

## Fresh development URL setup

See [Development URLs](docs/setup/development-urls.md).
