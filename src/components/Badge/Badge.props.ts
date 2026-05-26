import { HTMLAttributes } from 'react';

import { BadgeThemeType } from './Badge.themes';

type BadgeBaseProps = HTMLAttributes<HTMLSpanElement> & {
  /**
   * Object with CSS properties of the theme.
   */
  theme: BadgeThemeType;
};

type BadgeWithChildren = BadgeBaseProps & {
  /**
   * Badge text.
   */
  children: string;
  title?: never;
};

type BadgeWithTitle = BadgeBaseProps & {
  /**
   * @deprecated This prop will be removed in a future major version.
   * Use children instead.
   */
  title: string;
  children?: never;
};

export type BadgeProps = BadgeWithChildren | BadgeWithTitle;
