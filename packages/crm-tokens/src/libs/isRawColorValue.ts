import {
  COLOR_FUNC_RE,
  HEX_RE,
  HSL_RE,
  HSL_SPACE_RE,
  KEYWORD_RE,
  RGB_RE,
  RGB_SPACE_RE,
} from '@/shared/constant';
import { ColorValue } from '@/types/color';

/**
 * Returns `true` if the value is a raw CSS color (hex, rgb, hsl, css var, keyword, etc.)
 * rather than a reference to a primitive token path.
 */
export const isRawColorValue = (value: unknown): value is ColorValue => {
  if (typeof value !== 'string') {
    return false;
  }

  return (
    HEX_RE.test(value) ||
    RGB_RE.test(value) ||
    RGB_SPACE_RE.test(value) ||
    HSL_RE.test(value) ||
    HSL_SPACE_RE.test(value) ||
    COLOR_FUNC_RE.test(value) ||
    KEYWORD_RE.test(value)
  );
};
