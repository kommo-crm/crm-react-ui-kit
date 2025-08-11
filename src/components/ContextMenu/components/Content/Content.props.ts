import { ComponentPropsWithoutRef } from 'react';
import { Content as RadixDropdownMenuContent } from '@radix-ui/react-dropdown-menu';

import { ContextMenuContentThemeType } from './Content.theme';
import { HorizontalDirection, VerticalDirection } from './Content.types';

type RadixContentProps = Omit<
  ComponentPropsWithoutRef<typeof RadixDropdownMenuContent>,
  'avoidCollisions' | 'asChild'
>;

export type ContentProps = RadixContentProps & {
  /**
   * Theme.
   */
  theme: ContextMenuContentThemeType;
  /**
   * Preferred opening directions for the menu.
   *
   * Tuple consists of:
   *  - `HorizontalDirection`: preferred horizontal alignment relative to the trigger
   *    (`LEFT` — align menu's right edge to trigger's left edge,
   *    `RIGHT` — align menu's left edge to trigger's right edge).
   *  - `VerticalDirection`: preferred vertical side of the trigger to open towards
   *    (`TOP` — above the trigger, `BOTTOM` — below the trigger).
   *
   * If there is not enough space in the preferred direction,
   * the menu will automatically flip to the opposite side.
   *
   * @default [Direction.RIGHT, Direction.TOP]
   */
  direction?: [HorizontalDirection, VerticalDirection];
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
   */
  disableAutoPositioning?: boolean;
};
