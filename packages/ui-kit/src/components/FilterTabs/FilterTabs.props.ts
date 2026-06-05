import React, { type HTMLAttributes } from 'react';

import { type FilterTabsThemeType } from './FilterTabs.themes';
import { type Button, type TabProps } from './components/Tab';
import { type ItemRootProps } from './components/ItemRoot';
import { type ItemRootResetProps } from './components/ItemRootReset/ItemRootReset.props';

export type FilterTabsOrientation = 'horizontal' | 'vertical';

type FilterTabsBaseProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'disabled'
>;

export type FilterTabsChangeEvent = <T>(
  updatedValues: T[],
  trigger?: T
) => void;

export type FilterTabsContextProps = {
  /**
   * The current selected values.
   */
  values: string[];
  /**
   * Flag determining if multi-selection is allowed.
   */
  isMultiSelect?: boolean;
  /**
   * `Disabled` attribute for `FilterTabs`.
   *
   * Automatically applied to all Tabs.
   */
  isDisabled?: boolean;
  /**
   * Handler for the selected value.
   *
   * Automatically applies to all Tabs.
   */
  onChange: (name?: string) => void;
  /**
   * Registers the selected value during initialization.
   */
  registerActiveName: (name: string) => void;
};

export type FilterTabsProps = FilterTabsBaseProps &
  Omit<FilterTabsContextProps, 'onChange' | 'values' | 'registerActiveName'> & {
    /**
     * Clicking tab event handler.
     * Receives the element's value as an argument.
     */
    onChange: FilterTabsChangeEvent;
    /**
     * Object with CSS theme properties.
     */
    theme: FilterTabsThemeType;
    /**
     * Defines the orientation of FilterTabs: vertical or horizontal.
     */
    orientation?: FilterTabsOrientation;
  };

export type FilterTabsType = React.ForwardRefExoticComponent<
  FilterTabsProps & React.RefAttributes<HTMLDivElement>
> & {
  /**
   * Tab component.
   */
  Tab: React.ForwardRefExoticComponent<TabProps & Button>;
  /**
   * ItemRoot component.
   */
  ItemRoot: React.FC<ItemRootProps>;
  /**
   * ItemRootReset component.
   */
  ItemRootReset: React.FC<ItemRootResetProps>;
  /**
   * TabReset component.
   */
  TabReset: React.ForwardRefExoticComponent<TabProps & Button>;
};
