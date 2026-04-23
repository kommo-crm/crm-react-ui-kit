import { readdirSync } from 'fs';
import { basename, resolve } from 'path';

import { defineConfig } from 'tsdown';

const generatedDir = resolve(__dirname, '.generated');

const entry = Object.fromEntries(
  readdirSync(generatedDir)
    .filter((f) => f.endsWith('.ts'))
    .map((f) => {
      const name = basename(f, '.ts');

      return [`${name}/tokens`, resolve(generatedDir, f)];
    })
);

export default defineConfig({
  entry,
  format: ['esm', 'cjs'],
  minify: true,
  outExtensions({ format }) {
    return { js: format === 'cjs' ? '.cjs' : '.mjs' };
  },
  dts: true,
  tsconfig: './tsconfig.build.json',
  outDir: 'dist',
  clean: false,
});
