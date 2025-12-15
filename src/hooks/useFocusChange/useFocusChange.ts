import { useEffect, useRef, type RefObject } from 'react';

import type { UseFocusChangeOptions } from './useFocusChange.types';

/**
 * Checks if the currently focused element is inside any of the provided elements.
 */
const isFocusInsideElements = (
  elements: Array<RefObject<HTMLElement> | HTMLElement | null>,
  activeElement: Element | null
): boolean => {
  if (!activeElement) {
    return false;
  }

  for (const elementOrRef of elements) {
    const element =
      elementOrRef && 'current' in elementOrRef
        ? elementOrRef.current
        : elementOrRef;

    if (!element) {
      continue;
    }

    if (element === activeElement || element.contains(activeElement)) {
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

      // If focus is on body or document, it's outside the tracked elements
      if (
        activeElement === document.body ||
        activeElement === document.documentElement
      ) {
        onFocusOutside?.(activeElement);
        previousFocusRef.current = activeElement;

        return;
      }

      const isInside = isFocusInsideElements(elements, activeElement);

      if (isInside) {
        onFocusInside?.(activeElement);
      } else {
        onFocusOutside?.(activeElement);
      }

      previousFocusRef.current = activeElement;
    };

    document.addEventListener('focusin', handleFocusChange);
    document.addEventListener('focus', handleFocusChange, true);

    return () => {
      document.removeEventListener('focusin', handleFocusChange);
      document.removeEventListener('focus', handleFocusChange, true);
    };
  }, [enabled, elements, onFocusOutside, onFocusInside]);
};
