import type React from 'react';

import type { TabProps } from '../../../Tab/Tab.props';

export interface PanelTabProps {
  /**
   * The `InlineTabs.Tab` element to render as a tab trigger.
   */
  tab: React.ReactElement<TabProps>;
  /**
   * Measured width of the tab the visible tab grows from, px.
   */
  width: number | undefined;
  /**
   * Whether the tab is in the overflow menu.
   */
  isHidden: boolean;
  /**
   * Receives the element of the tab.
   */
  tabRef?: (node: HTMLElement | null) => void;
}
