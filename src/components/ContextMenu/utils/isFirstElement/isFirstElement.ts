import React from 'react';

/**
 * Checks whether the element is the first child in the parent.
 */
export function isFirstElement(ref: React.RefObject<HTMLElement>): boolean {
  const el = ref.current;

  if (!el) {
    return false;
  }

  const parent = el.parentElement;

  if (!parent) {
    return false;
  }

  return parent.firstElementChild === el;
}
