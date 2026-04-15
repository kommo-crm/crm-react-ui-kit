import { TokenSemanticValue } from './common';
import { ObjectLeaves } from '@/types/utils/object-leaves';
import { DeepPartial } from '@/types/utils/deep-partial';
import { AtomicSegments, Tokens } from './ui-kit-tokens';
import { TokensToObject } from '@/types/utils/tokens-to-object';

import { TokenComponentValue } from './common';

export type SemanticTokensType = TokensToObject<
  Tokens,
  TokenComponentValue,
  AtomicSegments
>;

type SemanticUiKitTokensShape = TokensToObject<
  Tokens,
  TokenSemanticValue,
  AtomicSegments
>;

export type SemanticUiKitTokens = DeepPartial<SemanticUiKitTokensShape>;

export type SemanticTokens = Record<'', string>;

export type SemanticUiKitTokenPath = ObjectLeaves<SemanticUiKitTokensShape>;
export type SemanticTokenPath = ObjectLeaves<SemanticTokens>;
