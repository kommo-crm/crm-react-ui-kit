# @kommo-crm/crm-tokens

Shared design tokens for Kommo CRM UI. Provides color primitives in CSS, SCSS,
Less, and JavaScript/TypeScript formats, generated from a single JSON source of
truth and validated against a token contract at build time.

## Installation

```sh
npm i @kommo-crm/crm-tokens
# or
yarn add @kommo-crm/crm-tokens
```

## Usage

### CSS

Import the package to add the CSS custom properties to `:root`:

```css
@import '@kommo-crm/crm-tokens/css/primitives';

.button {
  background: var(--color-light-blue-500);
}
```

### SCSS

```scss
@use '@kommo-crm/crm-tokens/scss/primitives' as *;
```

### Less

```less
@import '@kommo-crm/crm-tokens/less/primitives';
```

### JavaScript / TypeScript

The JS export provides typed access to each token's resolved value and CSS
variable name:

```ts
import { color } from '@kommo-crm/crm-tokens';

color.light.blue[500].value; // '#4c8bf7'
color.light.blue[500].cssVar; // '--color-light-blue-500'
```

Every token has the following shape:

```ts
interface Token {
  value: string; // resolved CSS value
  cssVar: string; // CSS custom property name, e.g. '--color-light-blue-500'
}
```

### JSON

All tokens in a single file — useful for docs generation or tools that don't
support CSS variables:

```ts
import tokens from '@kommo-crm/crm-tokens/json';
```

## Token structure

| Category         | Path pattern                     | Example variable        |
| ---------------- | -------------------------------- | ----------------------- |
| Primitive colors | `color.{theme}.{group}.{shade}`  | `--color-dark-blue-500` |

## Development

```sh
yarn build   # generate dist/ (CSS, SCSS, Less, JS, d.ts, JSON)
yarn watch   # rebuild on token changes
yarn test    # run the format/tree/contract test suites
yarn lint    # lint the package sources
```

Tokens are authored under `tokens/` and compiled by
[Style Dictionary](https://styledictionary.com/). The build writes into a
temporary directory, validates the generated CSS against `requiredTokens`
(`tokens.config.ts`), and atomically swaps it into `dist/` only on success.
