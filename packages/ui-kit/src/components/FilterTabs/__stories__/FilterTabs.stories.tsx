import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { CanvasCentered } from '@storybook-utils/constants';

import { Text, TextPrimaryTheme } from 'src/components/Text';

import { i18n } from '@i18n';

import {
  TabPrimaryTheme,
  FilterTabs,
  FilterTabsTheme,
  FilterTabsItemRootTheme,
  type FilterTabsChangeEvent,
} from '..';

const DefaultValues = [
  {
    name: 'One',
    isDefaultActive: true,
  },
  {
    name: 'Two',
  },
  {
    name: 'Three',
  },
  {
    name: 'Four',
  },
];

const USAGE = `
import { Text, TextPrimaryTheme } from "@kommo-crm/crm-react-ui-kit/Text";

import {
  TabPrimaryTheme,
  FilterTabs,
  FilterTabsTheme,
  FilterTabsItemRootTheme,
  type FilterTabsChangeEvent,
} from "@kommo-crm/crm-react-ui-kit/FilterTabs";

const DefaultValues = [
  { name: "${i18n.t('One')}", isDefaultActive: true },
  { name: "${i18n.t('Two')}" },
  { name: "${i18n.t('Three')}" },
  { name: "${i18n.t('Four')}" },
];

function App() {
  const handleChange: FilterTabsChangeEvent = (updatedValues, trigger) => {
    console.log(updatedValues, trigger);
  };

  return (
    <FilterTabs onChange={handleChange} theme={FilterTabsTheme}>
      <FilterTabs.ItemRootReset theme={FilterTabsItemRootTheme}>
        <FilterTabs.TabReset theme={TabPrimaryTheme}>
          <Text theme={TextPrimaryTheme} size="l">
            ${i18n.t('Select All')}
          </Text>
        </FilterTabs.TabReset>
      </FilterTabs.ItemRootReset>

      {DefaultValues.map((item) => (
        <FilterTabs.ItemRoot
          theme={FilterTabsItemRootTheme}
          key={item.name}
          name={item.name}
          isDefaultActive={item.isDefaultActive}
        >
          <FilterTabs.Tab theme={TabPrimaryTheme}>
            <Text theme={TextPrimaryTheme} size="l">
              {item.name}
            </Text>
          </FilterTabs.Tab>
        </FilterTabs.ItemRoot>
      ))}
    </FilterTabs>
  );
}
`;

const meta = {
  title: 'Components/FilterTabs',
  parameters: {
    ...CanvasCentered,
    docs: {
      source: {
        code: USAGE,
        language: 'jsx',
      },
    },
  },
  args: {
    theme: FilterTabsTheme,
    onChange: action('onChange'),
    orientation: 'horizontal',
    isMultiSelect: false,
  },
  component: FilterTabs,
  render: (props) => {
    const handleChange: FilterTabsChangeEvent = (updatedValues, trigger) => {
      props.onChange?.(updatedValues, trigger);
    };

    return (
      <FilterTabs {...props} onChange={handleChange}>
        <FilterTabs.ItemRootReset theme={FilterTabsItemRootTheme}>
          <FilterTabs.TabReset theme={TabPrimaryTheme}>
            <Text theme={TextPrimaryTheme} size="l">
              {i18n.t('Select All')}
            </Text>
          </FilterTabs.TabReset>
        </FilterTabs.ItemRootReset>

        {DefaultValues.map((item) => (
          <FilterTabs.ItemRoot
            key={item.name}
            name={item.name}
            isDefaultActive={item.isDefaultActive}
            theme={FilterTabsItemRootTheme}
          >
            <FilterTabs.Tab theme={TabPrimaryTheme}>
              <Text theme={TextPrimaryTheme} size="l">
                {i18n.t(item.name)}
              </Text>
            </FilterTabs.Tab>
          </FilterTabs.ItemRoot>
        ))}
      </FilterTabs>
    );
  },
} satisfies Meta<typeof FilterTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const MultiSelect: Story = {
  args: {
    isMultiSelect: true,
  },
};
