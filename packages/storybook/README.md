# @kommo-crm/storybook

Storybook documentation app for `@kommo-crm/crm-react-ui-kit`.

## Requirements

- Node.js >= 20
- Yarn 1.22.x
- Run `yarn install` from the monorepo root first

## Commands

| Command | Description |
| --- | --- |
| `yarn storybook` | Start Storybook dev server on port 6006 |
| `yarn build-storybook` | Build static Storybook |

## Docker Build

Builds a static Storybook and serves it via nginx:

```sh
docker build -t storybook .
```

## Adding a Story

1. Create `ComponentName.stories.tsx` inside `packages/ui-kit/src/components/ComponentName/`
2. Import the component from `src/components/ComponentName`
3. Storybook picks it up automatically via the glob in `.storybook/main.ts`
