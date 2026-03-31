import { SemanticTokens } from '@/types/semantic';

const semanticTokens: SemanticTokens = {
  background: {
    default: {
      $: 'color.light.neutral.100',
      disabled: 'color.light.azure.900',
    },
    base: 'color.light.neutral.100',
    primary: {
      $: 'color.light.neutral.50',
      disabled: 'color.light.neutral.100',
    },
    secondary: {
      $: 'color.light.neutral.50',
      100: 'color.light.neutral.50',
      200: 'color.light.neutral.100',
      300: 'color.light.blue.50',
      500: 'color.light.neutral.200',
      800: 'color.light.neutral.200',
      900: 'color.light.neutral.300',
    },
    tour: 'color.light.neutral.900',
    qualification: 'color.light.blue.600',
    error: 'color.light.red.200',
  },
  foreground: {
    primary: 'color.light.neutral.800',
    inverted: 'color.light.neutral.50',
    secondary: 'color.light.neutral.600',
    tertiary: 'color.light.neutral.400',
    error: 'color.light.red.600',
    accent: 'color.light.blue.600',
  },
  border: {
    default: 'color.light.neutral.300',
    primary: 'color.light.neutral.200',
    medium: 'color.light.neutral.200',
    strong: 'color.light.neutral.300',
    error: 'color.light.red.500',
  },
  hover: {
    ['light-blue']: 'color.light.blue.100',
  },
  shadow: {
    default: 'color.light.neutral.100',
  },
  placeholder: {
    default: 'color.light.neutral.500',
    primary: 'color.light.neutral.400',
  },
  action: {
    droppable: 'color.light.blue.700',
  },
  active: {
    element: {
      900: 'color.light.blue.500',
      800: 'color.light.blue.600',
      700: 'color.light.blue.600',
    },
  },
  scrollbar: {
    track: {
      background: 'color.light.neutral.100',
    },
    thumb: {
      background: 'color.light.neutral.300',
    },
  },
  text: {
    primary: {
      $: 'color.light.neutral.800',
      inverse: 'color.light.neutral.50',
    },
    secondary: {
      light: 'color.light.neutral.500',
      dark: {
        $: 'color.light.neutral.600',
        green: 'color.light.azure.600',
      },
      disabled: {
        light: 'color.light.green.400',
        dark: 'color.light.azure.500',
      },
    },
    success: {
      primary: 'color.light.green.600',
    },
    error: {
      primary: 'color.light.red.600',
    },
  },
  link: {
    primary: 'color.light.blue.600',
  },
};

export default semanticTokens;
