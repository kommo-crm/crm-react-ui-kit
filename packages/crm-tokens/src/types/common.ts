import { PrimitivePath } from '@/design/primitives';

import { ColorValue } from './color';

export interface UsableTokens {
  [key: string]: string | UsableTokens | undefined;
}

export type TokenPrimitiveValue = ColorValue;
export type TokenValue = ColorValue;
export type TokenPath = PrimitivePath;
