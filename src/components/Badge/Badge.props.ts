import { HTMLAttributes, ReactNode } from 'react';

import { BadgeThemeType } from './Badge.themes';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Object with CSS properties of the theme.
   */
  theme: BadgeThemeType;
  /**
   * @deprecated This prop will be removed in a future major version.
   * Use {@link children} instead.
   */
  title?: string;
  /**
   * Badge content.
   */
  children: ReactNode;
}
