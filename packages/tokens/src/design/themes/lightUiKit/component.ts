import { defineUiKitComponentTokens } from '@/define';

export default defineUiKitComponentTokens({
  'input': {
    error: {
      description: {
        color: 'color.light.red.600',
      },
    },
  },
  'inline-input': {
    invalid: {
      description: {
        'background-color': 'color.light.red.600',
      },
    },
  },
  'select': {
    button: {
      error: {
        color: 'color.light.red.600',
      },
    },
  },
  'checkbox': {
    error: {
      'border-color': 'color.light.red.500',
    },
  },
  'textarea': {
    error: {
      'color': 'color.light.red.600',
      'border-color': 'color.light.red.500',
    },
  },
});
