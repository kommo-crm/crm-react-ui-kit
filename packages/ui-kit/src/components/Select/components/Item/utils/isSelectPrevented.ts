/**
 * Calls the item `onSelect` with a cancelable event and tells
 * whether the consumer prevented the selection.
 */
export const isSelectPrevented = (onSelect?: (event: Event) => void) => {
  if (!onSelect) {
    return false;
  }

  const event = new Event('select', { cancelable: true });

  onSelect(event);

  return event.defaultPrevented;
};
