import type { ComponentPropsWithoutRef } from 'react';
import type { Portal as RadixTooltipPortal } from '@radix-ui/react-tooltip';

type RadixPortalProps = ComponentPropsWithoutRef<typeof RadixTooltipPortal>;

export type TooltipPortalProps = Omit<RadixPortalProps, 'forceMount'> & {
  /**
   * `Tooltip.Content`.
   */
  children?: RadixPortalProps['children'];
  /**
   * DOM node the content is mounted into.
   *
   * @default document.body
   */
  container?: RadixPortalProps['container'];
};
