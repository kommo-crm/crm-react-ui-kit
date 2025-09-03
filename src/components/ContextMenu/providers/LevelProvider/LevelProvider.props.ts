export interface LevelProviderContextProps {
  /**
   * Whether any item in this level has an icon
   */
  hasItemWithIcon: boolean;
  /**
   * Sets whether any item in this level has an icon
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
}
