export interface SubMenuContextProps {
  /**
   * Whether the item has a submenu.
   */
  hasSubmenu?: boolean;
  /**
   * Whether the submenu is open.
   */
  subMenuOpen?: boolean;
  /**
   * The callback function to be called when the submenu is opened.
   */
  setSubMenuOpen?: (open: boolean) => void;
}
