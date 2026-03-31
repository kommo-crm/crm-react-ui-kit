import type { SemanticTokens } from '@/types/semantic';

const semanticTokens: SemanticTokens = {
  palette: {
    background: {
      base: 'color.semanticTokens.azure.900',
      primary: 'color.dark.azure.800',
      secondary: 'color.dark.azure.700',
      error: 'color.dark.red.900',
    },
    foreground: {
      primary: 'color.dark.azure.50',
      inverted: 'color.dark.azure.700',
      secondary: 'color.dark.azure.200',
      tertiary: 'color.dark.azure.400',
      error: 'color.dark.red.300',
      accent: 'color.dark.blue.300',
    },
    border: {
      medium: 'color.dark.azure.600',
      strong: 'color.dark.azure.500',
      error: 'color.dark.red.400',
    },
    overlay: {
      disabled: 'rgba(21, 48, 67, 0.2)',
    },
  },
};

export default semanticTokens;
