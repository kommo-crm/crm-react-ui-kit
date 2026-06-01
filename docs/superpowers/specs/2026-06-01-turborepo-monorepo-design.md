# Turborepo Monorepo Setup — Design Spec

## Overview

Convert the existing single-package repository into a Turborepo monorepo with two packages:
`packages/ui-kit` (the component library) and `packages/storybook` (the Storybook app).
File structure changes are already done in `feature/27-v3`. This spec covers all code changes
that go into `feature/27-v3-changes`.

---

## 1. File Structure

```
/
├── package.json              # workspace root (@kommo-crm/monorepo, private)
├── turbo.json                # turborepo pipeline
├── tsconfig.base.json        # shared TS base config (moved from packages/ui-kit/tsconfig.json)
├── eslint.config.mjs         # shared eslint config (stays at root)
├── .prettierrc               # shared prettier config (stays at root)
├── .husky/                   # git hooks (stays at root)
├── LICENCE                   # root licence (copied to ui-kit on publish)
├── README.md                 # monorepo overview
├── packages/
│   ├── ui-kit/
│   │   ├── package.json      # @kommo-crm/crm-react-ui-kit
│   │   ├── tsconfig.json     # extends ../../tsconfig.base.json
│   │   ├── tsconfig.build.json
│   │   ├── vite.config.ts
│   │   ├── jest.config.ts
│   │   ├── playwright-ct.config.ts
│   │   ├── postcss.config.mjs
│   │   ├── docker-compose.yml
│   │   ├── scripts/
│   │   ├── src/
│   │   └── README.md
│   └── storybook/
│       ├── package.json      # @kommo-crm/storybook (private)
│       ├── tsconfig.json     # extends ../../tsconfig.base.json
│       ├── Dockerfile
│       ├── .dockerignore
│       ├── nginx/
│       ├── .storybook/
│       ├── storybook/
│       ├── stories/
│       ├── locales/
│       ├── public/
│       └── README.md
```

---

## 2. Turborepo Pipeline (`turbo.json`)

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "lint": {
      "outputs": []
    },
    "test": {
      "outputs": ["coverage/**"]
    },
    "test:e2e": {
      "dependsOn": ["^build"],
      "outputs": ["playwright-report/**", "e2e-results.json"]
    },
    "storybook": {
      "dependsOn": ["^build"],
      "cache": false,
      "persistent": true
    },
    "build-storybook": {
      "dependsOn": ["^build"],
      "outputs": ["storybook-static/**"]
    }
  }
}
```

`storybook`, `build-storybook`, and `test:e2e` all wait for `ui-kit` build to complete first
(`^build` resolves workspace dependencies).

---

## 3. Root `package.json`

```json
{
  "name": "@kommo-crm/monorepo",
  "private": true,
  "workspaces": ["packages/*"],
  "scripts": {
    "build": "turbo run build",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "test:e2e": "turbo run test:e2e",
    "storybook": "turbo run storybook",
    "build-storybook": "turbo run build-storybook",
    "prepare": "husky"
  },
  "devDependencies": {
    "turbo": "latest",
    "husky": "9.1.7",
    "concurrently": "9.1.2"
  }
}
```

All other devDependencies move to the package that needs them.

---

## 4. `packages/ui-kit/package.json`

Current root `package.json` moves here with these changes:
- Remove storybook-related devDependencies (move to `packages/storybook`)
- Remove `storybook` / `build-storybook` scripts
- Add `prepublishOnly` to copy the root LICENCE:

```json
"scripts": {
  "prepublishOnly": "cp ../../LICENCE ./LICENCE",
  "build": "rm -rf dist && tsc -p tsconfig.build.json && vite build",
  "test": "jest --maxWorkers 2",
  "test:e2e": "./scripts/generate_env.docker.sh && docker compose --env-file=./.env.docker up --abort-on-container-exit",
  "test:e2e:ci": "playwright test --config playwright-ct.config.ts",
  "eslint": "eslint --quiet",
  "tslint": "tsc --noEmit -p tsconfig.build.json",
  "lint": "concurrently --kill-others-on-fail \"yarn eslint\" \"yarn tslint\""
}
```

---

## 5. `packages/storybook/package.json`

New file:
```json
{
  "name": "@kommo-crm/storybook",
  "private": true,
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "lint": "eslint --quiet"
  },
  "dependencies": {
    "@kommo-crm/crm-react-ui-kit": "*"
  },
  "devDependencies": {
    "@storybook/addon-essentials": "8.6.0",
    "@storybook/blocks": "8.6.0",
    "@storybook/react": "8.6.0",
    "@storybook/react-vite": "8.6.0",
    "@storybook/test": "8.6.0",
    "storybook": "8.6.0",
    "@vitejs/plugin-react": "4.3.1",
    "vite": "5.4.2",
    "vite-plugin-svgr": "4.2.0",
    "postcss-color-function": "4.1.0",
    "postcss-import": "16.1.0",
    "postcss-nested": "6.2.0",
    "postcss-preset-env": "10.0.2",
    "react-docgen-typescript": "2.2.2",
    "@types/react": "18",
    "@types/react-dom": "18",
    "react": "18",
    "react-dom": "18",
    "typescript": "5.5.4"
  }
}
```

---

## 6. Shared TypeScript Config

`tsconfig.base.json` at root — extracted from current `packages/ui-kit/tsconfig.json`,
removing package-specific paths:

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "declaration": true,
    "declarationMap": true,
    "module": "esnext",
    "target": "esnext",
    "jsx": "react",
    "moduleResolution": "node"
  }
}
```

`packages/ui-kit/tsconfig.json`:
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "outDir": "./dist/",
    "paths": {
      "src/*": ["./src/*"]
    }
  },
  "include": ["./**/*.tsx", "./**/*.ts"],
  "exclude": ["node_modules"]
}
```

`packages/storybook/tsconfig.json` (new):
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "src/*": ["../ui-kit/src/*"],
      "@ui-kit/*": ["../ui-kit/src/*"],
      "@storybook-utils/*": ["./storybook/*"],
      "@i18n": ["./.storybook/i18n.ts"]
    }
  },
  "include": ["./**/*.tsx", "./**/*.ts", ".storybook/**/*"],
  "exclude": ["node_modules"]
}
```

---

## 7. Alias Strategy

Consistent aliases across tsconfig, vite, jest, and playwright configs:

| Alias | Resolves to | Used in |
|---|---|---|
| `src/*` | `./src/*` (relative to package) | ui-kit internals |
| `@ui-kit/*` | `packages/ui-kit/src/*` | storybook → ui-kit |
| `@storybook-utils/*` | `packages/storybook/storybook/*` | storybook, ui-kit e2e |
| `@i18n` | `packages/storybook/.storybook/i18n.ts` | storybook |

**Approach:** define aliases upfront, then fix errors iteratively by running `tsc`, `vite build`,
`jest`, and `playwright` and resolving failures.

**`packages/ui-kit/vite.config.ts`** — remove `@i18n` alias (storybook concern):
```ts
alias: { 'src': resolve(__dirname, './src') }
```

**`packages/ui-kit/jest.config.ts`** — remove `@storybook-utils` mapper

**`packages/storybook/.storybook/main.ts`** — update story globs and aliases to use `@ui-kit`

---

## 8. READMEs

**Root `README.md`** — monorepo overview: packages list, top-level turbo commands, links to
each package README, contributing guide.

**`packages/ui-kit/README.md`** — current root README (installation, API, testing commands).

**`packages/storybook/README.md`** — how to run storybook locally, how to add a story,
docker build instructions.

---

## 9. Licence Copy

`prepublishOnly` in `packages/ui-kit/package.json`:
```sh
cp ../../LICENCE ./LICENCE
```

Copies the root `LICENCE` file into the package before `npm publish`, so it ships in the
published tarball. The copied file is gitignored via `packages/ui-kit/.gitignore` (or root
`.gitignore` glob).

---

## 10. Husky Pre-commit Hook

Current hook runs `yarn lint` from root. After changes, root `yarn lint` calls `turbo run lint`
which runs lint in each package. The hook needs no changes — turborepo handles routing.
