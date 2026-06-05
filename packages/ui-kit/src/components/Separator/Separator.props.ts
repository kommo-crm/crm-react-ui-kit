import React from 'react';

import { type SeparatorTheme } from './Separator.themes';

type NativeDivAttributes = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export type SeparatorOrientation = 'horizontal' | 'vertical';

export interface SeparatorProps extends NativeDivAttributes {
  /**
   * Object with CSS theme properties.
   */
  theme: SeparatorTheme;
  /**
   * Visual orientation of the separator.
   * `horizontal` renders a 1px-tall full-width line.
   * `vertical` renders a 1px-wide full-height line.
   * Default: `horizontal`.
   */
  orientation?: SeparatorOrientation;
}
