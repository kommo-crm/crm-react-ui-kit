import { COLOR_SCALES, ColorScale } from '@/const';
import { ColorShades } from '@/types/color';
import validateHEXColor from '@/utils/validateHEXColor';

export const buildColorShades = (
  shades: ColorShades
): Record<ColorScale, string> =>
  Object.fromEntries(
    COLOR_SCALES.map((scale, i) => {
      const value = shades[i];

      if (!validateHEXColor(value)) {
        throw new Error(
          `Invalid HEX color at scale ${scale}: "${value}". Expected format: #RGB or #RRGGBB.`
        );
      }

      return [scale, value];
    })
  ) as Record<ColorScale, string>;
