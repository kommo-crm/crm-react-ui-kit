export interface UseSubMenuOptions {
  /**
   * The callback function to be called when the key down event is triggered.
   */
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  /**
   * The children of the item that has a submenu.
   */
  children: React.ReactNode;
}
