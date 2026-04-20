import { ObjectLeaves } from '@/types/utils/object-leaves';
import { DeepPartial } from '@/types/utils/deep-partial';

import { TokensToObject } from '@/types/utils/tokens-to-object';

import { AtomicSegments, UiKitTokens } from './ui-kit-tokens';
import { TokenSemanticValue } from './common';

import { BaseAtomicSegments, BaseTokens } from './base-tokens';

type SemanticUiKitTokensShape = TokensToObject<
  UiKitTokens,
  TokenSemanticValue,
  AtomicSegments,
  '--crm-ui-kit'
>;

export type SemanticUiKitTokens = DeepPartial<SemanticUiKitTokensShape>;
export type SemanticUiKitTokenPath = ObjectLeaves<SemanticUiKitTokensShape>;

type SemanticTokensShape = TokensToObject<
  BaseTokens,
  TokenSemanticValue,
  BaseAtomicSegments,
  '-'
>;

export type SemanticTokens = DeepPartial<SemanticTokensShape>;
export type SemanticTokenPath = ObjectLeaves<SemanticTokensShape>;
