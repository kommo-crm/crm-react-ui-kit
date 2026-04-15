import { TokenComponentValue } from '../common';
import { TokenToObject } from './token-to-object';
import { UnionToIntersection } from './union-to-intersection';

export type TokensToObject<T extends string, V = TokenComponentValue, Atoms extends string = never> = UnionToIntersection<
  TokenToObject<T, V, Atoms>
>;
