import { resolve } from 'path';

import type { Plugin } from 'vite';

import type { StorybookConfig } from '@storybook/react-vite';
import svgrPlugin from 'vite-plugin-svgr';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

const config: StorybookConfig = {
  staticDirs: ['../public'],
  stories: [
    '../../ui-kit/src/**/!(*.ignore)*.mdx',
    '../stories/**/!(*.ignore).mdx',
    '../../ui-kit/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
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
     * Docgen is what fills the props table: prop names, types, and the JSDoc
     * shown in the Description column.
     *
     * - `include` fixes a monorepo regression. The plugin globs it relative to
     *   `process.cwd()`, which is `packages/storybook` when Storybook is
     *   started from this package, so its default glob never leaves this
     *   package and never reaches `packages/ui-kit`. Only components that a
     *   file in here happened to import made it into the docgen program; every
     *   other one lost its `__docgenInfo`, and its props table fell back to
     *   types inferred from `args` — a bare `object`, with the Description
     *   column empty. Absolute paths are immune to the cwd change. The second
     *   entry keeps this package's own components covered, as they were before.
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
      include: [
        resolve(__dirname, '../../ui-kit/src/**/*.tsx'),
        resolve(__dirname, '../**/*.tsx'),
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
        },
      },
    });
  },
};

export default config;
