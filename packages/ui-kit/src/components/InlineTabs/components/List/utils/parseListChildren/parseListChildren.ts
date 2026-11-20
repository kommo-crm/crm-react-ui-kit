import React from 'react';

import { Tab } from '../../../Tab';
import type { TabProps } from '../../../Tab/Tab.props';

import type { ParsedListChildren } from './parseListChildren.types';

/**
 * `React.Children.toArray` flattens arrays but keeps fragments, so their
 * children are unwrapped here.
 */
const flatten = (children: React.ReactNode): React.ReactNode[] =>
  React.Children.toArray(children).flatMap((child) =>
    React.isValidElement<{ children?: React.ReactNode }>(child) &&
    child.type === React.Fragment
      ? flatten(child.props.children)
      : [child]
  );

/**
 * Only direct `Tab` elements count: a wrapper component is not rendered to
 * look inside, so it stays in place with any other child.
 */
export const parseListChildren = (
  children: React.ReactNode
): ParsedListChildren => {
  const result: ParsedListChildren = { tabs: [], listChildren: [] };
  let otherCount = 0;

  flatten(children).forEach((child) => {
    if (React.isValidElement<TabProps>(child) && child.type === Tab) {
      result.listChildren.push({
        kind: 'tab',
        tab: child,
        tabIndex: result.tabs.length,
      });
      result.tabs.push(child);

      return;
    }

    /**
     * Counted apart from the tabs, so adding or moving a tab does not
     * remount the other children.
     */
    result.listChildren.push({
      kind: 'other',
      node: child,
      key: `other:${otherCount}`,
    });
    otherCount += 1;
  });

  return result;
};
