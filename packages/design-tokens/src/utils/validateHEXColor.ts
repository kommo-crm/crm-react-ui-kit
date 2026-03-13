export default function validateHEXColor(color: string): boolean {
  const hexColorRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

  return hexColorRegex.test(color);
}
