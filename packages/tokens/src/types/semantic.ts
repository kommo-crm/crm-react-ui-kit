import { TokenSemanticValue } from './common';
import { ObjectLeaves } from '@/types/utils/object-leaves';

export type SemanticTokens = {
  palette: {
    border: {
      error: TokenSemanticValue;
    };
    callout: {
      error: {
        'background-color': TokenSemanticValue;
      };
    };
  };
};

export type SemanticTokenPath = ObjectLeaves<SemanticTokens>;
