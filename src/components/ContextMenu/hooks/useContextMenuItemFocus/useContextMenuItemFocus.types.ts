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
   * Whether the item is not selectable.
   */
  isNotSelectable?: boolean;
  /**
   * The callback function to be called when the mouse enters the item.
   */
  onMouseEnter?: () => void;
  /**
   * The callback function to be called when the mouse leaves the item.
   */
  onMouseLeave?: () => void;
}
