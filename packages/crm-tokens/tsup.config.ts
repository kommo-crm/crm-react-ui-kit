import { readdirSync } from 'fs';
import { basename, resolve } from 'path';

import { defineConfig } from 'tsup';

const generatedDir = resolve(__dirname, '.generated');

const entry = Object.fromEntries(
  readdirSync(generatedDir)
    .filter((f) => f.endsWith('.ts'))
    .map((f) => {
      const name = basename(f, '.ts');

      return [`${name}/tokens`, `.generated/${f}`];
    })
);

export default defineConfig({
  entry,
  format: ['esm', 'cjs'],
  minify: true,
  outExtension({ format }) {
    return { js: format === 'cjs' ? '.cjs' : '.mjs' };
  },
  dts: true,
  tsconfig: './tsconfig.build.json',
  outDir: 'dist',
  clean: false,
});
