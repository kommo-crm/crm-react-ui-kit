import React, { forwardRef } from 'react';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { useFilterTabsContext } from '../../FilterTabs.context';
import { useTabItemRootResetContext } from '../ItemRootReset/ItemRootReset.context';

import { type TabProps } from '../Tab/Tab.props';
import { type TabThemeType } from '../Tab/Tab.themes';

import s from '../Tab/Tab.module.css';

type B = HTMLButtonElement;

const DISPLAY_NAME = 'FilterTabs.TabReset';

export const TabReset = forwardRef<B, TabProps>((props, ref) => {
  const { theme, className, children, ...restProps } = props;

  const themeClassName = useThemeClassName<TabThemeType>(theme);

  const { values, isDisabled, onChange } = useFilterTabsContext(DISPLAY_NAME);

  const { isDisabled: isItemRootDisabled, ...rest } =
    useTabItemRootResetContext(DISPLAY_NAME);

  const isSelected = !values.length;

  return (
    <button
      ref={ref}
      className={cx(s.button, themeClassName, className, {
        [s.selected]: isSelected,
      })}
      onClick={() => onChange()}
      disabled={isDisabled || isItemRootDisabled}
      {...rest}
      {...restProps}
    >
      {children}
    </button>
  );
});

TabReset.displayName = DISPLAY_NAME;
