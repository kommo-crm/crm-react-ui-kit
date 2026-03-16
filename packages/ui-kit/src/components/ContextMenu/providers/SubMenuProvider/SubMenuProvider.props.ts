export interface SubMenuContextProps {
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
  setIsSubMenuOpen: (open: boolean) => void;
  /**
   * Whether the submenu is opened by keyboard.
   */
  isOpenedByKeyboard: boolean;
  /**
   * The callback function to be called when the submenu is opened by keyboard.
   */
  setIsOpenedByKeyboard: (openedByKeyboard: boolean) => void;
  /**
   * The callback function to be called when the submenu trigger id is set.
   */
  setSubMenuTriggerId: (subMenuTriggerId: string | undefined) => void;
}
