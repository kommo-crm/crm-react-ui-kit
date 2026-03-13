import { SCALES } from '@/const';
import { ColorShades, Scale } from '@/types/common';
import validateHEXColor from '@/utils/validateHEXColor';

export const buildColorShades = (shades: ColorShades): Record<Scale, string> =>
  Object.fromEntries(
    SCALES.map((scale, i) => {
      const value = shades[i];

      if (!validateHEXColor(value)) {
        throw new Error(
          `Invalid HEX color at scale ${scale}: "${value}". Expected format: #RGB or #RRGGBB.`
        );
      }

      return [scale, value];
    })
  ) as Record<Scale, string>;
