import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/tokens.ts'],
  format: ['esm', 'cjs'],
  outExtension({ format }) {
    return { js: format === 'cjs' ? '.cjs' : '.mjs' };
  },
  dts: true,
  outDir: 'dist',
  clean: false,
});
