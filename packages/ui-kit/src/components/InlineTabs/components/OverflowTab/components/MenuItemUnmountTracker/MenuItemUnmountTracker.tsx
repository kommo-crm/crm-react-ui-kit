import { useLayoutEffect } from 'react';

import { type MenuItemUnmountTrackerProps } from './MenuItemUnmountTracker.props';

/**
 * Reports the unmount of a menu item, rendered next to it.
 */
export const MenuItemUnmountTracker = (props: MenuItemUnmountTrackerProps) => {
  const { value, onUnmount } = props;

  useLayoutEffect(() => () => onUnmount(value), [value, onUnmount]);

  return null;
};

MenuItemUnmountTracker.displayName = 'InlineTabs.MenuItemUnmountTracker';
