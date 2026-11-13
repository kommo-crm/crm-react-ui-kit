import type { ComponentPropsWithoutRef, MutableRefObject } from 'react';
import type { Root as RadixTooltipRoot } from '@radix-ui/react-tooltip';

import type { TooltipThemeType } from './Tooltip.themes';

type RadixRootProps = ComponentPropsWithoutRef<typeof RadixTooltipRoot>;

export type TooltipRootProps = Omit<
  RadixRootProps,
  | 'open'
  | 'defaultOpen'
  | 'onOpenChange'
  | 'delayDuration'
  | 'disableHoverableContent'
> & {
  /**
   * Called when the open state changes.
   */
  onOpenChange?: RadixRootProps['onOpenChange'];
  /**
   * Controlled open state. The tooltip is controlled when it is not `undefined`.
   */
  isOpen?: RadixRootProps['open'];
  /**
   * Initial open state in uncontrolled mode.
   */
  isDefaultOpen?: RadixRootProps['defaultOpen'];
  /**
   * Ignores open requests from interaction and closes an open uncontrolled
   * tooltip. Does not block a controlled `isOpen`.
   *
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Object with CSS theme properties.
   */
  theme: TooltipThemeType;
};

export type TooltipThemeContextProps = {
  /**
   * Class name holding the CSS custom properties of the theme.
   */
  themeClassName: string;
};

export type TooltipRootContextProps = {
  /**
   * Current open state of the tooltip.
   */
  isOpen: boolean;
  /**
   * Whether the tooltip ignores open requests.
   */
  isDisabled: boolean;
  /**
   * Whether the open state comes from the `isOpen` prop.
   */
  isControlled: boolean;
  /**
   * Requests the tooltip to open or close.
   */
  onOpenChange: NonNullable<RadixRootProps['onOpenChange']>;
  /**
   * Set while a pointer is pressed on the content, so the trigger losing focus
   * to it does not close the tooltip.
   */
  isContentPointerDownRef: MutableRefObject<boolean>;
};
