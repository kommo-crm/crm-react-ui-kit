import React from 'react';

type LiAttributes = React.DetailedHTMLProps<
  React.LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>;

export interface ItemProps extends LiAttributes {
  /**
   * Item content. Can be plain text or a nested `List`.
   */
  children?: React.ReactNode;
}
