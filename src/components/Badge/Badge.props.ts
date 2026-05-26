import { HTMLAttributes } from 'react';

import { BadgeThemeType } from './Badge.themes';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Object with CSS properties of the theme.
   */
  theme: BadgeThemeType;
  /**
   * @deprecated Use children instead.
   */
  title?: string;
  /**
   * Badge text.
   */
  children?: string;
}
