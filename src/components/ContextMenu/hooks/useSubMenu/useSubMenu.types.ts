export interface UseSubMenuOptions {
  /**
   * The children of the item that has a submenu.
   */
  children: React.ReactNode;
}

export interface UseSubMenuResult {
  /**
   * Reference to the item that has a submenu.
   */
  itemRef: React.RefObject<HTMLDivElement>;
  /**
   * Whether the item has a submenu.
   */
  hasSubmenu: boolean;
  /**
   * Whether the submenu is open.
   */
  isSubMenuOpen: boolean;
  /**
   * The callback function to be called when the submenu is opened.
   */
  setIsSubMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  /**
   * Handles the opening of the submenu by keyboard.
   */
  handleSubMenuOpenByKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  /**
   * The callback function to be called when the children are rendered.
   */
  withProvider: (children: React.ReactNode) => React.JSX.Element;
  /**
   * The id of the submenu trigger.
   */
  subMenuTriggerId: string | undefined;
}
