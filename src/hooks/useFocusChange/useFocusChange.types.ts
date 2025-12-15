import type { RefObject } from 'react';

/**
 * Options for the `useFocusChange` hook.
 */
export interface UseFocusChangeOptions {
  /**
   * Callback that is called when focus moves outside the tracked elements.
   * @param focusedElement - The element that received focus.
   */
  onFocusOutside?: (focusedElement: Element | null) => void;
  /**
   * Callback that is called when focus moves inside the tracked elements.
   * @param focusedElement - The element that received focus.
   */
  onFocusInside?: (focusedElement: Element | null) => void;
  /**
   * Whether the hook is enabled.
   * @default true
   */
  enabled?: boolean;
  /**
   * Array of refs or elements to track focus within.
   * Focus is considered "inside" if it's within any of these elements.
   */
  elements?: Array<RefObject<HTMLElement> | HTMLElement | null>;
}
