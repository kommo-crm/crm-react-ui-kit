# crm-react-ui-kit Storybook

Storybook for [@kommo-crm/crm-react-ui-kit](../ui-kit/README.md). Preview: [storybook.kommo.com](https://storybook.kommo.com)

## Commands

| Command                | Runs                               |
| ---------------------- | ---------------------------------- |
| `yarn storybook`       | Start Storybook on port 6006       |
| `yarn build-storybook` | Build Storybook for static hosting |
| `yarn lint`            | Lint stories and config            |

Run from repo root or from this directory.

## Docker

Build and push the Storybook image (requires `REGISTRY_URL` env var):

```sh
make build-storybook
make push-storybook
# or both at once:
make storybook
```

The `Dockerfile` uses the repo root as build context — always run `docker build` from the repo root or via `make`.
