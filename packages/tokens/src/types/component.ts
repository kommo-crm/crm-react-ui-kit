import { TokenComponentValue } from './common';

export type ComponentTokens = {
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
};
