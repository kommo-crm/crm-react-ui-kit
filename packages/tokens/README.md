<h1 align="center">@kommo-crm/tokens</h1>

> Design tokens for Kommo CRM — primitives and light/dark themes, available in multiple formats

## Installation

| npm                       | yarn                         | pnpm                         |
| ------------------------- | ---------------------------- | ---------------------------- |
| `npm i @kommo-crm/tokens` | `yarn add @kommo-crm/tokens` | `pnpm add @kommo-crm/tokens` |

## Available exports

| Export                         | Formats                      | Description                 |
| ------------------------------ | ---------------------------- | --------------------------- |
| `@kommo-crm/tokens/primitives` | JS/TS, CSS, SCSS, LESS, JSON | Base primitive token values |
| `@kommo-crm/tokens/light`      | JS/TS, CSS, SCSS, LESS, JSON | Light theme semantic tokens |
| `@kommo-crm/tokens/dark`       | JS/TS, CSS, SCSS, LESS, JSON | Dark theme semantic tokens  |

### Format suffixes

| Suffix       | Import path example               |
| ------------ | --------------------------------- |
| JS/TS        | `@kommo-crm/tokens/light`         |
| CSS          | `@kommo-crm/tokens/light/css`     |
| Minified CSS | `@kommo-crm/tokens/light/min.css` |
| SCSS         | `@kommo-crm/tokens/light/scss`    |
| LESS         | `@kommo-crm/tokens/light/less`    |
| JSON         | `@kommo-crm/tokens/light/json`    |

## Commands

| Command      | Runs                            |
| ------------ | ------------------------------- |
| `yarn build` | Build all token outputs         |
| `yarn dev`   | Watch mode — rebuild on changes |
| `yarn test`  | Run unit tests                  |

## Licenses

Source code is under a [custom license](./LICENCE) based on MIT.
