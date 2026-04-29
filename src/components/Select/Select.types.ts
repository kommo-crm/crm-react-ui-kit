import { ReactNode } from 'react';

export type SelectItem = {
  /**
   * Value of the element.
   */
  value: number | string;
  /**
   * Description of the element.
   */
  option: ReactNode;
};
