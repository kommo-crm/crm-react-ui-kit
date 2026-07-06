function parseHex(hex: string): [number, number, number] | null {
  let clean = hex.replace('#', '');

  if (/^[0-9a-fA-F]{3}$/.test(clean)) {
    clean = clean
      .split('')
      .map((char) => char + char)
      .join('');
  }

  if (/^[0-9a-fA-F]{8}$/.test(clean)) {
    clean = clean.substring(0, 6);
  }

  if (!/^[0-9a-fA-F]{6}$/.test(clean)) {
    return null;
  }

  const red = parseInt(clean.substring(0, 2), 16);
  const green = parseInt(clean.substring(2, 4), 16);
  const blue = parseInt(clean.substring(4, 6), 16);

  return [red, green, blue];
}

function channelLuminance(value: number): number {
  const channel = value / 255;

  return channel <= 0.03928
    ? channel / 12.92
    : ((channel + 0.055) / 1.055) ** 2.4;
}

/**
 * Returns black or white — whichever has the higher WCAG contrast ratio
 * against the given color. Falls back to black for unparseable input.
 */
export function getContrastColor(hex: string): string {
  const rgb = parseHex(hex);

  if (!rgb) {
    return '#000000';
  }

  const [red, green, blue] = rgb;
  const luminance =
    0.2126 * channelLuminance(red) +
    0.7152 * channelLuminance(green) +
    0.0722 * channelLuminance(blue);

  const contrastWithBlack = (luminance + 0.05) / 0.05;
  const contrastWithWhite = 1.05 / (luminance + 0.05);

  return contrastWithBlack >= contrastWithWhite ? '#000000' : '#ffffff';
}
