/**
 * The function of getting a container with toolbar buttons
 */
export const getStorybookToolsContainer = (): HTMLElement | null => {
  const sbBar = window.parent.document.querySelector(
    '.sb-bar'
  ) as HTMLElement | null;

  return sbBar?.firstElementChild?.firstElementChild as HTMLElement | null;
};
