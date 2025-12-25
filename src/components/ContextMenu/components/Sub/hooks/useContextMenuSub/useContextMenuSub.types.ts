import { ContextMenuModeType } from '../../../../ContextMenu.types';

export interface UseContextMenuSubOptions {
  /**
   * The name of the display.
   */
  displayName: string;
  /**
   * The mode of the context menu.
   */
  mode: ContextMenuModeType;
  /**
   * The open state of the dropdown menu when it is initially rendered.
   */
  defaultOpen?: boolean;
  /**
   * Called when submenu open state changes.
   */
  onOpen?: (open: boolean) => void;
  /**
   * Called whenever the value of `isMovingTowardActiveMenuRef` changes
   * in the context menu bus.
   *
   * This ref tracks whether the cursor is currently moving toward the active menu,
   * which is used to prevent menu closure when navigating between menus in hover mode.
   * The callback is triggered whenever this tracking state changes.
   */
  onAiming?: (isAiming: boolean) => void;
}
