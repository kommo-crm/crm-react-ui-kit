/**
 * Event object passed to focus callbacks, similar to Radix's InteractOutside event.
 */
export interface FocusChangeEvent {
  /**
   * The element that received focus.
   */
  target: Element | null;
  /**
   * Prevents the default behavior (e.g., closing the menu).
   */
  preventDefault: () => void;
  /**
   * Whether preventDefault was called.
   */
  defaultPrevented: boolean;
}

/**
 * Options for the `useFocusChange` hook.
 */
export interface UseFocusChangeOptions {
  /**
   * Callback that is called when focus moves outside the tracked elements.
   * Call `event.preventDefault()` to prevent the default behavior.
   */
  onFocusOutside?: (event: FocusChangeEvent) => void;
  /**
   * Callback that is called when focus moves inside the tracked elements.
   */
  onFocusInside?: (event: FocusChangeEvent) => void;
  /**
   * Whether the hook is enabled.
   * @default true
   */
  enabled?: boolean;
  /**
   * Array of refs or elements to track focus within.
   * Focus is considered "inside" if it's within any of these elements.
   */
  elements?: Array<React.RefObject<HTMLElement>>;
}
