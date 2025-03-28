import { resolve } from 'path';

import type { Plugin } from 'vite';

import type { StorybookConfig } from '@storybook/react-vite';
import svgrPlugin from 'vite-plugin-svgr';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

const config: StorybookConfig = {
  staticDirs: ['../public'],
  stories: [
    '../src/**/!(*.ignore)*.mdx',
    '../stories/**/!(*.ignore).mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
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
          '@storybook-utils': resolve(__dirname, '../storybook'),
          '@i18n': resolve(__dirname, './i18n.ts'),
        },
      },
    });
  },
};

export default config;
