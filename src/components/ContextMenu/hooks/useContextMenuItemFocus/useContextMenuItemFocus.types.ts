export interface UseContextMenuItemFocusOptions<T extends HTMLElement> {
  /**
   * The name of the display.
   */
  displayName: string;
  /**
   * The id of the item.
   */
  id: string;
  /**
   * The ref of the item.
   */
  ref: React.RefObject<T>;
  /**
   * Whether the item is disabled.
   */
  isDisabled?: boolean;
  /**
   * Whether the item has a submenu.
   */
  hasSubmenu?: boolean;
  /**
   * The id of the submenu trigger.
   */
  subMenuTriggerId?: string;
  /**
   * Whether the item is selectable.
   */
  isSelectable?: boolean;
  /**
   * The callback function to be called when the mouse enters the item.
   */
  onMouseEnter?: (e: React.MouseEvent<T>) => void;
  /**
   * The callback function to be called when the mouse leaves the item.
   */
  onMouseLeave?: (e: React.MouseEvent<T>) => void;
  /**
   * The callback function to be called when the item is focused.
   */
  onFocus?: (e: React.FocusEvent<T>) => void;
  /**
   * The callback function to be called when the item is blurred.
   */
  onBlur?: (e: React.FocusEvent<T>) => void;
  /**
   * The callback function to be called when the item is pointer entered.
   */
  onPointerEnter?: (e: React.PointerEvent<T>) => void;
  /**
   * The callback function to be called when the item is pointer left.
   */
  onPointerLeave?: (e: React.PointerEvent<T>) => void;
  /**
   * The callback function to be called when the item is pointer moved.
   */
  onPointerMove?: (e: React.PointerEvent<T>) => void;
}

export interface UseContextMenuItemFocusResult<T extends HTMLElement> {
  /**
   * The data-highlighted attribute of the item.
   */
  dataHighlighted: string | undefined;
  /**
   * The callback function to be called when the item is focused.
   */
  onFocus: (e: React.FocusEvent<T>) => void;
  /**
   * The callback function to be called when the mouse enters the item.
   */
  onMouseEnter: (e: React.MouseEvent<T>) => void;
  /**
   * The callback function to be called when the item is blurred.
   */
  onBlur: (e: React.FocusEvent<T>) => void;
  /**
   * The callback function to be called when the mouse leaves the item.
   */
  onMouseLeave: (e: React.MouseEvent<T>) => void;
  /**
   * The callback function to be called when the item is pointer entered.
   */
  onPointerEnter: (e: React.PointerEvent<T>) => void;
  /**
   * The callback function to be called when the item is pointer left.
   */
  onPointerLeave: (e: React.PointerEvent<T>) => void;
  /**
   * The callback function to be called when the item is pointer moved.
   */
  onPointerMove: (e: React.PointerEvent<T>) => void;
}
