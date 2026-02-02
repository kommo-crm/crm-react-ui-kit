export interface UseInnerFocusTrackerResult {
  /**
   * Whether the inner inputs focus is enabled.
   */
  hasInnerInput: boolean;
  /**
   * Whether the inner inputs focus is focused.
   */
  isInnerInputFocused: boolean;
  /**
   * The callback function to be called when the node ref is changed.
   */
  handleNodeRef: (newNode: HTMLDivElement | null) => void;
}
