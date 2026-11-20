import type { TokensConfig } from './config/types';
import { primitives } from './config/validation';

const config: TokensConfig = {
  themes: {
    // To add a theme, add an entry:
    // 'high-contrast': {
    //   selector: ':root[data-theme="high-contrast"]',
    //   source: 'tokens/semantic/high-contrast.json',
    // },
  },
  requiredTokens: [...primitives],
};

export default config;
