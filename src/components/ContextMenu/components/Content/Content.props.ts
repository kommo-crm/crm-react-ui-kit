import { ComponentPropsWithoutRef } from 'react';
import { Content as RadixDropdownMenuContent } from '@radix-ui/react-dropdown-menu';

import { DirectionType } from './Content.types';

type RadixContentProps = Omit<
  ComponentPropsWithoutRef<typeof RadixDropdownMenuContent>,
  'avoidCollisions'
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
   */
  disableAutoPositioning?: boolean;
};

export interface ContextMenuContentContextProps {
  /**
   * CSS color value inherited from the background of the
   * first/last menu item depending on the menu side.
   */
  inheritedArrowColor: string;
}
