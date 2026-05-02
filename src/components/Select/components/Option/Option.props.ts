import { HTMLAttributes, ReactNode } from 'react';

export interface OptionProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Text of the option.
   */
  children: ReactNode;
  /**
   * Native tooltip text shown on hover.
   */
  title?: string;
}
