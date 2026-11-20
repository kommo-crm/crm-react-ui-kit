import type React from 'react';

export interface TabMenuIconProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Icon.
   */
  children?: React.ReactNode;
}
