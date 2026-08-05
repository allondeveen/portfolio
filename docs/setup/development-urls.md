# Fresh setup of development URLS

When setting the project up for the first time on a fresh machine that doesn't have caddy and cloudflared setup, use the following steps:

- Run `brew install cloudflared`
- Run `brew install caddy`
- Run `cloudflared tunnel login`
- Run `cloudflared tunnel create <tunnel name>`. Copy the tunnel UUID, you do not need to store it seperately
- Edit your `~/.cloudflared/config.yml`:

```
tunnel: <TUNNEL_UUID>
credentials-file: <absolute path to home dir>/.cloudflared/<TUNNEL_UUID>.json

ingress:
    - hostname: "*.<hostname>.<tld>"
      service: http://127.0.0.1:8080

    - service: http://127.0.0.1:8080
```

- Validate using `cloudflared tunnel ingress validate`
- Setup CNAME DNS records or run `cloudflared tunnel route dns macbook-development <component name>-dev.<hostname>.<tld>`
- Setup your unavailable page. It should be an index.html file and you can include external CSS.
- Edit your `/opt/homebrew/etc/Caddyfile`:

```
{
	auto_https off
}

(project_unavailable) {
	root * <absolute path to home dir>/<relative path to unavailable page directory>
	file_server

	header Cache-Control "no-store"
}

:8080 {
	import project_unavailable
}

:8081 {
	import project_unavailable
}

http://<development URL>:8080 {
	reverse_proxy localhost:<component port> localhost:8081 {
		lb_policy first
		lb_try_duration 1s
		lb_try_interval 100ms

		fail_duration 5s
		max_fails 1

		transport http {
			dial_timeout 250ms
		}
	}
}
```

- Run `caddy validate --config /opt/homebrew/etc/Caddyfile`
- Run `brew services start caddy` to start it as a startup service
- Run `touch ~/Library/LaunchAgents com.cloudflare.cloudflared.plist` and add:

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.cloudflare.cloudflared</string>

  <key>ProgramArguments</key>
  <array>
    <string>/opt/homebrew/bin/cloudflared</string>
    <string>--config</string>
    <string>[absolute path to home dir]/.cloudflared/config.yml</string>
    <string>tunnel</string>
    <string>run</string>
  </array>

  <key>RunAtLoad</key>
  <true/>

  <key>KeepAlive</key>
  <dict>
    <key>SuccessfulExit</key>
    <false/>
  </dict>

  <key>ThrottleInterval</key>
  <integer>5</integer>

  <key>StandardOutPath</key>
  <string>[absolute path to home dir]/Library/Logs/com.cloudflare.cloudflared.out.log</string>

  <key>StandardErrorPath</key>
  <string>[absolute path to home dir]/Library/Logs/com.cloudflare.cloudflared.err.log</string>
</dict>
</plist>

```

- Run `launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.cloudflare.cloudflared.plist`
- Run `launchctl kickstart -k gui/$(id -u)/com.cloudflare.cloudflared`
