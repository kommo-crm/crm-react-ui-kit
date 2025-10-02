export interface UseItemInnerFocusOptions {
  /**
   * The id of the item.
   */
  id: string;
  /**
   * The children of the item.
   */
  children: React.ReactNode;
  /**
   * Whether the item is selectable.
   */
  isSelectableProp?: boolean;
  /**
   * The name of the display.
   */
  displayName: string;
  /**
   * The class name of the blocker.
   */
  blockerClassName?: string;
}
