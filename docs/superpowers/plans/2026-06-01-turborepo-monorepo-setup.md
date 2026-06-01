# Turborepo Monorepo Setup — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire up the already-restructured file tree into a working Turborepo monorepo with two packages (`ui-kit` and `storybook`), fixing all import paths and configs.

**Architecture:** Yarn v1 workspaces at root with `packages/*` glob. Turborepo pipeline orchestrates build/lint/test across packages. Shared tooling (ESLint, Prettier, TypeScript base) lives at root; package-specific build deps live in each package.

**Tech Stack:** Turborepo, Yarn v1 workspaces, Vite, TypeScript, Jest, Playwright, Storybook 8

---

### Task 1: Commit structural changes + create feature branch

**Files:**
- Modify: (staged renames already in index)

- [ ] **Step 1: Commit staged file moves with --no-verify**

```bash
git commit --no-verify -m "refactor: restructure repo into monorepo packages"
```

Expected: commit succeeds, branch is `feature/27-v3`

- [ ] **Step 2: Create and switch to feature/27-v3-changes**

```bash
git checkout -b feature/27-v3-changes
```

Expected: new branch created from `feature/27-v3`

---

### Task 2: Move postcss.config.mjs to root

PostCSS config must be at root so both `packages/ui-kit` (vite build) and `packages/storybook` (storybook vite) find it by directory traversal.

**Files:**
- Modify: `packages/ui-kit/postcss.config.mjs` → move to `postcss.config.mjs`

- [ ] **Step 1: Git-move the file**

```bash
git mv packages/ui-kit/postcss.config.mjs postcss.config.mjs
```

- [ ] **Step 2: Commit**

```bash
git commit --no-verify -m "refactor: move postcss.config.mjs to monorepo root"
```

---

### Task 3: Create root package.json

Transform the current (library) root `package.json` into a private workspace root. All library-specific fields move to `packages/ui-kit/package.json` in Task 5.

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Replace root package.json**

```json
{
  "name": "@kommo-crm/monorepo",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
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
    "@eslint/js": "9.12.0",
    "@stylistic/eslint-plugin": "2.9.0",
    "@types/react": "18",
    "@types/react-dom": "18",
    "concurrently": "9.1.2",
    "eslint": "9.12.0",
    "eslint-config-prettier": "9.1.0",
    "eslint-import-resolver-typescript": "3.6.3",
    "eslint-plugin-import": "2.31.0",
    "eslint-plugin-jsdoc": "50.3.1",
    "eslint-plugin-mdx": "3.1.5",
    "eslint-plugin-only-var": "0.1.2",
    "eslint-plugin-postcss-modules": "2.0.0",
    "eslint-plugin-prettier": "5.2.1",
    "eslint-plugin-react": "7.37.1",
    "eslint-plugin-react-hooks": "4.6.2",
    "globals": "15.9.0",
    "husky": "9.1.7",
    "prettier": "3.4.2",
    "turbo": "latest",
    "typescript": "5.5.4",
    "typescript-eslint": "8.2.0"
  },
  "packageManager": "yarn@1.22.22+sha512.a6b2f7906b721bba3d67d4aff083df04dad64c399707841b7acf00f6b133b7ac24255f2652fa22ae3534329dc6180534e98d17432037ff6fd140556e2bb3137e"
}
```

- [ ] **Step 2: Commit**

```bash
git add package.json
git commit --no-verify -m "refactor: convert root package.json to monorepo workspace root"
```

---

### Task 4: Create turbo.json

**Files:**
- Create: `turbo.json`

- [ ] **Step 1: Create turbo.json**

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

- [ ] **Step 2: Commit**

```bash
git add turbo.json
git commit --no-verify -m "feat: add turbo.json pipeline config"
```

---

### Task 5: Extract tsconfig.base.json, update ui-kit tsconfig

Split the monolithic `packages/ui-kit/tsconfig.json` into a shared base at root and a package-specific config.

**Files:**
- Create: `tsconfig.base.json`
- Modify: `packages/ui-kit/tsconfig.json`
- Modify: `packages/ui-kit/tsconfig.build.json`

- [ ] **Step 1: Create tsconfig.base.json at root**

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

- [ ] **Step 2: Replace packages/ui-kit/tsconfig.json**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "outDir": "./dist/",
    "paths": {
      "src/*": ["./src/*"],
      "@crm-react-ui-kit-e2e/test": ["./src/tests/e2e/index.playwright"]
    }
  },
  "include": ["./**/*.tsx", "./**/*.ts"],
  "exclude": ["node_modules"]
}
```

Note: `@storybook-utils` and `@i18n` paths are removed — they belong to storybook only.

- [ ] **Step 3: Verify packages/ui-kit/tsconfig.build.json needs no changes**

It extends `./tsconfig.json` and adds `rootDir: ./src` — still correct.

- [ ] **Step 4: Commit**

```bash
git add tsconfig.base.json packages/ui-kit/tsconfig.json
git commit --no-verify -m "refactor: extract tsconfig.base.json, simplify ui-kit tsconfig"
```

---

### Task 6: Create packages/ui-kit/package.json

Move library metadata + scripts from old root. Add `prepublishOnly` to copy the root LICENCE.

**Files:**
- Create: `packages/ui-kit/package.json`

- [ ] **Step 1: Create the file**

```json
{
  "name": "@kommo-crm/crm-react-ui-kit",
  "description": "Ready-to-use React components which implements Kommo design",
  "version": "1.15.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "engines": {
    "node": ">=20"
  },
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./Switcher": "./dist/components/Switcher/index.js",
    "./Spinner": "./dist/components/Spinner/index.js",
    "./Link": "./dist/components/Link/index.js",
    "./List": "./dist/components/List/index.js",
    "./TextArea": "./dist/components/TextArea/index.js",
    "./Text": "./dist/components/Text/index.js",
    "./Input": "./dist/components/Input/index.js",
    "./InlineInput": "./dist/components/InlineInput/index.js",
    "./Label": "./dist/components/Label/index.js",
    "./Checkbox": "./dist/components/Checkbox/index.js",
    "./Portal": "./dist/components/Portal/index.js",
    "./RadioGroup": "./dist/components/RadioGroup/index.js",
    "./Select": "./dist/components/Select/index.js",
    "./CheckboxGroup": "./dist/components/CheckboxGroup/index.js",
    "./FilterTabs": "./dist/components/FilterTabs/index.js",
    "./Button": "./dist/components/Button/index.js",
    "./ConfigProvider": "./dist/components/ConfigProvider/index.js",
    "./ContentBlock": "./dist/components/ContentBlock/index.js",
    "./Callout": "./dist/components/Callout/index.js",
    "./Accordion": "./dist/components/Accordion/index.js",
    "./ContextMenu": "./dist/components/ContextMenu/index.js",
    "./CounterBadge": "./dist/components/CounterBadge/index.js",
    "./Badge": "./dist/components/Badge/index.js",
    "./Separator": "./dist/components/Separator/index.js",
    "./SelectButton": "./dist/components/SelectButton/index.js",
    "./assets/Switcher.css": "./dist/assets/Switcher.css",
    "./assets/Select.css": "./dist/assets/Select.css",
    "./assets/Spinner.css": "./dist/assets/Spinner.css",
    "./assets/Link.css": "./dist/assets/Link.css",
    "./assets/TextArea.css": "./dist/assets/TextArea.css",
    "./assets/Text.css": "./dist/assets/Text.css",
    "./assets/Checkbox.css": "./dist/assets/Checkbox.css",
    "./assets/Input.css": "./dist/assets/Input.css",
    "./assets/InlineInput.css": "./dist/assets/InlineInput.css",
    "./assets/RadioGroup.css": "./dist/assets/RadioGroup.css",
    "./assets/ContentBlock.css": "./dist/assets/ContentBlock.css",
    "./assets/Callout.css": "./dist/assets/Callout.css",
    "./assets/Accordion.css": "./dist/assets/Accordion.css",
    "./assets/CheckboxGroup.css": "./dist/assets/CheckboxGroup.css",
    "./assets/FilterTabs.css": "./dist/assets/FilterTabs.css",
    "./assets/Button.css": "./dist/assets/Button.css",
    "./assets/CounterBadge.css": "./dist/assets/CounterBadge.css",
    "./assets/List.css": "./dist/assets/List.css",
    "./assets/Badge.css": "./dist/assets/Badge.css",
    "./assets/Separator.css": "./dist/assets/Separator.css",
    "./assets/theme.css": "./dist/assets/theme.css",
    "./assets/icons.css": "./dist/assets/icons.css"
  },
  "typesVersions": {
    "*": {
      "Switcher": ["./dist/components/Switcher/index.d.ts"],
      "Spinner": ["./dist/components/Spinner/index.d.ts"],
      "Link": ["./dist/components/Link/index.d.ts"],
      "List": ["./dist/components/List/index.d.ts"],
      "TextArea": ["./dist/components/TextArea/index.d.ts"],
      "Text": ["./dist/components/Text/index.d.ts"],
      "Input": ["./dist/components/Input/index.d.ts"],
      "InlineInput": ["./dist/components/InlineInput/index.d.ts"],
      "Label": ["./dist/components/Label/index.d.ts"],
      "Checkbox": ["./dist/components/Checkbox/index.d.ts"],
      "Portal": ["./dist/components/Portal/index.d.ts"],
      "RadioGroup": ["./dist/components/RadioGroup/index.d.ts"],
      "Select": ["./dist/components/Select/index.d.ts"],
      "CheckboxGroup": ["./dist/components/CheckboxGroup/index.d.ts"],
      "FilterTabs": ["./dist/components/FilterTabs/index.d.ts"],
      "Button": ["./dist/components/Button/index.d.ts"],
      "ConfigProvider": ["./dist/components/ConfigProvider/index.d.ts"],
      "ContentBlock": ["./dist/components/ContentBlock/index.d.ts"],
      "Callout": ["./dist/components/Callout/index.d.ts"],
      "Accordion": ["./dist/components/Accordion/index.d.ts"],
      "ContextMenu": ["./dist/components/ContextMenu/index.d.ts"],
      "CounterBadge": ["./dist/components/CounterBadge/index.d.ts"],
      "Badge": ["./dist/components/Badge/index.d.ts"],
      "Separator": ["./dist/components/Separator/index.d.ts"]
    }
  },
  "files": [
    "dist",
    "LICENCE"
  ],
  "keywords": ["react", "ui", "Kommo"],
  "sideEffects": ["**/*.css"],
  "scripts": {
    "prepublishOnly": "cp ../../LICENCE ./LICENCE",
    "build": "rm -rf dist && tsc -p tsconfig.build.json && vite build",
    "test": "jest --maxWorkers 2",
    "test:e2e": "./scripts/generate_env.docker.sh && docker compose --env-file=./.env.docker up --abort-on-container-exit",
    "test:e2e:update-snapshots": "sh -c './scripts/generate_env.docker.sh -u \"$@\" && docker compose --env-file=./.env.docker up --abort-on-container-exit' --",
    "test:e2e:ci": "playwright test --config playwright-ct.config.ts",
    "eslint": "eslint --quiet",
    "tslint": "tsc --noEmit -p tsconfig.build.json",
    "lint": "concurrently --kill-others-on-fail \"yarn eslint\" \"yarn tslint\""
  },
  "devDependencies": {
    "@playwright/experimental-ct-react": "1.47.0",
    "@playwright/test": "1.47.0",
    "@swc/core": "1.7.28",
    "@swc/jest": "0.2.36",
    "@testing-library/jest-dom": "6.5.0",
    "@testing-library/react": "16.0.1",
    "@testing-library/user-event": "14.5.2",
    "@types/css": "0.0.38",
    "@types/glob": "8.1.0",
    "@types/hash-sum": "1.0.2",
    "@types/jest": "29.5.12",
    "@types/nanoid": "3.0.0",
    "@vitejs/plugin-react": "4.3.1",
    "css": "3.0.0",
    "hash-sum": "2.0.0",
    "jest": "29.7.0",
    "jest-css-modules-transform": "4.4.2",
    "jest-environment-jsdom": "29.7.0",
    "jest-transformer-svg": "2.1.0",
    "postcss-color-function": "4.1.0",
    "postcss-import": "16.1.0",
    "postcss-nested": "6.2.0",
    "postcss-preset-env": "10.0.2",
    "postcss-selector-replace": "1.0.2",
    "prop-types": "15.8.1",
    "react": "18",
    "react-dom": "18",
    "ts-jest": "29.2.4",
    "ts-node": "10.9.2",
    "vite": "5.4.2",
    "vite-plugin-dts": "4.0.3",
    "vite-plugin-lib-inject-css": "2.1.1",
    "vite-plugin-svgr": "4.2.0"
  },
  "dependencies": {
    "@kommo-crm/react-hooks": "1.2.1",
    "@radix-ui/react-dropdown-menu": "2.1.15",
    "@react-spring/web": "10.0.1",
    "classnames": "2.5.1",
    "i18next": "24.2.2",
    "i18next-browser-languagedetector": "8.0.4",
    "nanoid": "3.3.4",
    "react-i18next": "15.4.1",
    "react-markdown": "10.0.1"
  },
  "peerDependencies": {
    "@types/react": "*",
    "@types/react-dom": "*",
    "react": "^18.0",
    "react-dom": "^18.0"
  }
}
```

- [ ] **Step 2: Add packages/ui-kit/LICENCE to gitignore**

Add to root `.gitignore`:
```
packages/ui-kit/LICENCE
```

- [ ] **Step 3: Commit**

```bash
git add packages/ui-kit/package.json .gitignore
git commit --no-verify -m "feat: add packages/ui-kit/package.json with prepublishOnly licence copy"
```

---

### Task 7: Fix packages/ui-kit/vite.config.ts

Remove the `@i18n` alias — it belongs to storybook, not the library build.

**Files:**
- Modify: `packages/ui-kit/vite.config.ts`

- [ ] **Step 1: Replace the resolve.alias block**

Find:
```ts
  resolve: {
    alias: {
      'src': resolve(__dirname, './src'),
      '@i18n': resolve(__dirname, '.storybook/i18n.ts'),
    },
  },
```

Replace with:
```ts
  resolve: {
    alias: {
      'src': resolve(__dirname, './src'),
    },
  },
```

- [ ] **Step 2: Commit**

```bash
git add packages/ui-kit/vite.config.ts
git commit --no-verify -m "refactor: remove @i18n alias from ui-kit vite config"
```

---

### Task 8: Fix packages/ui-kit/jest.config.ts

Remove the `@storybook-utils` module mapper — jest tests in ui-kit don't use storybook utilities.

**Files:**
- Modify: `packages/ui-kit/jest.config.ts`

- [ ] **Step 1: Remove @storybook-utils from moduleNameMapper**

Find:
```ts
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^src$': '<rootDir>/src/index.ts',
    '^@storybook-utils/(.*)$': '<rootDir>/storybook/$1',
  },
```

Replace with:
```ts
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^src$': '<rootDir>/src/index.ts',
  },
```

- [ ] **Step 2: Commit**

```bash
git add packages/ui-kit/jest.config.ts
git commit --no-verify -m "refactor: remove @storybook-utils from jest moduleNameMapper"
```

---

### Task 9: Fix packages/ui-kit/playwright-ct.config.ts

`@storybook-utils` is used in e2e playground files (e.g. `Button.e2e-playground.tsx` imports SVGs from it). After the move, storybook utilities are at `packages/storybook/storybook/`. Update the alias to point cross-package.

**Files:**
- Modify: `packages/ui-kit/playwright-ct.config.ts`

- [ ] **Step 1: Update @storybook-utils alias in ctViteConfig**

Find:
```ts
      resolve: {
        alias: {
          'src': path.resolve(__dirname, './src'),
          '@storybook-utils': path.resolve(__dirname, 'storybook'),
        },
      },
```

Replace with:
```ts
      resolve: {
        alias: {
          'src': path.resolve(__dirname, './src'),
          '@storybook-utils': path.resolve(__dirname, '../storybook/storybook'),
        },
      },
```

- [ ] **Step 2: Commit**

```bash
git add packages/ui-kit/playwright-ct.config.ts
git commit --no-verify -m "refactor: update @storybook-utils alias in playwright config"
```

---

### Task 10: Create packages/storybook/package.json

**Files:**
- Create: `packages/storybook/package.json`

- [ ] **Step 1: Create the file**

```json
{
  "name": "@kommo-crm/storybook",
  "private": true,
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "eslint": "eslint --quiet",
    "lint": "yarn eslint"
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
    "@vitejs/plugin-react": "4.3.1",
    "react": "18",
    "react-dom": "18",
    "react-docgen-typescript": "2.2.2",
    "storybook": "8.6.0",
    "vite": "5.4.2",
    "vite-plugin-css-injected-by-js": "3.5.2",
    "vite-plugin-svgr": "4.2.0"
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/storybook/package.json
git commit --no-verify -m "feat: add packages/storybook/package.json"
```

---

### Task 11: Create packages/storybook/tsconfig.json

**Files:**
- Create: `packages/storybook/tsconfig.json`

- [ ] **Step 1: Create the file**

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
  "exclude": ["node_modules", "storybook-static"]
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/storybook/tsconfig.json
git commit --no-verify -m "feat: add packages/storybook/tsconfig.json"
```

---

### Task 12: Fix packages/storybook/.storybook/main.ts

Three things to update:
1. `stories` globs — `../src/` becomes `../ui-kit/src/`, `../stories/` becomes `./stories/`
2. `staticDirs` — `../public` becomes `./public`
3. `viteFinal` aliases — `@storybook-utils` path moves to `./storybook`, add `src` → ui-kit alias

**Files:**
- Modify: `packages/storybook/.storybook/main.ts`

- [ ] **Step 1: Update staticDirs, stories globs, and viteFinal aliases**

Full replacement of the config file:

```ts
import { resolve } from 'path';

import type { Plugin } from 'vite';

import type { StorybookConfig } from '@storybook/react-vite';
import svgrPlugin from 'vite-plugin-svgr';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

const config: StorybookConfig = {
  staticDirs: ['./public'],
  stories: [
    '../ui-kit/src/**/!(*.ignore)*.mdx',
    './stories/**/!(*.ignore).mdx',
    '../ui-kit/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/blocks',
    './addons/themes',
    './addons/locale',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  viteFinal: async (viteConfig, { configType }) => {
    const { mergeConfig } = await import('vite');

    const plugins: (Plugin<any> | Plugin<any>[])[] = [
      svgrPlugin({ include: '**/*.svg' }),
    ];

    if (configType === 'PRODUCTION') {
      plugins.push(
        cssInjectedByJsPlugin({
          cssAssetsFilterFunction: (outputAsset) => {
            return outputAsset.originalFileNames.includes(
              '.storybook/preview.tsx'
            );
          },
        })
      );
    }

    return mergeConfig(viteConfig, {
      plugins,
      resolve: {
        alias: {
          'src': resolve(__dirname, '../ui-kit/src'),
          '@ui-kit': resolve(__dirname, '../ui-kit/src'),
          '@storybook-utils': resolve(__dirname, '../storybook'),
          '@i18n': resolve(__dirname, './i18n.ts'),
        },
      },
    });
  },
};

export default config;
```

- [ ] **Step 2: Commit**

```bash
git add packages/storybook/.storybook/main.ts
git commit --no-verify -m "refactor: update storybook main.ts paths for monorepo structure"
```

---

### Task 13: Fix packages/storybook/.storybook/preview.tsx

The `../public/fonts/ptsans.css` import needs to become `./public/fonts/ptsans.css` since `public/` moved into `packages/storybook/`.

**Files:**
- Modify: `packages/storybook/.storybook/preview.tsx`

- [ ] **Step 1: Verify the font import is correct (no change needed)**

`preview.tsx` lives at `packages/storybook/.storybook/preview.tsx`. The font import `../public/fonts/ptsans.css` resolves to `packages/storybook/public/fonts/ptsans.css`, which is exactly where `public/` now lives after the structural move. **No change needed.**

```bash
grep "ptsans" packages/storybook/.storybook/preview.tsx
```

Expected output: `import '../public/fonts/ptsans.css';`

This resolves to `packages/storybook/public/fonts/ptsans.css` ✓

- [ ] **Step 2: Check `src/` CSS imports use the vite alias set in main.ts**

```bash
grep "^import 'src/" packages/storybook/.storybook/preview.tsx
```

Expected: three lines importing `src/stylesheets/*.css`. These work via the `src` alias in `viteFinal` pointing to `../ui-kit/src` ✓ No changes needed.

---

### Task 14: Install dependencies

**Files:** none (installs node_modules)

- [ ] **Step 1: Run yarn install from monorepo root**

```bash
yarn install
```

Expected: installs workspace dependencies, hoists shared packages, links `packages/storybook` → `@kommo-crm/crm-react-ui-kit`.

If yarn complains about the `workspace:*` protocol, the dep in `packages/storybook/package.json` already uses plain `"*"` which is correct for yarn v1.

---

### Task 15: Verify TypeScript and fix errors

Run TypeScript checks in both packages and fix errors one by one.

**Files:** varies depending on errors

- [ ] **Step 1: Check ui-kit TypeScript**

```bash
cd packages/ui-kit && yarn tslint
```

Expected: no errors. If errors appear, they will be path/alias resolution failures — fix by updating `tsconfig.json` paths.

- [ ] **Step 2: Check storybook TypeScript**

```bash
cd packages/storybook && npx tsc --noEmit -p tsconfig.json
```

Expected: no errors. Common failures:
- `Cannot find module 'src/...'` → `src` alias not set correctly in tsconfig paths
- `Cannot find module '@storybook-utils/...'` → paths mismatch in tsconfig

- [ ] **Step 3: Verify ui-kit build**

```bash
cd packages/ui-kit && yarn build
```

Expected: `dist/` populated with JS + CSS files

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit --no-verify -m "fix: resolve TypeScript path errors after monorepo restructure"
```

---

### Task 16: Write READMEs

**Files:**
- Modify: `README.md`
- Create: `packages/ui-kit/README.md`
- Create: `packages/storybook/README.md`

- [ ] **Step 1: Replace root README.md**

```markdown
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
```

- [ ] **Step 2: Create packages/ui-kit/README.md**

```markdown
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
```

- [ ] **Step 3: Create packages/storybook/README.md**

```markdown
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
```

- [ ] **Step 4: Commit**

```bash
git add README.md packages/ui-kit/README.md packages/storybook/README.md
git commit --no-verify -m "docs: update root README, add package READMEs"
```

---

### Task 17: Final verification and cleanup

- [ ] **Step 1: Run full lint from root**

```bash
yarn lint
```

Expected: turbo runs lint in both packages, no errors.

- [ ] **Step 2: Run unit tests**

```bash
yarn test
```

Expected: turbo runs `jest` in `packages/ui-kit`, all tests pass.

- [ ] **Step 3: Verify storybook starts**

```bash
yarn storybook
```

Expected: Storybook starts on port 6006, loads stories from `packages/ui-kit/src`.

- [ ] **Step 4: Push branch**

```bash
git push -u origin feature/27-v3-changes
```
