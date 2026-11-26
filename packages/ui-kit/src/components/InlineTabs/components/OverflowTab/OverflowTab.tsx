import React, { useContext, useRef } from 'react';
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
  const {
    hiddenTabs,
    overflowRef,
    overflowButtonAriaLabel,
    onOpenChange,
    onMenuItemUnmount,
  } = useListOverflowContext(DISPLAY_NAME);
  const { themeClassName, value, select } = useContext(InlineTabsContext);

  const contentRef = useRef<HTMLDivElement>(null);
  const wasFocusInsideRef = useRef(false);

  if (hiddenTabs.length === 0) {
    return null;
  }

  const handleSelect = (tabValue: string) => {
    select(tabValue);
  };

  /**
   * Checked on close, while the content is still mounted: by the time
   * `onCloseAutoFocus` runs it is gone and focus is already on body.
   */
  const handleOpen = (isOpen: boolean) => {
    if (!isOpen) {
      wasFocusInsideRef.current = Boolean(
        contentRef.current?.contains(document.activeElement)
      );
    }

    onOpenChange(isOpen);
  };

  /**
   * A click outside closes the menu before this handler runs, with focus still
   * inside; focus then goes where the user clicked, even if it is body.
   */
  const handlePointerDownOutside = () => {
    wasFocusInsideRef.current = false;
  };

  /**
   * The hover menu does not restore focus on close, so focus from an unmounted
   * item falls to body. The body check keeps focus on an outside element the
   * menu was closed by.
   */
  const handleCloseAutoFocus = () => {
    const isFocusLost =
      !document.activeElement || document.activeElement === document.body;

    if (wasFocusInsideRef.current && isFocusLost) {
      overflowRef.current?.focus();
    }

    wasFocusInsideRef.current = false;
  };

  const hiddenCount = hiddenTabs.reduce(
    (sum, tab) => sum + (tab.props.counter ?? 0),
    0
  );

  return (
    <ContextMenu.Root
      theme={InlineTabsMenuTheme}
      mode="hover"
      onOpen={handleOpen}
    >
      <ContextMenu.Trigger
        ref={overflowRef}
        className={s.overflowTab}
        aria-label={overflowButtonAriaLabel}
      >
        <MoreIcon className={s.icon} aria-hidden />
        <Counter count={hiddenCount} />
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Content
          ref={contentRef}
          direction="down-left"
          className={cx(s.menu, themeClassName)}
          onPointerDownOutside={handlePointerDownOutside}
          onCloseAutoFocus={handleCloseAutoFocus}
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
