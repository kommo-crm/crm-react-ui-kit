import type React from 'react';
import type { TabsContentProps as RadixTabsContentProps } from '@radix-ui/react-tabs';

export interface ContentProps extends RadixTabsContentProps {
  /**
   * The value of the tab the panel belongs to.
   */
  value: RadixTabsContentProps['value'];
  /**
   * Content of the panel.
   */
  children: React.ReactNode;
}
