import { resolve } from 'path';

import type { Plugin } from 'vite';

import type { StorybookConfig } from '@storybook/react-vite';
import svgrPlugin from 'vite-plugin-svgr';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

const config: StorybookConfig = {
  staticDirs: ['../public'],
  stories: [
    '../../ui-kit/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../../ui-kit/src/**/!(*.ignore)*.mdx',
    '../stories/**/!(*.ignore).mdx',
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
    /**
     * Docgen is what fills the props table: prop names, types, the JSDoc shown
     * in the Description column and the `@default` tags shown in the Default
     * column.
     *
     * - `include` fixes a monorepo regression. The plugin globs it relative to
     *   `process.cwd()`, which is `packages/storybook` when Storybook is
     *   started from this package, so its default glob never leaves this
     *   package and never reaches `packages/ui-kit`. Only components that a
     *   file in here happened to import made it into the docgen program; every
     *   other one lost its `__docgenInfo`, and its props table fell back to
     *   types inferred from `args` — a bare `object`, with the Description
     *   column empty. Absolute paths make the glob itself cwd-independent.
     * - `tsconfigPath` covers the other half of the same problem. The plugin
     *   defaults it to the literal `'./tsconfig.json'`, which `getTSConfigFile`
     *   resolves against `process.cwd()` and, on failure, silently swallows
     *   into `{}`. Started from the monorepo root — where there is no
     *   `tsconfig.json`, only `tsconfig.base.json` — the compiler would end up
     *   without `baseUrl`/`paths`, `@ui-kit/*` imports would stop resolving and
     *   the tables would empty out again through a different entry point.
     * - The `include` glob skips `*.test.tsx`, `*.e2e.test.tsx`,
     *   `*.e2e-playground.tsx` and `*.stories.tsx`: they were half of the 194
     *   files in the docgen program and add nothing to it. `exclude` cannot do
     *   this — the plugin feeds it to the module filter only, while the TS
     *   program is built from `include` alone.
     * - The second entry is spelled `../storybook` rather than `../` because
     *   glob does not descend into dot-directories, so the wider pattern never
     *   covered `.storybook/**` in the first place.
     * - `shouldExtractLiteralValuesFromEnum` reports a string-literal union as
     *   `enum` plus its members, so Storybook renders a radio or a select
     *   instead of a free-text field — `Accordion.type` turns into a choice of
     *   `single` and `multiple`.
     * - `shouldRemoveUndefinedFromOptional` drops the `undefined` half of an
     *   optional prop's type, so the table reads `boolean` rather than
     *   `boolean | undefined`. It also strips the `undefined` member that the
     *   option above otherwise adds to every optional union, so the two belong
     *   together.
     * - `propFilter` keeps props declared in `node_modules` — the inherited DOM
     *   attributes — out of the table. It restates the plugin's own default, so
     *   it changes nothing today and only pins that behaviour in place.
     */
    reactDocgenTypescriptOptions: {
      tsconfigPath: resolve(__dirname, '../tsconfig.json'),
      include: [
        resolve(
          __dirname,
          '../../ui-kit/src/**/!(*.test|*.e2e.test|*.e2e-playground|*.stories).tsx'
        ),
        resolve(__dirname, '../storybook/**/*.tsx'),
      ],
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  viteFinal: async (viteConfig, { configType }) => {
    const { mergeConfig } = await import('vite');

    const plugins: (Plugin<any> | Plugin<any>[])[] = [
      svgrPlugin({ include: '**/*.svg' }),
    ];

    if (configType === 'PRODUCTION') {
      /**
       * Inline all styles that are imported into .storybook/preview.tsx.
       *
       * It is necessary for `ThemeVisualization` to work.
       */
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
          '@ui-kit': resolve(__dirname, '../../ui-kit/src'),
          '@storybook-utils': resolve(__dirname, '../storybook'),
          '@i18n': resolve(__dirname, './i18n.ts'),
          '@tokens': resolve(__dirname, '../../tokens/dist/js'),
        },
      },
    });
  },
};

export default config;
