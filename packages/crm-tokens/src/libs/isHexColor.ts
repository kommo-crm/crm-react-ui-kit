/**
 * Returns `true` if string is a valid 3- or 6-digit hex color (e.g. `#fff` or `#ffffff`).
 */
export function isHexColor(color: string): boolean {
  const hexColorRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

  return hexColorRegex.test(color);
}
