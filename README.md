<h1 align="center">Kommo CRM React UI Kit</h1>

> Repo containing React UI components and design tokens for [Kommo](https://www.kommo.com/)

## Packages

| Package                                            | Description                                             | Docs                                      |
| -------------------------------------------------- | ------------------------------------------------------- | ----------------------------------------- |
| [`@kommo-crm/crm-react-ui-kit`](./packages/ui-kit) | Ready-to-use React components implementing Kommo design | [README](./packages/ui-kit/README.md)     |
| [`@kommo-crm/crm-tokens`](./packages/crm-tokens)   | Design tokens (primitives)                              | [README](./packages/crm-tokens/README.md) |
| [`@kommo-crm/storybook`](./packages/storybook)     | Storybook workspace for ui-kit docs and demos           | [README](./packages/storybook/README.md)  |

## Getting started

```sh
yarn install && yarn build
```

## Commands

| Command                          | Runs                                   |
| -------------------------------- | -------------------------------------- |
| `yarn build`                     | Build all packages                     |
| `yarn build:ui-kit`              | Build ui-kit only                      |
| `yarn build:tokens`              | Build tokens only                      |
| `yarn dev`                       | Start dev mode for all packages        |
| `yarn lint`                      | Lint all packages                      |
| `yarn lint:fix`                  | Lint and auto-fix all packages         |
| `yarn storybook`                 | Start Storybook on port 6006           |
| `yarn build:storybook`           | Build Storybook for static hosting     |
| `yarn test:tokens`               | Run tokens unit tests                  |
| `yarn test:e2e`                  | Run ui-kit Playwright screenshot tests |
| `yarn test:e2e:update-snapshots` | Run ui-kit update screenshots          |

**Generate screenshots with grep filter:**

```sh
yarn test:e2e:update-snapshots -g button
```

## Contribute to this repo

Pull requests are welcome. See the [contribution guidelines](./.github/CONTRIBUTING.md) for more information.

## Licenses

Source code is under a [custom license](./LICENCE) based on MIT.
