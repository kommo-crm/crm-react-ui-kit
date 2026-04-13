import { TokenSemanticValue } from './common';
import { ObjectLeaves } from '@/types/utils/object-leaves';
import { DeepPartial } from '@/types/utils/deep-partial';

type SemanticUiKitTokensShape = {
  'disabled-opacity': TokenSemanticValue;
  'border-radius': {
    default: TokenSemanticValue;
  };
  'palette': {
    'text': {
      'primary': TokenSemanticValue;
      'secondary-light': TokenSemanticValue;
      'secondary-dark': TokenSemanticValue;
    };
    'active-element': {
      '900': TokenSemanticValue;
    };
    'border': {
      default: TokenSemanticValue;
      primary: TokenSemanticValue;
      active: TokenSemanticValue;
      error: TokenSemanticValue;
    };
    'switcher': {
      'border-default': TokenSemanticValue;
    };
    'background': {
      'default': TokenSemanticValue;
      'primary': TokenSemanticValue;
      'primary-disabled': TokenSemanticValue;
    };
    'surface': {
      'background-color': TokenSemanticValue;
      'hover-background-color': TokenSemanticValue;
      'text-color': TokenSemanticValue;
    };
    'link': {
      'primary': TokenSemanticValue;
      'hover-primary': TokenSemanticValue;
    };
    'focus-visible': {
      'color': TokenSemanticValue;
      'outline-width': TokenSemanticValue;
      'border-radius': TokenSemanticValue;
      'outline-offset': TokenSemanticValue;
      'outline-style': TokenSemanticValue;
    };
    'placeholder': {
      primary: TokenSemanticValue;
      default: TokenSemanticValue;
    };
    'button': {
      'classic-hover-background': TokenSemanticValue;
    };
    'scrollbar': {
      'width': TokenSemanticValue;
      'track-background': TokenSemanticValue;
      'thumb-background': TokenSemanticValue;
      'track-border-radius': TokenSemanticValue;
      'thumb-border-radius': TokenSemanticValue;
    };
    'content-block': {
      'box-shadow': TokenSemanticValue;
    };
    'callout': {
      error: {
        'background-color': TokenSemanticValue;
      };
      warning: {
        'background-color': TokenSemanticValue;
      };
      info: {
        'background-color': TokenSemanticValue;
      };
      success: {
        'background-color': TokenSemanticValue;
      };
    };
    'accordion-item': {
      'box-shadow': TokenSemanticValue;
    };
    'context-menu': {
      'box-shadow': TokenSemanticValue;
    };
    'box-shadow': {
      default: TokenSemanticValue;
    };
  };
};

export type SemanticUiKitTokens = DeepPartial<SemanticUiKitTokensShape>;

export type SemanticTokens = Record<'', string>;

export type SemanticUiKitTokenPath = ObjectLeaves<SemanticUiKitTokens>;
export type SemanticTokenPath = ObjectLeaves<SemanticTokens>;
