import React, { forwardRef } from 'react';
import cx from 'classnames';

import { useListPlacementContext } from '../List/List.context';

import { type TabMenuIconProps } from './TabMenuIcon.props';

import s from './TabMenuIcon.module.css';

const DISPLAY_NAME = 'InlineTabs.TabMenuIcon';

/**
 * Icon of the menu item; rendered only while the tab is in the overflow menu.
 */
export const TabMenuIcon = forwardRef<HTMLSpanElement, TabMenuIconProps>(
  (props, ref) => {
    const { className, children, ...rest } = props;

    const { placement } = useListPlacementContext(DISPLAY_NAME);

    if (placement !== 'menu') {
      return null;
    }

    return (
      <span ref={ref} className={cx(s.tabMenuIcon, className)} {...rest}>
        {children}
      </span>
    );
  }
);

TabMenuIcon.displayName = DISPLAY_NAME;
