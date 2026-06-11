# @kommo-crm/monorepo

Monorepo for Kommo CRM React UI Kit — a collection of ready-to-use React components implementing the Kommo design system.

## Packages

| Package | Description |
| --- | --- |
| [`@kommo-crm/crm-react-ui-kit`](./packages/ui-kit) | Component library |
| [`@kommo-crm/storybook`](./packages/storybook) | Storybook documentation app |

## Requirements

- Node.js >= 20
- Yarn 1.22.x

## Setup

```sh
yarn install
```

## Commands

| Command | Description |
| --- | --- |
| `yarn build` | Build all packages |
| `yarn lint` | Lint all packages |
| `yarn test` | Run unit tests |
| `yarn test:e2e` | Run e2e tests (requires Docker) |
| `yarn storybook` | Start Storybook on port 6006 |
| `yarn build-storybook` | Build Storybook for static hosting |

## Contributing

Pull requests are welcome. See the [contribution guidelines](./.github/CONTRIBUTING.md).

## License

Source code is under a [custom license](./LICENCE) based on MIT.
