import type React from 'react';

import type { TabProps } from '../../../Tab/Tab.props';

export interface MeasureLayerProps {
  /**
   * `InlineTabs.Tab` elements to copy, all of them in display order.
   */
  tabs: React.ReactElement<TabProps>[];
}
