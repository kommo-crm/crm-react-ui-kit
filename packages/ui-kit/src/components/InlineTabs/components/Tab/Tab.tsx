import React, { forwardRef } from 'react';
import cx from 'classnames';

import { omit } from '@ui-kit/utils';

import { Counter } from '../Counter';
import { useListPlacementContext } from '../List/List.context';

import { type TabProps } from './Tab.props';

import s from './Tab.module.css';

const DISPLAY_NAME = 'InlineTabs.Tab';

/**
 * Content of a tab. The list renders it inside the tab trigger in the panel,
 * inside the menu item and inside the measure layer, so the props and the ref
 * reach this inner element, not the trigger or the menu item.
 *
 * Every place gets its own instance of the children, so they must keep no
 * state, effects or ids: the menu instance mounts anew whenever the tab
 * enters the menu.
 */
export const Tab = forwardRef<HTMLDivElement, TabProps>((props, ref) => {
  const { className, counter, children, ...rest } = props;

  const { placement } = useListPlacementContext(DISPLAY_NAME);

  /**
   * The panel copy stays in the DOM even while the tab is in the menu,
   * so the menu and measure copies drop the id to keep it unique.
   */
  const omittedProps: (keyof typeof rest)[] =
    placement === 'menu' || placement === 'measure'
      ? ['value', 'id']
      : ['value'];

  return (
    <div
      ref={ref}
      className={cx(
        s.content,
        placement === 'menu' ? s.menu : s.panel,
        className
      )}
      {...omit(rest, omittedProps)}
    >
      {children}
      <Counter count={counter} />
    </div>
  );
});

Tab.displayName = DISPLAY_NAME;
