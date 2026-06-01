<h1 align="center">@kommo-crm/crm-react-ui-kit</h1>

> Ready-to-use React components that implement the design of [Kommo](https://www.kommo.com/)

[Storybook](https://storybook.kommo.com) preview

## Installation

| npm                                 | yarn                                   | pnpm                                   |
| ----------------------------------- | -------------------------------------- | -------------------------------------- |
| `npm i @kommo-crm/crm-react-ui-kit` | `yarn add @kommo-crm/crm-react-ui-kit` | `pnpm add @kommo-crm/crm-react-ui-kit` |

## Commands

### Install dependencies and build

```sh
yarn install && yarn build
```

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

**Generate screenshots:**

```sh
yarn test:e2e:update-snapshots
```

**Generate screenshots with grep filter:**

```sh
yarn test:e2e:update-snapshots -g button
```

## Contribute to this repo

Pull requests are welcome. See the [contribution guidelines](../../.github/CONTRIBUTING.md) for more information.

## License

Source code is under a [custom license](../../LICENCE) based on MIT.
