# Text state feature

`AllowedTextStateFeature` wraps Payload's `TextStateFeature`. Each editor must
explicitly list the styles it offers:

```ts
import { AllowedTextStateFeature } from "@allondeveen-portfolio/text-state-lexical";

// Add to the editor's existing features, alongside a fixed or inline toolbar.
AllowedTextStateFeature({ allowedStates: ["highlight"] });
```

The quote block enables this for its `quote` property only. Its `author` editor
does not include the feature.

Add new styles to `src/states.ts`, defining the toolbar label, editor preview CSS,
and website class name. `allowedStates` is inferred from this catalog, so unknown
names are TypeScript errors. Unknown names also throw during configuration at
runtime. Add the corresponding website CSS when introducing a new class.

Each call constructs its own selection without modifying the shared catalog.
Selections use one `textStyle` attribute, so selecting another style replaces
the previous style. Payload's default-style toolbar action clears the selection.
An empty allowlist offers no named styles; omit the feature entirely if an editor
should have no text-state dropdown.

This returns Payload's normal `textState` feature. Replace an inherited instance
when overriding its allowlist:

```ts
features: ({ rootFeatures }) => [
  ...rootFeatures.filter((feature) => feature.key !== "textState"),
  AllowedTextStateFeature({ allowedStates: ["highlight"] }),
];
```

The allowlist configures editor choices; it does not enforce server-side
validation for existing content, pasted content, or API writes. Narrowing an
allowlist does not migrate stored documents.

Payload stores the selection as `node.$.textStyle`. The shared lexical-text
schema and adapter preserve known selections as `textState`, and its renderer
wraps formatted text in a span with the catalog's class name. Import the
`/states` entry point in website code to avoid loading Payload's server feature.
