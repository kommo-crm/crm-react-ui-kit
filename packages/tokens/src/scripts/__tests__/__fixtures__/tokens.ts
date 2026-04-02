export const mockPrimitives = {
  color: {
    light: {
      azure: { 50: '#f8fcfe', 500: '#76939f' },
      blue: { 50: '#f6f8fc', 600: '#326fd8' },
      neutral: { 50: '#ffffff', 100: '#f5f5f5' },
    },
    dark: {
      azure: { 50: '#0b2934', 500: '#76939f' },
      neutral: { 50: '#1a1a1a', 100: '#2a2a2a' },
    },
  },
};

export const mockThemes = [
  {
    id: 'light',
    semanticTokens: {
      background: {
        default: 'color.light.neutral.100',
        primary: 'color.light.neutral.50',
      },
      foreground: {
        default: 'color.light.azure.500',
        inverted: 'color.dark.azure.50', // cross: light theme uses dark primitive
      },
    },
    componentTokens: {
      button: {
        background: 'color.light.blue.600',
        color: '#ffffff',
      },
    },
  },
  {
    id: 'dark',
    conditions: [":root[data-theme='dark']"],
    semanticTokens: {
      background: {
        default: 'color.dark.neutral.100',
        primary: 'color.dark.neutral.50',
      },
      foreground: {
        default: 'color.dark.azure.500',
        inverted: 'color.light.neutral.50', // cross: dark theme uses light primitive
      },
    },
    componentTokens: {
      button: {
        background: 'color.dark.azure.50',
        color: '#ffffff',
      },
    },
  },
];
