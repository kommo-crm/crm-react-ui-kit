# Themes

Each theme is a folder inside `themes/` containing two files.

## Folder structure

```
themes/
├── index.ts                    # Theme registry
├── lightUiKit/
│   └── index.ts                # Theme config + semantic tokens
└── alternativeUiKit/
    └── index.ts                # Theme config + semantic tokens
```

---

## Theme files

### `index.ts` — theme config

```ts
import { defineUiKitSemanticTokens, defineUiKitTheme } from '@/define';

const semanticTokens = defineUiKitSemanticTokens({
  palette: {
    border: {
      error: 'color.dark.red.400',
    },
  },
});

export const theme = defineUiKitTheme({
  id: 'my-theme',
  prefix: 'crm-ui-kit',
  conditions: [":root[data-crm-ui-kit-theme='my-theme']"],
  semanticTokens,
});
```

> `conditions` omitted for default theme — applied globally.
>
> `isUiKitTheme` injected by `defineUiKitTheme` — do not set manually.

---

## Token values

Semantic token value is a **primitive path** — `'color.light.neutral.100'` (reference to color from `primitives`).

Valid keys and values enforced by TypeScript — IDE provides autocomplete and reports unknown keys.

---

## Registering a new theme

### Step 1 — create `themes/myTheme/index.ts`

```ts
import { defineUiKitSemanticTokens, defineUiKitTheme } from '@/define';

const semanticTokens = defineUiKitSemanticTokens({
  palette: {
    background: {
      default: 'color.dark.neutral.900',
    },
  },
});

export const theme = defineUiKitTheme({
  id: 'my-theme',
  prefix: 'crm-ui-kit',
  conditions: [":root[data-crm-ui-kit-theme='my-theme']"],
  semanticTokens,
});
```

### Step 2 — register in `themes/index.ts`

```ts
import { ThemeConfig } from '@/types/common';
import { lightUiKit } from './lightUiKit';
import { myTheme } from './myTheme';

export const themes: ThemeConfig[] = [lightUiKit, myTheme];
```

---

## Adding a new semantic token (ui-kit + tokens package)

New token lives in two places: CSS variable in `ui-kit`, CSS variable name in `tokens`.

### Step 1 — add CSS variable to `ui-kit`

Open `packages/ui-kit/src/stylesheets/theme.css` and add the variable to `:root`:

```css
:root {
  /* existing tokens... */
  --crm-ui-kit-palette-border-focus: #4c8bf7;
}
```

For dark theme override, also add to the `[data-crm-ui-kit-theme='alternative']` block if needed:

```css
:root[data-crm-ui-kit-theme='alternative'] {
  --crm-ui-kit-palette-border-focus: #1691ff;
}
```

### Step 2 — add CSS variable name to `Tokens`

Open `packages/tokens/src/types/ui-kit-tokens.ts` and add to the `Tokens` union:

```ts
export type Tokens =
  | ...existing tokens...
  | '--crm-ui-kit-palette-border-focus';  // <-- new
```

`SemanticUiKitTokensShape` in `src/types/semantic.ts` re-derives automatically — no manual shape edits needed.

> **If the variable name contains a multi-word segment that must not be split** (e.g. `focus-ring`), also add it to `AtomicSegments` in the same file:
>
> ```ts
> export type AtomicSegments =
>   | ...existing atoms...
>   | 'focus-ring';  // <-- prevents split into focus + ring
> ```
>
> Rule: add to `AtomicSegments` when the segment is a single semantic unit and splitting it would create a nonsensical key hierarchy.

### Step 3 — set value in theme configs (if needed)

If the token needs a non-default value in a specific theme, add it to that theme's `index.ts`:

```ts
// themes/alternativeUiKit/index.ts
const semanticTokens = defineUiKitSemanticTokens({
  palette: {
    border: {
      focus: 'color.dark.azure.400',
    },
  },
});
```

Only add where the value differs from the CSS default. No requirement to set in every theme.

---

## Removing a token

Two-stage process across major versions.

### Stage 1 — deprecate (before next major)

Mark the CSS variable with a comment in `theme.css`:

```css
:root {
  /** @deprecated Use --crm-ui-kit-palette-border-default instead. Removed in next major. */
  --crm-ui-kit-palette-border-focus: #4c8bf7;
}
```

Mark in `Tokens` union in `ui-kit-tokens.ts`:

```ts
export type Tokens =
  | ...
  /** @deprecated Use '--crm-ui-kit-palette-border-default' instead. */
  | '--crm-ui-kit-palette-border-focus';
```

### Stage 2 — remove (next major)

1. Delete CSS variable from `theme.css`
2. Remove from `Tokens` union in `ui-kit-tokens.ts`
3. Remove from `AtomicSegments` if applicable

Any theme config still referencing the removed token produces TypeScript error, guiding cleanup.
