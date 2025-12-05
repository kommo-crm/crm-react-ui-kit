export const focusParentItem = (el: HTMLElement | null) => {
  let current = el?.parentElement;

  while (current) {
    if (current.hasAttribute('data-item')) {
      current.focus();

      return;
    }

    current = current.parentElement;
  }
};
