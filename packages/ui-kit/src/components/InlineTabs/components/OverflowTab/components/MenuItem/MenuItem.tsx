import React, { useLayoutEffect } from 'react';

import { ContextMenu } from '../../../../../ContextMenu';

import { type MenuItemProps } from './MenuItem.props';

import s from './MenuItem.module.css';

/**
 * Item of the overflow menu with a hidden tab.
 */
export const MenuItem = (props: MenuItemProps) => {
  const { tab, isSelected, onSelect, onUnmount } = props;

  const { value } = tab.props;

  useLayoutEffect(() => () => onUnmount(value), [value, onUnmount]);

  return (
    <ContextMenu.Item
      className={s.menuItem}
      data-selected={isSelected ? '' : undefined}
      aria-current={isSelected || undefined}
      onSelect={() => onSelect(value)}
    >
      {tab}
    </ContextMenu.Item>
  );
};

MenuItem.displayName = 'InlineTabs.MenuItem';
