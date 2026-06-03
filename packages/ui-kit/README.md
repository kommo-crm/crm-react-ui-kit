# @kommo-crm/crm-react-ui-kit

Ready-to-use React components that implement the design of [Kommo](https://www.kommo.com/).

[Storybook](https://storybook.kommo.com) preview

## Installation

| npm | yarn | pnpm |
| --- | --- | --- |
| `npm i @kommo-crm/crm-react-ui-kit` | `yarn add @kommo-crm/crm-react-ui-kit` | `pnpm add @kommo-crm/crm-react-ui-kit` |

## Commands

Run from the monorepo root or from this package directory:

| Command | Description |
| --- | --- |
| `yarn build` | Build the library |
| `yarn lint` | Lint the source |
| `yarn test` | Run unit tests |
| `yarn test:e2e` | Run Playwright screenshot tests (requires Docker) |
| `yarn test:e2e:update-snapshots` | Regenerate screenshots |

## Testing

**Unit tests:**

```sh
yarn test
```

**Screenshot tests** (requires [Docker](https://www.docker.com)):

```sh
yarn test:e2e
```

**Update screenshots:**

```sh
yarn test:e2e:update-snapshots
# With grep filter:
yarn test:e2e:update-snapshots -g button
```

## License

Source code is under a [custom license](../../LICENCE) based on MIT.
