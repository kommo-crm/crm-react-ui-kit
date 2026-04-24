import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  {
    ignores: ['.swc', 'storybook-static', 'playwright/.cache', 'coverage', 'dist'],
  },
];
