import type React from 'react';

import type { TabProps } from '../../../Tab/Tab.props';

export interface MenuItemProps {
  /**
   * Tab element rendered inside the menu item.
   */
  tab: React.ReactElement<TabProps>;
  /**
   * Whether the tab of the menu item is selected.
   */
  isSelected: boolean;
  /**
   * Called with the tab value when the menu item is selected.
   */
  onSelect: (value: TabProps['value']) => void;
  /**
   * Called with the tab value when the menu item unmounts.
   */
  onUnmount: (value: TabProps['value']) => void;
}
