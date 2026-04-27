<h1 align="center">@kommo-crm/crm-react-ui-kit</h1>

> Ready-to-use React components that implement the design of [Kommo](https://www.kommo.com/)

For storybook preview see README in storybook package
[Storybook](https://storybook.kommo.com) preview

## Installation

| npm                                 | yarn                                   | pnpm                                   |
| ----------------------------------- | -------------------------------------- | -------------------------------------- |
| `npm i @kommo-crm/crm-react-ui-kit` | `yarn add @kommo-crm/crm-react-ui-kit` | `pnpm add @kommo-crm/crm-react-ui-kit` |

## Commands

| Command         | Runs                  |
| --------------- | --------------------- |
| `yarn build`    | Build the package     |
| `yarn lint`     | Lint the package      |
| `yarn lint:fix` | Lint and auto-fix     |
| `yarn tslint`   | TypeScript type check |

## Testing

**Run unit tests:**

```sh
yarn test
```

### Working with Playwright

> For `Playwright` to work, [Docker](https://www.docker.com) must be installed

**Run screenshot ci/cd tests:**

```sh
yarn test:e2e:ci
```

**Run e2e tests via Docker:**

```sh
yarn test:e2e
```

**Update snapshots via Docker:**

```sh
yarn test:e2e:update-snapshots
```

**Clear Playwright Docker cache:**

```sh
yarn docker:clear-playwright-cache
```

## Licenses

Source code is under a [custom license](./../../LICENCE) based on MIT.
