import { TokenSemanticValue } from './common';
import { ObjectLeaves } from '@/types/utils/object-leaves';

export type SemanticTokens = {
  text: {
    primary: TokenSemanticValue;
  };
};

export type SemanticTokenPath = ObjectLeaves<SemanticTokens>;
