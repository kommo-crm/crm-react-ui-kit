import { HTMLAttributes } from 'react';

import { SelectItem } from '../../Select.types';

import { SelectItemThemeType } from './Item.theme';

export interface ItemProps extends HTMLAttributes<HTMLLIElement> {
  /**
   * Select element.
   */
  item: SelectItem;
  /**
   * Element's index
   */
  index: number;
  /**
   * Child elements.
   */
  children?: React.ReactNode;
  /**
   * Custom class for the element.
   */
  className?: string;
  /**
   * Theme of the component.
   */
  theme: SelectItemThemeType;
}
