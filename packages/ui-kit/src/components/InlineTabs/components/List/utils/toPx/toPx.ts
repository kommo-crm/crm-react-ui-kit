/**
 * Reads a computed length in px. jsdom gives an empty string for sides that
 * are not set, which would turn the whole measure into `NaN`.
 */
export const toPx = (value: string) => parseFloat(value) || 0;
