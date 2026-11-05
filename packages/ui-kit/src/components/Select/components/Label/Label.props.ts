import { HTMLAttributes, ReactNode } from 'react';

export interface LabelProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Text of the label shown before the value inside the button.
   */
  children: ReactNode;
}
