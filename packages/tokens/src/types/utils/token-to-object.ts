import { TokenSemanticValue } from '../common';

import { Split } from './split';
import { StripPrefix } from './strip-prefix';
import { TupleToNestedObject } from './tuple-to-nested-object';

export type TokenToObject<
  T extends string,
  V = TokenSemanticValue,
  Atoms extends string = never,
  Prefix extends string = '-',
> = TupleToNestedObject<Split<StripPrefix<T, Prefix>, Atoms>, V>;
