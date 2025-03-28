import React from 'react';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import { CanvasCentered } from '@storybook-utils/constants';

import { LabelTheme } from 'src/components/Label';
import { Text, TextPrimaryTheme } from 'src/components/Text';

import { CheckboxLightTheme } from 'src/components/Checkbox/Checkbox.themes';

import { i18n } from '@i18n';

import {
  CheckboxGroup,
  CheckboxGroupItemRootTheme,
  CheckboxGroupTheme,
} from '..';
import { type CheckboxGroupChangeEvent } from '../CheckboxGroup.props';

const DefaultCheckboxValues = [
  {
    name: 'Left',
    value: 'Left',
  },
  {
    name: 'Top',
    value: 'Top',
    isDefaultChecked: true,
  },
  {
    name: 'Right',
    value: 'Right',
    isDefaultChecked: false,
    isDisabled: true,
  },
];

const USAGE = `
import { Text, TextPrimaryTheme } from "@kommo-crm/crm-react-ui-kit/Text";
import { LabelTheme } from "@kommo-crm/crm-react-ui-kit/Label";
import { CheckboxLightTheme } from "@kommo-crm/crm-react-ui-kit/Checkbox";

import {
  CheckboxGroup,
  CheckboxGroupTheme,
  CheckboxGroupItemRootTheme,
  CheckboxGroupChangeEvent,
} from "@kommo-crm/crm-react-ui-kit/CheckboxGroup";

const DefaultCheckboxValues = [
  {
    name: "Left",
    value: "${i18n.t('Left')}",
  },
  {
    name: "Top",
    value: "${i18n.t('Top')}",
    isDefaultChecked: true,
  },
  {
    name: "Right",
    value: "${i18n.t('Right')}",
    isDefaultChecked: false,
    isDisabled: true,
  },
];

function App() {
  const handleChange: CheckboxGroupChangeEvent = (values, changedValue) => {
    console.log(values, changedValue);
  };

  return (
    <CheckboxGroup
      theme={CheckboxGroupTheme}
      onChange={handleChange}
      orientation="horizontal"
    >
      <CheckboxGroup.ItemRootSelectAll theme={CheckboxGroupItemRootTheme}>
        <CheckboxGroup.Label
          textPlacement="right"
          theme={LabelTheme}
          isCentered
          text={
            <Text size="l" theme={TextPrimaryTheme}>
              ${i18n.t('Select All')}
            </Text>
          }
        >
          <CheckboxGroup.CheckboxSelectAll theme={CheckboxLightTheme} />
        </CheckboxGroup.Label>
      </CheckboxGroup.ItemRootSelectAll>

      {DefaultCheckboxValues.map((item) => (
        <CheckboxGroup.ItemRoot
          key={item.name}
          name={item.name}
          value={item.value}
          isDefaultChecked={item.isDefaultChecked}
          isDisabled={item.isDisabled}
          theme={CheckboxGroupItemRootTheme}
        >
          <CheckboxGroup.Label
            textPlacement="right"
            theme={LabelTheme}
            isCentered
            text={
              <Text size="l" theme={TextPrimaryTheme}>
                {item.name}
              </Text>
            }
          >
            <CheckboxGroup.Checkbox theme={CheckboxLightTheme} />
          </CheckboxGroup.Label>
        </CheckboxGroup.ItemRoot>
      ))}
    </CheckboxGroup>
  );
}
`;

const meta = {
  title: 'Components/CheckboxGroup',
  parameters: {
    ...CanvasCentered,
    docs: {
      source: {
        code: USAGE,
        language: 'jsx',
      },
    },
  },
  argTypes: {
    onChange: {
      description: 'State change processing function.',
      table: {
        type: {
          summary:
            '(values: CheckboxStateType[], changedValue: ChangeOptions) => void',
          detail: `
            (values: CheckboxStateType[], changedValue: ChangeOptions) => void

            Types:
            - CheckboxStateType: {
                name: string; // A unique value for the Checkbox.
                isChecked: boolean; // Checkbox state: whether it is selected.
                isDisabled?: boolean; // An attribute indicating whether the element is disabled.
              }
            - ChangeOptions: {
                type: 'selectAll' | 'checkbox'; // Type of change.
                name?: string; // Value for changing the state of one element.
              }
          `,
        },
      },
    },
  },
  args: {
    theme: CheckboxGroupTheme,
    onChange: action('onChange'),
    orientation: 'horizontal',
  },
  component: CheckboxGroup,
  render: (props) => {
    const handleChange: CheckboxGroupChangeEvent = (values, changedValue) => {
      props.onChange?.(values, changedValue);
    };

    return (
      <CheckboxGroup {...props} onChange={handleChange}>
        <CheckboxGroup.ItemRootSelectAll theme={CheckboxGroupItemRootTheme}>
          <CheckboxGroup.Label
            textPlacement="right"
            theme={LabelTheme}
            text={
              <Text size="l" theme={TextPrimaryTheme}>
                {i18n.t('Select All')}
              </Text>
            }
          >
            <CheckboxGroup.CheckboxSelectAll theme={CheckboxLightTheme} />
          </CheckboxGroup.Label>
        </CheckboxGroup.ItemRootSelectAll>

        {DefaultCheckboxValues.map((item) => (
          <CheckboxGroup.ItemRoot
            key={item.name}
            name={item.name}
            value={item.value}
            isDefaultChecked={item.isDefaultChecked}
            isDisabled={item.isDisabled}
            theme={CheckboxGroupItemRootTheme}
          >
            <CheckboxGroup.Label
              textPlacement="right"
              theme={LabelTheme}
              text={
                <Text size="l" theme={TextPrimaryTheme}>
                  {i18n.t(item.name)}
                </Text>
              }
            >
              <CheckboxGroup.Checkbox theme={CheckboxLightTheme} />
            </CheckboxGroup.Label>
          </CheckboxGroup.ItemRoot>
        ))}
      </CheckboxGroup>
    );
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};
