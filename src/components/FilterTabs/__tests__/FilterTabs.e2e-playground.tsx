import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import {
  FilterTabsItemRootTheme,
  FilterTabs,
  FilterTabsProps,
  FilterTabsTheme,
  TabPrimaryTheme,
} from '..';

export const FilterTabsPlayground = (
  props: ComponentPlaygroundProps<FilterTabsProps>
) => {
  return (
    <ComponentPlayground<FilterTabsProps>
      {...props}
      propSets={[
        {
          children: [
            <React.Fragment key="fragment-description">
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
            </React.Fragment>,

            <React.Fragment key="fragment-description">
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
            </React.Fragment>,
          ],
          orientation: ['horizontal', 'vertical'],
        },
        {
          children: [
            <React.Fragment key="fragment-description">
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
            </React.Fragment>,
          ],
          isDisabled: [true],
        },
        {
          children: [
            <React.Fragment key="fragment-description">
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
            </React.Fragment>,
          ],
          isMultiSelect: [true],
        },
      ]}
    >
      {(itemProps: FilterTabsProps) => (
        <FilterTabs {...itemProps} theme={FilterTabsTheme} />
      )}
    </ComponentPlayground>
  );
};
