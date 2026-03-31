import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'primitives/tokens': 'src/primitives.ts',
    'light/tokens': 'src/light.ts',
    'dark/tokens': 'src/dark.ts',
  },
  format: ['esm', 'cjs'],
  outExtension({ format }) {
    return { js: format === 'cjs' ? '.cjs' : '.mjs' };
  },
  dts: true,
  outDir: 'dist',
  clean: false,
});
