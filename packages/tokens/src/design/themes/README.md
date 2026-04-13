# Themes

Each theme is a folder inside `themes/` containing three files.

## Folder structure

```
themes/
├── index.ts              # Theme registry
├── light/
│   ├── index.ts          # Theme config
│   ├── semantic.ts       # Semantic tokens
│   └── component.ts      # Component tokens
└── alternative/
    ├── index.ts
    ├── semantic.ts
    └── component.ts
```

## Theme files

### `semantic.ts` — semantic tokens

Shared tokens: backgrounds, text, borders, etc. Only override what differs from the default theme.

```ts
import { defineUiKitSemanticTokens } from '@/define';

export default defineUiKitSemanticTokens({
  palette: {
    background: {
      default: 'color.light.neutral.100',
    },
    text: {
      primary: 'color.light.neutral.800',
    },
  },
});
```

---

### `component.ts` — component tokens

Tokens specific to individual components.

```ts
import { defineUiKitComponentTokens } from '@/define';

export default defineUiKitComponentTokens({
  input: {
    error: {
      description: {
        color: 'color.light.red.600',
      },
    },
  },
});
```

---

### `index.ts` — theme config

```ts
import { defineUiKitTheme } from '@/define';
import semanticTokens from './semantic';
import componentTokens from './component';

export default defineUiKitTheme({
  id: 'my-theme', // unique identifier
  prefix: 'crm-ui-kit', // CSS variable prefix
  conditions: [
    // CSS selectors that activate this theme
    ":root[data-crm-ui-kit-theme='my-theme']",
  ],
  semanticTokens,
  componentTokens,
});
```

> `conditions` are not needed for the default theme. A theme without `conditions` is applied globally.
>
> `isUiKitTheme` is injected automatically by `defineUiKitTheme` — do not set it manually.

---

## Token values

A token value can be:

- **a primitive path** — `'color.light.neutral.100'` (reference to a color from `primitives`)
- **a semantic path** — `'palette.text.primary'` (reference to a semantic token, for component tokens only)

The set of valid keys and values is enforced by TypeScript — the IDE will provide autocomplete and report errors on unknown keys.

---

## Registering a new theme

### Step 1 — create `themes/myTheme/semantic.ts`

```ts
import { defineUiKitSemanticTokens } from '@/define';

export default defineUiKitSemanticTokens({
  palette: {
    border: {
      error: 'color.dark.red.400',
    },
  },
});
```

### Step 2 — create `themes/myTheme/component.ts`

```ts
import { defineUiKitComponentTokens } from '@/define';

export default defineUiKitComponentTokens({
  input: {
    error: {
      description: {
        color: 'color.dark.red.300',
      },
    },
  },
});
```

### Step 3 — create `themes/myTheme/index.ts`

Non-default themes must include `conditions` — CSS selectors that activate the theme:

```ts
import { defineUiKitTheme } from '@/define';
import semanticTokens from './semantic';
import componentTokens from './component';

export default defineUiKitTheme({
  id: 'my-theme',
  prefix: 'crm-ui-kit',
  conditions: [":root[data-crm-ui-kit-theme='my-theme']"],
  semanticTokens,
  componentTokens,
});
```

### Step 4 — register in `themes/index.ts`

```ts
import { ThemeConfig } from '@/types/common';
import lightUiKit from './lightUiKit';
import myTheme from './myTheme';

const themes: ThemeConfig[] = [lightUiKit, myTheme];

export default themes;
```

---

## Adding a new token

Tokens are defined in types first, then optionally given values in theme configs.

### Step 1 — add the key to the type shape

Open `src/types/semantic.ts` (or `component.ts` for component tokens) and add the new field to the shape type:

```ts
// src/types/semantic.ts
type SemanticUiKitTokensShape = {
  palette: {
    border: {
      default: TokenSemanticValue;
      error: TokenSemanticValue;
      focus: TokenSemanticValue;   // <-- new token
    };
  };
};
```

The field becomes available in all themes immediately after this change. `SemanticUiKitTokenPath` is re-derived automatically — no other type file needs to be touched.

### Step 2 — set the value in theme configs (if needed)

If the token requires a non-default value in a specific theme, add it to that theme's `semantic.ts` or `component.ts`:

```ts
// themes/alternative/semantic.ts
export default defineUiKitSemanticTokens({
  palette: {
    border: {
      focus: 'color.dark.azure.400',   // <-- value for this theme
    },
  },
});
```

> Only add values to themes where the token differs from the default. There is no requirement to set a value in every theme.

---

## Removing a token

Tokens are removed in two stages across major versions to avoid breaking consumers.

### Stage 1 — mark as `@deprecated` (before the next major release)

Add a `@deprecated` JSDoc comment to the field in the shape type:

```ts
// src/types/semantic.ts
type SemanticUiKitTokensShape = {
  palette: {
    border: {
      default: TokenSemanticValue;
      /** @deprecated Use `palette.border.default` instead. Will be removed in the next major release. */
      'border-default': TokenSemanticValue;
    };
  };
};
```

The IDE will show a strikethrough on any usages and display the deprecation message. The token continues to work normally until the major release.

### Stage 2 — remove in the next major release

Delete the field from the shape type and remove all values from theme configs:

```ts
// src/types/semantic.ts
type SemanticUiKitTokensShape = {
  palette: {
    border: {
      default: TokenSemanticValue;
      // 'border-default' removed
    };
  };
};
```

Any theme config that still references the removed token will produce a TypeScript error, guiding the cleanup.
