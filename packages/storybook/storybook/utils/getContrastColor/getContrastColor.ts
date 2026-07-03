export function getContrastColor(hex: string): string {
  const clean = hex.replace('#', '');

  if (!/^[0-9a-fA-F]{6}$/.test(clean)) {
    return '#000000';
  }

  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? '#000000' : '#ffffff';
}
