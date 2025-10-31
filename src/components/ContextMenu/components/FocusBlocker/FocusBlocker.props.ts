import { ComponentPropsWithoutRef } from 'react';

import { Handlers } from '../../hooks/useStopContextMenuEvents/useStopContextMenuEvents.types';

export interface FocusBlockerProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * The additional className of the blocker.
   */
  className?: string;
  /**
   * The handlers to not block.
   */
  disabledHandlers?: Array<keyof Handlers<HTMLDivElement>>;
}
