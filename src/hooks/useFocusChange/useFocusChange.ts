import { useEffect, useRef } from 'react';

import type {
  FocusChangeEvent,
  UseFocusChangeOptions,
} from './useFocusChange.types';

/**
 * Creates a FocusEvent object with preventDefault support.
 */
const createFocusEvent = (target: Element | null): FocusChangeEvent => {
  let defaultPrevented = false;

  return {
    target,
    preventDefault: () => {
      defaultPrevented = true;
    },
    get defaultPrevented() {
      return defaultPrevented;
    },
  };
};

/**
 * Checks if the currently focused element is inside any of the provided elements.
 */
const isFocusInsideElements = (
  elements: Array<React.RefObject<HTMLElement>>,
  activeElement: Element | null
): boolean => {
  if (!activeElement) {
    return false;
  }

  for (const element of elements) {
    if (!element.current) {
      continue;
    }

    if (
      element.current === activeElement ||
      element.current.contains(activeElement)
    ) {
      return true;
    }
  }

  return false;
};

/**
 * Global hook for tracking focus changes.
 *
 * This hook monitors focus events globally and determines whether
 * the focused element is inside or outside the provided elements.
 */
export const useFocusChange = (options: UseFocusChangeOptions) => {
  const {
    onFocusOutside,
    onFocusInside,
    enabled = true,
    elements = [],
  } = options;

  const previousFocusRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!enabled || elements.length === 0) {
      return;
    }

    const handleFocusChange = () => {
      const activeElement = document.activeElement;

      // Skip if focus hasn't actually changed
      if (activeElement === previousFocusRef.current) {
        return;
      }

      previousFocusRef.current = activeElement;

      // If focus is on body or document, it's outside the tracked elements
      if (
        activeElement === document.body ||
        activeElement === document.documentElement
      ) {
        const event = createFocusEvent(activeElement);

        onFocusOutside?.(event);

        return;
      }

      const isInside = isFocusInsideElements(elements, activeElement);
      const event = createFocusEvent(activeElement);

      if (isInside) {
        onFocusInside?.(event);
      } else {
        onFocusOutside?.(event);
      }
    };

    document.addEventListener('focusin', handleFocusChange);
    document.addEventListener('focus', handleFocusChange, true);

    return () => {
      document.removeEventListener('focusin', handleFocusChange);
      document.removeEventListener('focus', handleFocusChange, true);
    };
  }, [enabled, elements, onFocusOutside, onFocusInside]);
};
