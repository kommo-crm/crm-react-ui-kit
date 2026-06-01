import { ComponentPropsWithoutRef } from 'react';
import { Content as RadixDropdownMenuContent } from '@radix-ui/react-dropdown-menu';

import type { FocusChangeEvent } from 'src/hooks';

import { DirectionType } from './Content.types';

type RadixContentProps = Omit<
  ComponentPropsWithoutRef<typeof RadixDropdownMenuContent>,
  'avoidCollisions' | 'align' | 'onInteractOutside'
>;

export type ContentProps = RadixContentProps & {
  /**
   * Preferred opening direction for the menu.
   */
  direction?: DirectionType;
  /**
   * The element used as the collision boundary.
   * By default this is the viewport, though you can
   * provide additional element to be included in this check.
   */
  collisionBoundary?: Element;
  /**
   * Disables automatic positioning and measurement logic for the context menu content.
   * When set to `true`, the content will be rendered immediately with full visibility
   * and pointer events enabled.
   *
   * Useful for environments where DOM measurements are unreliable or unnecessary,
   * such as server-side rendering or automated tests.
   *
   * @default false
   */
  disableAutoPositioning?: boolean;
  /**
   * Whether to disable repositioning.
   *
   * @default false
   */
  disableRepositioning?: boolean;
  /**
   * The callback function to be called when the context menu is closed.
   */
  onCloseAutoFocus?: (e: Event) => void;
  /**
   * The callback function to be called when the context menu is opened.
   */
  onOpenAutoFocus?: (e: Event) => void;
  /**
   * Callback when focus moves outside the menu content.
   * Call `event.preventDefault()` to prevent the menu from closing.
   */
  onFocusOutside?: (event: FocusChangeEvent) => void;
};
