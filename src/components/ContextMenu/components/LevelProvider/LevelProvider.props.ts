export interface LevelProviderContextProps {
  /**
   * Whether any item in this level has an icon
   */
  hasItemWithIcon: boolean;
  /**
   * Call to register that an item with an icon is present in this level
   */
  registerItemWithItem: () => void;
}
