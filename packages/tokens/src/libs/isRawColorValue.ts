import { ColorValue } from '@/types/color';

const HEX_RE = /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

const RGB_RE =
  /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(?:\s*,\s*(?:\d+|\d*\.\d+))?\s*\)$/i;

const RGB_SPACE_RE =
  /^rgb\(\s*\d+\s+\d+\s+\d+(?:\s*\/\s*(?:\d+|\d*\.\d+))?\s*\)$/i;

const HSL_RE =
  /^hsla?\(\s*\d+(?:deg|rad|grad|turn)?\s*,\s*\d+%\s*,\s*\d+%(?:\s*,\s*(?:\d+|\d*\.\d+))?\s*\)$/i;

const HSL_SPACE_RE =
  /^hsl\(\s*\d+(?:deg|rad|grad|turn)?\s+\d+%\s+\d+(?:%\s*\/\s*(?:\d+|\d*\.\d+))?\s*\)$/i;

const COLOR_FUNC_RE = /^(color|lab|lch|oklab|oklch)\(.+\)$/i;

const CSS_VAR_RE = /^var\(--[\w-]+\)$/;

const KEYWORD_RE = /^(transparent|currentcolor|inherit|initial|unset|revert)$/i;

/**
 * Returns `true` if the value is a raw CSS color (hex, rgb, hsl, css var, keyword, etc.)
 * rather than a reference to a primitive token path.
 */
export const isRawColorValue = (value: unknown): boolean => {
  if (typeof value !== 'string') return false;

  return (
    HEX_RE.test(value) ||
    RGB_RE.test(value) ||
    RGB_SPACE_RE.test(value) ||
    HSL_RE.test(value) ||
    HSL_SPACE_RE.test(value) ||
    COLOR_FUNC_RE.test(value) ||
    CSS_VAR_RE.test(value) ||
    KEYWORD_RE.test(value)
  );
};
