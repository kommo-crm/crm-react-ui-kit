import { ComponentPropsWithoutRef } from 'react';

export interface ItemRightSlotProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Child elements.
   */
  children: React.ReactNode;
  /**
   * Custom class on Wrapper.
   */
  className?: string;
}
