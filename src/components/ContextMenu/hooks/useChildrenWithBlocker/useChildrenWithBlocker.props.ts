export interface UseChildrenWithBlockerOptions {
  /**
   * The name of the display.
   */
  displayName: string;
  /**
   * The children of the component.
   */
  children: React.ReactNode;
  /**
   * Whether the blocker should be shown.
   */
  shouldShowBlocker?: boolean;
  /**
   * The class name of the blocker.
   */
  blockerClassName?: string;
  /**
   * The callback function to be called when the blocker is clicked.
   */
  onBlockerClick?: () => void;
}
