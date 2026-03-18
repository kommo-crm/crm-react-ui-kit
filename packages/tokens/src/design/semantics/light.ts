import { SemanticNode } from '@/types/common';

const light = {
  palette: {
    background: {
      base: 'color.light.neutral.100',
      primary: 'color.light.neutral.50',
      secondary: 'color.light.neutral.50',
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
      medium: 'color.light.neutral.200',
      strong: 'color.light.neutral.300',
      error: 'color.light.red.500',
    },
    overlay: {
      disabled: 'rgba(255, 255, 255, 0.2)',
    },
  },
} satisfies SemanticNode;

export type SemanticLight = typeof light;
export default light;
