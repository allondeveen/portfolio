import { cloudflare } from "@cloudflare/vite-plugin";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const port = parseInt(env.PORT) || 5174;
  const inspectorPort = parseInt(env.INSPECTOR_PORT) || 9230;
  return {
    plugins: [vanillaExtractPlugin({ identifiers: "short" }), cloudflare({ inspectorPort })],
    preview: {
      port,
      strictPort: true,
    },
    server: {
      port,
      strictPort: true,
      allowedHosts: [
        "maintenance-dev.allondeveen.com",
        "dev.allondeveen.com",
        "cms-dev.allondeveen.com",
      ],
    },
    resolve: {
      tsconfigPaths: true,
    },
  };
});
