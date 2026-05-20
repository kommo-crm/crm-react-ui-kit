import React from 'react';

type ListAttributes = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;

export type ListType = 'bulleted' | 'numbered';

export interface ListProps extends Omit<ListAttributes, 'type'> {
  /**
   * The list type.
   *
   * - `bulleted` - unordered list, used when item order does not matter.
   * - `numbered` - ordered list, used when item order is meaningful.
   *
   */
  type: ListType;
  /**
   * Items content. Use `List.Item` or another nested `List`.
   */
  children?: React.ReactNode;
}
