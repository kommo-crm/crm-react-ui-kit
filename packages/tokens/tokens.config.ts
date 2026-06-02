import type { TokensConfig } from './config/types.js';

const config: TokensConfig = {
  prefix: 'crm-ui-kit',

  themes: {
    light: {
      selector: ':root',
      source: 'tokens/semantic/light.json',
    },
    dark: {
      selector: ":root[data-crm-ui-kit-theme='alternative']",
      source: 'tokens/semantic/dark.json',
    },
    // To add a theme, add an entry:
    // 'high-contrast': {
    //   selector: ':root[data-theme="high-contrast"]',
    //   source: 'tokens/semantic/high-contrast.json',
    // },
  },
};

export default config;
