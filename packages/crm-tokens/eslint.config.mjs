import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  {
    ignores: ['dist', '.generated'],
  },
  {
    files: ['src/index.ts', 'src/libs/generatePrimitives.ts'],
    rules: {
      'no-console': 'off',
    },
  },
];
