export interface UseContextMenuItemFocusOptions {
  /**
   * The name of the display.
   */
  displayName: string;
  /**
   * The id of the item.
   */
  id: string;
  /**
   * Whether the item is disabled.
   */
  isDisabled?: boolean;
  /**
   * Whether the item has a submenu.
   */
  hasSubmenu?: boolean;
  /**
   * The callback function to be called when the mouse enters the item.
   */
  onMouseEnter?: (e: React.MouseEvent<HTMLElement>) => void;
  /**
   * The callback function to be called when the mouse leaves the item.
   */
  onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
}
