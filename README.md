<h1 align="center">crm-react-ui-kit</h1>

Monorepo for Kommo React UI components and Storybook.

| Package | Description |
| ------- | ----------- |
| [`packages/ui-kit`](./packages/ui-kit/README.md) | `@kommo-crm/crm-react-ui-kit` — publishable React component library |
| [`packages/storybook`](./packages/storybook/README.md) | Storybook app for component preview and docs |

## Setup

```sh
yarn install && yarn build
```

## Commands

| Command                       | Runs                                      |
| ----------------------------- | ----------------------------------------- |
| `yarn build`                  | Build ui-kit                              |
| `yarn storybook`              | Start Storybook on port 6006              |
| `yarn build-storybook`        | Build Storybook for static hosting        |
| `yarn lint`                   | Lint all packages                         |
| `yarn test`                   | Run unit tests                            |
| `yarn test:e2e`               | Run Playwright screenshot tests (Docker)  |
| `make patch`                  | Publish patch release                     |
| `make minor`                  | Publish minor release                     |

## Contribute

Pull requests are welcome. See the [contribution guidelines](./.github/CONTRIBUTING.md) for more information.

## License

Source code is under a [custom license](./LICENCE) based on MIT.
