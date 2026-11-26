import type React from 'react';

import type { TabProps } from '../../../Tab/Tab.props';

/**
 * A child of the list in markup order.
 */
export type ListChild =
  | {
      /**
       * An `InlineTabs.Tab` element.
       */
      kind: 'tab';
      /**
       * The tab element itself.
       */
      tab: React.ReactElement<TabProps>;
      /**
       * Position among the tabs, the index into the tab widths.
       */
      tabIndex: number;
    }
  | {
      /**
       * Any other child, rendered as is.
       */
      kind: 'other';
      /**
       * The child itself.
       */
      node: React.ReactNode;
      /**
       * React key of the child, stable while the markup slot is the same.
       */
      key: string;
    };

/**
 * A list child taken out of arrays and fragments.
 */
export interface FlatChild {
  /**
   * The child itself.
   */
  node: React.ReactNode;
  /**
   * React key of the child within the whole list.
   */
  key: string;
}

/**
 * List children split into tabs and the render order.
 */
export interface ParsedListChildren {
  /**
   * `InlineTabs.Tab` elements in markup order.
   */
  tabs: React.ReactElement<TabProps>[];
  /**
   * All children to render, in markup order.
   */
  listChildren: ListChild[];
}
