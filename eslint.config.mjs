import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import importX from "eslint-plugin-import-x";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "**/dist/**",
      "**/.next/**",
      "**/.react-router/**",
      "**/.wrangler/**",
      "**/coverage/**",
      "**/node_modules/**",
      "src/apps/cms/src/migrations/**",
      "src/apps/cms/src/app/(payload)/**",
    ],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    plugins: {
      "import-x": importX,
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },

    settings: {
      react: {
        version: "detect",
      },

      "import-x/resolver-next": [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          project: [
            "src/apps/*/tsconfig.json",
            "src/features/*/tsconfig.json",
            "src/packages/*/tsconfig.json",
          ],
        }),
      ],

      "import/ignore": ["^cloudflare:workers$"],
    },

    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",

      "import-x/first": "error",
      "import-x/newline-after-import": "error",
      "import-x/no-duplicates": "error",
      "import-x/no-self-import": "error",
      "import-x/no-unresolved": [
        "error",
        {
          ignore: ["^cloudflare:workers$"],
        },
      ],

      "import-x/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling", "index"], "type"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          named: true,
        },
      ],
    },
  },

  prettier,
);
