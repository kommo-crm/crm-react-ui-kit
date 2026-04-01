<h1 align="center">@kommo-crm/crm-react-ui-kit</h1>

> Ready-to-use React components that implement the design of [Kommo](https://www.kommo.com/)

[Storybook](https://storybook.kommo.com) preview

## Installation

| npm | yarn | pnpm |
| --- | ---- | ---- |
| `npm i @kommo-crm/crm-react-ui-kit` | `yarn add @kommo-crm/crm-react-ui-kit` | `pnpm add @kommo-crm/crm-react-ui-kit` |

## Commands

| Command | Runs |
| ------- | ---- |
| `yarn lint` | Lint the package |
| `yarn lint:fix` | Lint and auto-fix |
| `yarn storybook` | Start Storybook on port 6006 |
| `yarn build-storybook` | Build Storybook for static hosting |
| `yarn build` | Build the package |

## Testing

**Run unit tests:**

```sh
yarn test
```

### Working with Playwright

> For `Playwright` to work, [Docker](https://www.docker.com) must be installed

**Run screenshot tests:**

```sh
yarn test:e2e
```

**Update screenshots:**

```sh
yarn test:e2e:update-snapshots
```

## Licenses

Source code is under a [custom license](./LICENCE) based on MIT.
