<h1 align="center">@kommo-crm/crm-tokens</h1>

> Design tokens for Kommo CRM — primitives available in multiple formats

## Installation

| npm                           | yarn                             | pnpm                             |
| ----------------------------- | -------------------------------- | -------------------------------- |
| `npm i @kommo-crm/crm-tokens` | `yarn add @kommo-crm/crm-tokens` | `pnpm add @kommo-crm/crm-tokens` |

## Available exports

| Export                             | Formats                      | Description                 |
| ---------------------------------- | ---------------------------- | --------------------------- |
| `@kommo-crm/crm-tokens/primitives` | JS/TS, CSS, SCSS, LESS, JSON | Base primitive token values |

### Format suffixes

| Suffix       | Import path example                          |
| ------------ | -------------------------------------------- |
| JS/TS        | `@kommo-crm/crm-tokens/{THEME_NAME}`         |
| CSS          | `@kommo-crm/crm-tokens/{THEME_NAME}/css`     |
| Minified CSS | `@kommo-crm/crm-tokens/{THEME_NAME}/min.css` |
| SCSS         | `@kommo-crm/crm-tokens/{THEME_NAME}/scss`    |
| LESS         | `@kommo-crm/crm-tokens/{THEME_NAME}/less`    |
| JSON         | `@kommo-crm/crm-tokens/{THEME_NAME}/json`    |

## Commands

| Command      | Runs                            |
| ------------ | ------------------------------- |
| `yarn build` | Build all token outputs         |
| `yarn dev`   | Watch mode — rebuild on changes |
| `yarn test`  | Run unit tests                  |

## Licenses

Source code is under a [custom license](./LICENCE) based on MIT.
