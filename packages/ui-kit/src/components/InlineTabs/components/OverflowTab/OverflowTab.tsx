import React, { useContext } from 'react';
import cx from 'classnames';

import MoreIcon from '@ui-kit/icons/more.svg';

import { ContextMenu } from '../../../ContextMenu';
import { InlineTabsContext } from '../../InlineTabs.context';
import {
  ListPlacementProvider,
  useListOverflowContext,
} from '../List/List.context';
import { Counter } from '../Counter';

import { MenuItem } from './components';

import { InlineTabsMenuTheme } from './OverflowTab.themes';

import s from './OverflowTab.module.css';

const DISPLAY_NAME = 'InlineTabs.OverflowTab';

/**
 * Overflow button with the menu of the hidden tabs; rendered by the list
 * after its children, only while some tabs are hidden.
 */
export const OverflowTab = () => {
  const { hiddenTabs, overflowRef, onOpenChange, onMenuItemUnmount } =
    useListOverflowContext(DISPLAY_NAME);
  const { themeClassName, value, select } = useContext(InlineTabsContext);

  if (hiddenTabs.length === 0) {
    return null;
  }

  const handleSelect = (tabValue: string) => {
    select(tabValue);
  };

  const hiddenCount = hiddenTabs.reduce(
    (sum, tab) => sum + (tab.props.counter ?? 0),
    0
  );

  return (
    <ContextMenu.Root
      theme={InlineTabsMenuTheme}
      mode="hover"
      onOpen={onOpenChange}
    >
      <ContextMenu.Trigger ref={overflowRef} className={s.overflowTab}>
        <MoreIcon className={s.icon} aria-hidden />
        <Counter count={hiddenCount} />
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Content
          direction="down-left"
          className={cx(s.menu, themeClassName)}
        >
          <ListPlacementProvider placement="menu">
            {hiddenTabs.map((tab) => (
              <MenuItem
                key={tab.props.value}
                tab={tab}
                isSelected={tab.props.value === value}
                onSelect={handleSelect}
                onUnmount={onMenuItemUnmount}
              />
            ))}
          </ListPlacementProvider>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};

OverflowTab.displayName = DISPLAY_NAME;
