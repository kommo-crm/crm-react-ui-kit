/**
 * Finds the first focusable menu item in the given container.
 * Excludes disabled and non-selectable items.
 */
const findFirstFocusableItem = (
  container?: HTMLElement | null
): HTMLElement | null => {
  const searchContainer = container || document;

  const items = searchContainer.querySelectorAll<HTMLElement>('[data-item]');

  for (const item of items) {
    const isDisabled = item.hasAttribute('data-disabled');
    const isSelectable = !item.hasAttribute('data-non-selectable');

    if (!isDisabled && isSelectable) {
      return item;
    }
  }

  return null;
};

/**
 * Focuses the first focusable menu item in the given container.
 */
export const focusFirstFocusableItem = (
  container?: HTMLElement | null
): boolean => {
  const firstItem = findFirstFocusableItem(container);

  if (firstItem) {
    firstItem.focus();

    return true;
  }

  return false;
};
