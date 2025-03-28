import { ReactNode } from 'react';

import { AccordionItemThemeType } from './Item.themes';

export interface ItemProps {
  /**
   * Object with CSS theme properties
   */
  theme: AccordionItemThemeType;
  /**
   * Item value.
   */
  value: string;
  /**
   * Drop-down content.
   */
  children: ReactNode;
  /**
   * Title.
   */
  title: string;
  /**
   * Content to the left of the title.
   */
  before?: ReactNode;
  /**
   * Custom class.
   */
  className?: string;
}
