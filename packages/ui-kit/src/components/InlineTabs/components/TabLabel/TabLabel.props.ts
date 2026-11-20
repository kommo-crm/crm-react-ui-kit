import type React from 'react';

export interface TabLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Label.
   */
  children?: React.ReactNode;
}
