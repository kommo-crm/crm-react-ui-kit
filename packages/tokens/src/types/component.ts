import { TokenComponentValue } from './common';
import { DeepPartial } from './utils/deep-partial';

export type ComponentUiKitTokens = DeepPartial<{
  'input': {
    error: {
      description: {
        color: TokenComponentValue;
      };
    };
  };
  'textarea': {
    error: {
      'color': TokenComponentValue;
      'border-color': TokenComponentValue;
    };
  };
  'inline-input': {
    invalid: {
      description: {
        'background-color': TokenComponentValue;
      };
    };
  };
  'select': {
    button: {
      error: {
        color: TokenComponentValue;
      };
    };
  };
  'checkbox': {
    error: {
      'border-color': TokenComponentValue;
    };
  };
}>;

export type ComponentTokens = Record<'', string>;
