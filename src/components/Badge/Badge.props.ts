import { HTMLAttributes } from 'react';

import { BadgeThemeType } from './Badge.themes';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Object with CSS properties of the theme.
   */
  theme: BadgeThemeType;
  /**
   * Badge text.
   */
  title: string;
}
