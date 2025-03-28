import React, { forwardRef } from 'react';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { useFilterTabsContext } from '../../FilterTabs.context';
import { useTabItemRootContext } from '../ItemRoot/ItemRoot.context';

import { type TabProps } from './Tab.props';
import { type TabThemeType } from './Tab.themes';

import s from './Tab.module.css';

type B = HTMLButtonElement;

const DISPLAY_NAME = 'FilterTabs.Tab';

export const Tab = forwardRef<B, TabProps>((props, ref) => {
  const { theme, className, children, ...restProps } = props;

  const themeClassName = useThemeClassName<TabThemeType>(theme);

  const { values, isDisabled, onChange } = useFilterTabsContext(DISPLAY_NAME);

  const {
    name,
    isDisabled: isItemRootDisabled,
    ...rest
  } = useTabItemRootContext(DISPLAY_NAME);

  const isSelected = values.includes(name);

  const handleChange = () => {
    onChange(name);
  };

  return (
    <button
      ref={ref}
      className={cx(s.button, themeClassName, className, {
        [s.selected]: isSelected,
      })}
      onClick={handleChange}
      name={name}
      disabled={isDisabled || isItemRootDisabled}
      {...rest}
      {...restProps}
    >
      {children}
    </button>
  );
});

Tab.displayName = DISPLAY_NAME;
