import type { TabProps } from '../../../Tab/Tab.props';

export interface MenuItemUnmountTrackerProps {
  /**
   * The value of the tab of the menu item.
   */
  value: TabProps['value'];
  /**
   * Called with the tab value when the menu item unmounts.
   */
  onUnmount: (value: TabProps['value']) => void;
}
