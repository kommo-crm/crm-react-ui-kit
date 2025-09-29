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
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /**
   * The callback function to be called when the mouse leaves the item.
   */
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /**
   * The callback function to be called when the item is focused.
   */
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
  /**
   * The callback function to be called when the item is blurred.
   */
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
  /**
   * The callback function to be called when the item is keyed down.
   */
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}
