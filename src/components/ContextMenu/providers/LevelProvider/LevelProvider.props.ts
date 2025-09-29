import { ContextMenuModeType } from '../../ContextMenu.types';

export interface LevelProviderContextProps {
  /**
   * Nesting level of the menu.
   */
  level: number;
  /**
   * Whether any item in this level has an icon.
   */
  hasItemWithIcon: boolean;
  /**
   * Sets whether any item in this level has an icon.
   */
  setHasItemWithIcon: (hasItemWithIcon: boolean) => void;
  /**
   * The id of the active item.
   */
  activeItemId: string | null;
  /**
   * Sets the id of the active item.
   */
  setActiveItemId: (id: string | null) => void;
  /**
   * The callback function to be called when the child menu is opened.
   */
  onChildOpen: (value: boolean, mode: ContextMenuModeType) => void;
  /**
   * The callback function to be called when the subroot is opened.
   *
   * @remarks
   * This prop is only used for `Sub` (submenu) components.
   */
  onSubRootOpen?: (value: boolean) => void;
  /**
   * Immediately closes the menu without waiting for any hover or animation delays.
   */
  closeMenuImmediately: () => void;
  /**
   * Whether the menu should close when clicked.
   */
  isCloseOnClick: boolean;
}
