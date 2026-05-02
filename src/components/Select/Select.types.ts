import { ReactNode } from 'react';

export type SelectItem = {
  /**
   * Value of the element.
   */
  value: number | string;
  /**
   * Visual label shown in the list and in the trigger when the item is selected.
   */
  option: ReactNode;
  /**
   * Native tooltip text shown on hover.
   */
  title?: string;
};
