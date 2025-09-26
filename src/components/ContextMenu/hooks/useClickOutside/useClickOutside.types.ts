import { RefObject } from 'react';

export type UseClickOutsideOptions<T extends HTMLElement> = {
  /**
   * The ref to the element to listen for click outside.
   */
  refs: Array<RefObject<T> | null>;
  /**
   * The handler to call when a click outside is detected.
   */
  handler: (event: MouseEvent | TouchEvent) => void;
};
