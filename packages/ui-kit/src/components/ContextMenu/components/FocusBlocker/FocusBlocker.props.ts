import { ComponentPropsWithoutRef } from 'react';

export interface FocusBlockerProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * The additional className of the blocker.
   */
  className?: string;
}
