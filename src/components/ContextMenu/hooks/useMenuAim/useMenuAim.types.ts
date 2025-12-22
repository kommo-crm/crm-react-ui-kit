/**
 * A simple 2D point.
 */
export type Point = {
  /**
   * The x coordinate of the point.
   */
  x: number;
  /**
   * The y coordinate of the point.
   */
  y: number;
};

/**
 * Valid menu aim directions.
 */
export const enum MenuAimDirection {
  /**
   * Menu aims up.
   */
  TOP = 'top',
  /**
   * Menu aims right.
   */
  RIGHT = 'right',
  /**
   * Menu aims down.
   */
  BOTTOM = 'bottom',
  /**
   * Menu aims left.
   */
  LEFT = 'left',
}

/**
 * Options for the useMenuAim hook.
 */
export interface UseMenuAimOptions {
  /**
   * Ref to the trigger DOM element.
   * Used to calculate the center of the trigger.
   */
  triggerRef: React.RefObject<HTMLElement>;
  /**
   * Ref to the menu DOM element (menu content container).
   * Used to calculate the edges of the menu.
   */
  contentRef: React.RefObject<HTMLElement>;
  /**
   * Direction in which the submenu opens.
   * This affects which menu corners are used to build
   * the "aim triangle".
   */
  direction: MenuAimDirection;
  /**
   * Delay (in ms) before allowing menu switching
   * when the cursor is moving toward the submenu.
   *
   * @default 300
   */
  switchDelay?: number;
  /**
   * Number of mouse positions to track.
   *
   * @default 3
   */
  mouseLocsTracked?: number;
  /**
   * Pixel tolerance added to menu bounds.
   *
   * @default 75
   */
  tolerance?: number;
  /**
   * Enables or disables the menu aim logic.
   * When disabled, the hook becomes a no-op.
   *
   * @default true
   */
  enabled?: boolean;
  /**
   * Optional external ref to use instead of creating a new one.
   * If provided, this ref will be updated directly.
   */
  externalRef?: React.MutableRefObject<boolean> | React.RefObject<boolean>;
}

/**
 * Result returned by the useMenuAim hook.
 */
export interface UseMenuAimResult {
  /**
   * Ref containing whether the mouse is currently moving
   * toward the menu/submenu.
   *
   * When this is true:
   *  - closing of the current menu should be delayed
   *  - opening of sibling menus should be blocked
   */
  isMovingTowardMenuRef: React.MutableRefObject<boolean>;
  /**
   * Resets all internal tracking state.
   * Should be called when the menu is fully closed.
   */
  reset: () => void;
  /**
   * The delay that should be applied when movement
   * toward the menu is detected.
   */
  switchDelay: number;
}
