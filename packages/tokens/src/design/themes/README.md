# Themes

Each theme is a folder inside `themes/` containing three files.

## Folder structure

```
themes/
├── index.ts          # Theme registry
├── light/
│   ├── index.ts      # ThemeConfig
│   ├── semantic.ts   # Semantic tokens
│   └── component.ts  # Component tokens
└── dark/
    ├── index.ts
    ├── semantic.ts
    └── component.ts
```

## Theme files

### `index.ts` — theme config

```ts
import semanticTokens from './semantic';
import componentTokens from './component';
import { ThemeConfig } from '@/types/common';

const myTheme: ThemeConfig = {
  id: 'my-theme',          // unique identifier
  semanticTokens,
  componentTokens,
  conditions: [            // CSS selectors that activate this theme
    ":root[data-crm-ui-kit-theme='my-theme']",
  ],
};

export default myTheme;
```

> `conditions` are not needed for the default theme (light). A theme without `conditions` is applied globally.

---

### `semantic.ts` — semantic tokens

Shared color palette tokens: backgrounds, text, borders, etc.

```ts
import { SemanticTokens } from '@/types/semantic';

const semanticTokens: SemanticTokens = {
  palette: {
    background: {
      default: 'color.light.neutral.100',
    },
    foreground: {
      primary: 'color.light.neutral.800',
    },
  },
};

export default semanticTokens;
```

---

### `component.ts` — component tokens

Tokens specific to individual components.

```ts
import { ComponentTokens } from '@/types/component';

const componentTokens: ComponentTokens = {
  palette: {
    button: {
      classic: {
        background: 'color.light.neutral.100',
      },
    },
  },
};

export default componentTokens;
```

---

## The `$` key

`$` is the default value for a node that has both nested variants and a base value of its own.

```ts
background: {
  default: {
    $: 'color.light.neutral.100',      // → var(--palette-background-default)
    disabled: 'color.light.azure.900', // → var(--palette-background-default-disabled)
  },
}
```

Without `$`, the `default` object would only be a container for nested tokens and would not generate a CSS variable for `background-default` itself.

```ts
// Without $: --palette-background-primary is NOT generated
primary: {
  hover: 'color.light.blue.100',
}

// With $: both variables are generated
primary: {
  $: 'color.light.blue.600',        // --palette-background-primary
  hover: 'color.light.blue.100',    // --palette-background-primary-hover
}
```

---

## Token values

A token can be:

- **a primitive path** — `'color.light.neutral.100'` (reference to a color from `primitives`)
- **a raw CSS value** — `'rgba(234, 234, 234, 0.9)'` (used as-is)

---

## Registering a new theme

Add the import to `themes/index.ts`:

```ts
import { ThemeConfig } from '@/types/common';
import dark from './dark';
import light from './light';
import myTheme from './my-theme';

const themes: ThemeConfig[] = [light, dark, myTheme];

export default themes;
```
