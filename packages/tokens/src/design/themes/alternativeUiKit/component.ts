import { ComponentTokens } from '@/types/component';

export const componentTokens: ComponentTokens = {
  'input': {
    error: {
      description: {
        color: 'color.dark.red.300',
      },
    },
  },
  'inline-input': {
    invalid: {
      description: {
        'background-color': 'color.dark.red.300',
      },
    },
  },
  'select': {
    button: {
      error: {
        color: 'color.dark.red.300',
      },
    },
  },
  'checkbox': {
    error: {
      'border-color': 'color.dark.red.400',
    },
  },
  'textarea': {
    error: {
      'color': 'color.dark.red.300',
      'border-color': 'color.dark.red.400',
    },
  },
};
