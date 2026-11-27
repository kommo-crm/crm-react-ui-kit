import type { ComponentPropsWithoutRef } from 'react';
import type { Content as RadixTooltipContent } from '@radix-ui/react-tooltip';

type RadixContentProps = ComponentPropsWithoutRef<typeof RadixTooltipContent>;

export type TooltipContentProps = Omit<
  RadixContentProps,
  | 'side'
  | 'align'
  | 'sideOffset'
  | 'alignOffset'
  | 'avoidCollisions'
  | 'collisionPadding'
  | 'sticky'
  | 'arrowPadding'
  | 'hideWhenDetached'
  | 'updatePositionStrategy'
  | 'forceMount'
  | 'onEscapeKeyDown'
  | 'onPointerDownOutside'
> & {
  /**
   * Tooltip content and `Tooltip.Arrow`.
   */
  'children': RadixContentProps['children'];
  /**
   * Custom class on the content element.
   */
  'className'?: RadixContentProps['className'];
  /**
   * Inline styles of the content element. Radix moves `zIndex` to the popper wrapper.
   */
  'style'?: RadixContentProps['style'];
  /**
   * Area inside which collisions and the flip are computed.
   *
   * @default viewport
   */
  'collisionBoundary'?: RadixContentProps['collisionBoundary'];
  /**
   * Text for screen readers instead of `children`.
   */
  'aria-label'?: RadixContentProps['aria-label'];
  /**
   * Merge props onto `children` instead of rendering a `div`.
   */
  'asChild'?: RadixContentProps['asChild'];
};
