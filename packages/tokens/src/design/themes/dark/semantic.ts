import { SemanticTokens } from '@/types/semantic';

const semanticTokens: SemanticTokens = {
  palette: {
    'background': {
      default: {
        $: 'color.dark.azure.900',
        disabled: 'color.dark.azure.900',
      },
      base: 'color.light.neutral.100',
      primary: {
        $: 'color.dark.azure.800',
        disabled: 'color.dark.azure.900',
      },
      secondary: {
        $: 'color.dark.azure.900',
        100: 'color.dark.azure.900',
        200: 'color.dark.azure.800',
        300: 'color.dark.azure.900',
        500: 'color.dark.azure.800',
        800: 'color.dark.azure.900',
        900: 'color.dark.azure.900',
      },
      tour: 'color.dark.azure.900',
      qualification: 'color.dark.azure.600',
      error: 'color.light.red.200',
    },
    'foreground': {
      primary: 'color.light.neutral.800',
      inverted: 'color.light.neutral.50',
      secondary: 'color.light.neutral.600',
      tertiary: 'color.light.neutral.400',
      error: 'color.light.red.600',
      accent: 'color.light.blue.600',
    },
    'border': {
      default: 'color.dark.azure.500',
      primary: 'color.dark.azure.600',
      medium: 'color.light.neutral.200',
      strong: 'color.light.neutral.300',
      error: 'color.light.red.500',
    },
    'hover': {
      'light-blue': 'color.dark.blue.50',
    },
    'box-shadow': {
      default: 'color.dark.azure.900',
    },
    'placeholder': {
      default: 'color.dark.azure.400',
      primary: 'color.dark.azure.400',
    },
    'action': {
      droppable: 'color.dark.blue.400',
    },
    'active': {
      element: {
        900: 'color.dark.blue.800',
        800: 'color.dark.blue.700',
        700: 'color.dark.blue.700',
      },
    },
    'scrollbar': {
      track: {
        background: 'color.dark.azure.700',
      },
      thumb: {
        background: 'color.dark.azure.600',
      },
    },
    'text': {
      primary: {
        $: 'color.dark.azure.50',
        inverse: 'color.dark.azure.800',
      },
      secondary: {
        light: 'color.dark.azure.200',
        dark: {
          $: 'color.dark.azure.400',
          green: 'color.dark.azure.500',
        },
        disabled: {
          light: 'color.dark.azure.400',
          dark: 'color.dark.azure.400',
        },
      },
      success: {
        primary: 'color.light.green.600',
      },
      error: {
        primary: 'color.dark.red.300',
      },
    },
    'link': {
      primary: 'color.dark.blue.300',
    },
  },
};

export default semanticTokens;
