import { existsSync, statSync } from 'fs';
import { resolve } from 'path';

import type { Plugin } from 'vite';

import type { StorybookConfig } from '@storybook/react-vite';
import svgrPlugin from 'vite-plugin-svgr';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

const resolveSourceFile = (rootDir: string, request: string) => {
  const basePath = resolve(rootDir, request);
  const extensions = ['.ts', '.tsx', '.js', '.jsx', '.mdx', '.svg', '.css'];
  const indexFiles = extensions.map((extension) => `/index${extension}`);

  for (const extension of extensions) {
    const filePath = `${basePath}${extension}`;

    if (existsSync(filePath)) {
      return filePath;
    }
  }

  for (const indexFile of indexFiles) {
    const filePath = `${basePath}${indexFile}`;

    if (existsSync(filePath)) {
      return filePath;
    }
  }

  if (existsSync(basePath) && statSync(basePath).isFile()) {
    return basePath;
  }

  return basePath;
};

const config: StorybookConfig = {
  staticDirs: ['../../ui-kit/public'],
  stories: [
    '../../ui-kit/src/**/!(*.ignore)*.mdx',
    '../../ui-kit/stories/**/!(*.ignore).mdx',
    '../../ui-kit/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../../ui-kit/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
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
    const storybookSrc = resolve(__dirname, '../src');
    const uiKitSrc = resolve(__dirname, '../../ui-kit/src');
    const uiKitPublic = resolve(__dirname, '../../ui-kit/public');

    const plugins: (Plugin<any> | Plugin<any>[])[] = [
      {
        name: 'ui-kit-at-alias-resolver',
        enforce: 'pre',
        resolveId(source, importer) {
          if (!importer || !source.startsWith('@/')) {
            return null;
          }

          if (importer.includes('/packages/ui-kit/')) {
            return resolveSourceFile(uiKitSrc, source.slice(2));
          }

          return null;
        },
      },
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
        alias: [
          { find: /^@ui-kit\/public\//, replacement: `${uiKitPublic}/` },
          { find: /^@ui-kit\//, replacement: `${uiKitSrc}/` },
          { find: /^@sb\//, replacement: `${storybookSrc}/` },
          { find: /^@storybook-utils\//, replacement: `${storybookSrc}/` },
          { find: '@i18n', replacement: `${storybookSrc}/i18n.ts` },
          { find: /^src\//, replacement: `${uiKitSrc}/` },
        ],
      },
    });
  },
};

export default config;
