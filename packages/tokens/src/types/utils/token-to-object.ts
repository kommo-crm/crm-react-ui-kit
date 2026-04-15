import { TokenComponentValue } from '../common';
import { Split } from './split';
import { StripPrefix } from './strip-prefix';

export type TokenToObject<T extends string, V = TokenComponentValue, Atoms extends string = never> = TupleToNestedObject<
  Split<StripPrefix<T>, Atoms>,
  V
>;
