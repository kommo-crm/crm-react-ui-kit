/**
 * Marks a menu item that doesn't close its own menu when selected.
 *
 * Set by the item itself under exactly the same conditions it uses to skip
 * the close call: `shouldCloseCurrentMenuOnSelect={false}` (on the item or on
 * its menu), a disabled item or a non-selectable one.
 */
export const KEEP_MENU_OPEN_ATTRIBUTE = 'data-keep-menu-open';

/**
 * Checks whether a pointer event on the given target is allowed to close
 * the menu it happened in.
 *
 * Menus that close on their own (`SubRoot`) can't rely on the close call of
 * the item, since a click may also land outside of any item. They close on
 * pointer up instead, and this check keeps the items that opted out of
 * closing - and everything nested in them - from closing the menu anyway.
 */
export const isMenuCloseAllowedOnSelect = (target: EventTarget | null) => {
  if (!(target instanceof Element)) {
    return true;
  }

  const item = target.closest('[data-item]');

  return !item?.hasAttribute(KEEP_MENU_OPEN_ATTRIBUTE);
};
