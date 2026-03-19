import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import {
  FilterTabsItemRootTheme,
  FilterTabs,
  FilterTabsTheme,
  TabPrimaryTheme,
} from '..';

export type FilterTabsVariant = 'default' | 'withDefaultActive';

export interface FilterTabsTestProps {
  variant: FilterTabsVariant;
  orientation?: 'horizontal' | 'vertical';
  isDisabled?: boolean;
  isMultiSelect?: boolean;
}

const variantChildrenMap: Record<FilterTabsVariant, React.ReactNode> = {
  default: (
    <React.Fragment key="default">
      <FilterTabs.ItemRootReset theme={FilterTabsItemRootTheme}>
        <FilterTabs.TabReset theme={TabPrimaryTheme}>
          Select All
        </FilterTabs.TabReset>
      </FilterTabs.ItemRootReset>
      <FilterTabs.ItemRoot theme={FilterTabsItemRootTheme} name="s">
        <FilterTabs.Tab theme={TabPrimaryTheme}>S Value</FilterTabs.Tab>
      </FilterTabs.ItemRoot>
      <FilterTabs.ItemRoot theme={FilterTabsItemRootTheme} name="m">
        <FilterTabs.Tab theme={TabPrimaryTheme}>M Value</FilterTabs.Tab>
      </FilterTabs.ItemRoot>
    </React.Fragment>
  ),
  withDefaultActive: (
    <React.Fragment key="with-default-active">
      <FilterTabs.ItemRootReset theme={FilterTabsItemRootTheme}>
        <FilterTabs.TabReset theme={TabPrimaryTheme}>
          Select All
        </FilterTabs.TabReset>
      </FilterTabs.ItemRootReset>
      <FilterTabs.ItemRoot
        theme={FilterTabsItemRootTheme}
        isDefaultActive
        name="s"
      >
        <FilterTabs.Tab theme={TabPrimaryTheme}>S Value</FilterTabs.Tab>
      </FilterTabs.ItemRoot>
      <FilterTabs.ItemRoot
        theme={FilterTabsItemRootTheme}
        isDefaultActive
        name="m"
      >
        <FilterTabs.Tab theme={TabPrimaryTheme}>M Value</FilterTabs.Tab>
      </FilterTabs.ItemRoot>
    </React.Fragment>
  ),
};

export const FilterTabsPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<FilterTabsTestProps>) => (
  <ComponentPlayground<FilterTabsTestProps>
    appearance={appearance}
    props={props}
  >
    {({ variant, ...restProps }) => (
      <FilterTabs {...restProps} theme={FilterTabsTheme}>
        {variantChildrenMap[variant]}
      </FilterTabs>
    )}
  </ComponentPlayground>
);
