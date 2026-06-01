import { extname, relative, resolve } from 'path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vite';
import { glob } from 'glob';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import svgrPlugin from 'vite-plugin-svgr';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({ tsconfigPath: './tsconfig.build.json', include: ['src'] }),
    svgrPlugin({ include: '**/*.svg' }),
  ],
  resolve: {
    alias: {
      'src': resolve(__dirname, './src'),
      '@i18n': resolve(__dirname, '.storybook/i18n.ts'),
    },
  },
  build: {
    lib: {
      entry: [resolve(__dirname, 'src/index.ts')],
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react-dom'],
      input: {
        ...Object.fromEntries(
          glob
            .sync('src/**/*.{ts,tsx}', {
              ignore: [
                'src/**/*.d.ts',
                'src/**/*.test.tsx',
                'src/**/*.test.ts',
                'src/**/*.stories.tsx',
                'src/**/*.e2e-playground.tsx',
                'src/tests/**',
              ],
            })
            .map((file) => [
              /**
               * Entry point name
               * src/nested/foo.js becomes nested/foo
               */
              relative(
                'src',
                file.slice(0, file.length - extname(file).length)
              ),
              /**
               * Absolute path to the input file
               * src/nested/foo.ts becomes /project/src/nested/foo.ts
               */
              fileURLToPath(new URL(file, import.meta.url)),
            ])
        ),
        theme: 'src/stylesheets/theme.css',
        icons: 'src/stylesheets/icons.css',
      },
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
});
