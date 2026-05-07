import React from 'react';

import { TextSizes, TextTheme } from 'src/components/Text';

type ListAttributes = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement | HTMLOListElement>,
  HTMLUListElement | HTMLOListElement
>;

export type ListType = 'bulleted' | 'numbered';

export interface ListProps extends Omit<ListAttributes, 'type'> {
  /**
   * The list type.
   *
   * - `bulleted` - unordered list, used when item order does not matter.
   * - `numbered` - ordered list, used when item order is meaningful.
   *
   * @default 'bulleted'
   */
  type?: ListType;
  /**
   * Text size of list items, mirrors the `Text` component sizes.
   *
   * - `s - 11/15`
   * - `m - 13/20`
   * - `ms - 13/15`
   * - `l - 15/20`
   * - `xl - 18/24`
   *
   * @default 'l'
   */
  size?: TextSizes;
  /**
   * Object with CSS theme properties.
   * Inherits from `Text` themes.
   *
   * @default TextPrimaryTheme
   */
  theme?: TextTheme;
  /**
   * Items content. Use `List.Item` or another nested `List`.
   */
  children?: React.ReactNode;
}
