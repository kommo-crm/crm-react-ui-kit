import React from 'react';

import { TextTheme } from './Text.themes';

type SpanAttributes = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;

export type TextSizes = 's' | 'm' | 'ms' | 'l' | 'xl';

export interface TextProps extends SpanAttributes {
  /**
   * Text size.
   *
   * - `s - 11/15`
   * - `m - 13/20`
   * - `ms - 13/15`
   * - `l - 15/20`
   * - `xl - 18/24`
   */
  size: TextSizes;
  /**
   * Trim text when it overflows the container.
   *
   * Note: The element must have a defined width for overflow to occur.
   */
  isEllipsis?: boolean;
  /**
   * Number of lines after which the text should be truncated.
   */
  maxRows?: number;
  /**
   * Object with CSS theme properties.
   */
  theme: TextTheme;
}
