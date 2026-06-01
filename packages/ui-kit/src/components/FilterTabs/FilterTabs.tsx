import React, { forwardRef, useState } from 'react';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { type FilterTabsType, type FilterTabsProps } from './FilterTabs.props';
import { FilterTabsProvider, DISPLAY_NAME } from './FilterTabs.context';
import { type FilterTabsThemeType } from './FilterTabs.themes';

import { ItemRoot } from './components/ItemRoot';
import { Tab } from './components/Tab';
import { ItemRootReset, TabReset } from './components/ItemRootReset';

import s from './FilterTabs.module.css';

type D = HTMLDivElement;

export const FilterTabs = forwardRef<D, FilterTabsProps>((props, ref) => {
  const {
    className,
    onChange,
    isMultiSelect,
    isDisabled = false,
    orientation = 'horizontal',
    theme,
    children,
    ...rest
  } = props;

  const [state, setState] = useState<string[]>([]);
  const themeClassName = useThemeClassName<FilterTabsThemeType>(theme);

  const handleManageState = (name?: string) => {
    setState((prev) => {
      let updatedState = prev;

      if (!name && state.length) {
        updatedState = [];
      }

      if (name) {
        const isSelected = state.includes(name);

        if (isMultiSelect) {
          updatedState = isSelected
            ? prev.filter((item) => item !== name)
            : [...prev, name];
        }

        if (!isMultiSelect && !isSelected) {
          updatedState = [name];
        }
      }

      onChange(updatedState, name);

      return updatedState;
    });
  };

  const registerActiveName = (name: string) => {
    setState((prev) => {
      if (isMultiSelect) {
        return [...prev, name];
      }

      if (!isMultiSelect && !prev.length) {
        return [name];
      }

      return prev;
    });
  };

  return (
    <FilterTabsProvider
      values={state}
      onChange={handleManageState}
      registerActiveName={registerActiveName}
      isDisabled={isDisabled}
    >
      <div
        className={cx(s.filter_tabs, themeClassName, className, {
          [s.horizontal]: orientation === 'horizontal',
        })}
        ref={ref}
        {...rest}
      >
        {children}
      </div>
    </FilterTabsProvider>
  );
}) as FilterTabsType;

FilterTabs.displayName = DISPLAY_NAME;

FilterTabs.ItemRoot = ItemRoot;
FilterTabs.ItemRootReset = ItemRootReset;
FilterTabs.Tab = Tab;
FilterTabs.TabReset = TabReset;
