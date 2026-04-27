import { HTMLAttributes, ReactNode } from 'react';

export interface OptionProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Text of the option.
   */
  children: ReactNode;
}
