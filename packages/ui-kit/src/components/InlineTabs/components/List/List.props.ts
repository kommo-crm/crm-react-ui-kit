import type React from 'react';
import type { TabsListProps as RadixTabsListProps } from '@radix-ui/react-tabs';

import type { TabPlacement, TabProps } from '../Tab/Tab.props';

export interface ListProps extends Omit<RadixTabsListProps, 'children'> {
  /**
   * `InlineTabs.Tab` elements in display order. Tabs must be direct
   * children; fragments, arrays and conditions are fine. Any other children
   * are rendered as is in their place, and their width is not reserved in the
   * layout. Values must be unique.
   */
  children?: React.ReactNode;
  /**
   * Accessible name of the overflow button.
   */
  overflowButtonAriaLabel?: string;
}

export interface ListPlacementContextProps {
  /**
   * Where the tabs below are rendered; absent outside the list.
   */
  placement?: TabPlacement;
}

export interface ListOverflowContextProps {
  /**
   * Tab elements that did not fit into the panel, in tab order.
   */
  hiddenTabs: React.ReactElement<TabProps>[];
  /**
   * Ref of the overflow button, measured by the layout.
   */
  overflowRef: React.Ref<HTMLButtonElement>;
  /**
   * Accessible name of the overflow button.
   */
  overflowButtonAriaLabel?: ListProps['overflowButtonAriaLabel'];
  /**
   * Reports the open state of the overflow menu.
   */
  onOpenChange: (isOpen: boolean) => void;
  /**
   * Reports the unmount of the menu item of a tab.
   */
  onMenuItemUnmount: (value: TabProps['value']) => void;
}
