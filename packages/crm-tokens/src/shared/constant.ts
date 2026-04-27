export const HEX_RE = /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

export const RGB_RE =
  /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(?:\s*,\s*(?:\d+|\d*\.\d+))?\s*\)$/i;

export const RGB_SPACE_RE =
  /^rgb\(\s*\d+\s+\d+\s+\d+(?:\s*\/\s*(?:\d+|\d*\.\d+))?\s*\)$/i;

export const HSL_RE =
  /^hsla?\(\s*\d+(?:deg|rad|grad|turn)?\s*,\s*\d+%\s*,\s*\d+%(?:\s*,\s*(?:\d+|\d*\.\d+))?\s*\)$/i;

export const HSL_SPACE_RE =
  /^hsl\(\s*\d+(?:deg|rad|grad|turn)?\s+\d+%\s+\d+%?(?:\s*\/\s*(?:\d+|\d*\.\d+))?\s*\)$/i;

export const COLOR_FUNC_RE = /^(color|lab|lch|oklab|oklch)\(.+\)$/i;

export const KEYWORD_RE =
  /^(transparent|currentcolor|inherit|initial|unset|revert)$/i;
