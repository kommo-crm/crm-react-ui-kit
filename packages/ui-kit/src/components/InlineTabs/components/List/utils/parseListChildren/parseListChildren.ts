import React from 'react';

import { Tab } from '../../../Tab';
import type { TabProps } from '../../../Tab/Tab.props';

import type { FlatChild, ParsedListChildren } from './parseListChildren.types';

/**
 * `React.Children.toArray` flattens arrays but keeps fragments, so their
 * children are unwrapped here. Its keys count empty slots too, so a
 * conditional child does not shift the keys of the ones after it. They
 * restart inside every fragment, hence the fragment key as a prefix. Text
 * nodes get no key from it and are keyed by position.
 */
const flatten = (children: React.ReactNode, prefix = ''): FlatChild[] =>
  React.Children.toArray(children).flatMap((child, index) => {
    if (!React.isValidElement<{ children?: React.ReactNode }>(child)) {
      return [{ node: child, key: `${prefix}#${index}` }];
    }

    const key = `${prefix}${child.key}`;

    return child.type === React.Fragment
      ? flatten(child.props.children, `${key}/`)
      : [{ node: child, key }];
  });

/**
 * Only direct `Tab` elements count: a wrapper component is not rendered to
 * look inside, so it stays in place with any other child.
 */
export const parseListChildren = (
  children: React.ReactNode
): ParsedListChildren => {
  const result: ParsedListChildren = { tabs: [], listChildren: [] };

  flatten(children).forEach(({ node, key }) => {
    if (React.isValidElement<TabProps>(node) && node.type === Tab) {
      result.listChildren.push({
        kind: 'tab',
        tab: node,
        tabIndex: result.tabs.length,
      });
      result.tabs.push(node);

      return;
    }

    result.listChildren.push({ kind: 'other', node, key });
  });

  return result;
};
