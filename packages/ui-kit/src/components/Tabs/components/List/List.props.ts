import type React from 'react';
import type { TabsListProps as RadixTabsListProps } from '@radix-ui/react-tabs';

export interface ListProps extends RadixTabsListProps {
  /**
   * `Tabs.Trigger` elements.
   */
  children: React.ReactNode;
}
