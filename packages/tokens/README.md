<h1 align="center">@kommo-crm/tokens</h1>

> Design tokens for Kommo CRM — primitives and themes, available in multiple formats

## Installation

| npm                       | yarn                         | pnpm                         |
| ------------------------- | ---------------------------- | ---------------------------- |
| `npm i @kommo-crm/tokens` | `yarn add @kommo-crm/tokens` | `pnpm add @kommo-crm/tokens` |

## Available exports

| Export                                 | Formats                      | Description                       |
| -------------------------------------- | ---------------------------- | --------------------------------- |
| `@kommo-crm/tokens/primitives`         | JS/TS, CSS, SCSS, LESS, JSON | Base primitive token values       |
| `@kommo-crm/tokens/ui-kit/light`       | JS/TS, CSS, SCSS, LESS, JSON | Light theme semantic tokens       |
| `@kommo-crm/tokens/ui-kit/alternative` | JS/TS, CSS, SCSS, LESS, JSON | Alternative theme semantic tokens |
| `@kommo-crm/tokens/light`              | JS/TS, CSS, SCSS, LESS, JSON | Light theme tokens                |
| `@kommo-crm/tokens/dark`               | JS/TS, CSS, SCSS, LESS, JSON | Dark theme tokens                 |

### Format suffixes

| Suffix       | Import path example                      |
| ------------ | ---------------------------------------- |
| JS/TS        | `@kommo-crm/tokens/{THEME_NAME}`         |
| CSS          | `@kommo-crm/tokens/{THEME_NAME}/css`     |
| Minified CSS | `@kommo-crm/tokens/{THEME_NAME}/min.css` |
| SCSS         | `@kommo-crm/tokens/{THEME_NAME}/scss`    |
| LESS         | `@kommo-crm/tokens/{THEME_NAME}/less`    |
| JSON         | `@kommo-crm/tokens/{THEME_NAME}/json`    |

## Commands

| Command      | Runs                            |
| ------------ | ------------------------------- |
| `yarn build` | Build all token outputs         |
| `yarn dev`   | Watch mode — rebuild on changes |
| `yarn test`  | Run unit tests                  |

## Licenses

Source code is under a [custom license](./LICENCE) based on MIT.
