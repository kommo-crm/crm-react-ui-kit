import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/preview-api';

import { CanvasCentered } from '@storybook-utils/constants';

import {
  Text,
  TextPrimaryTheme,
  TextSecondaryLightTheme,
} from 'src/components/Text';
import { Label, LabelTheme } from 'src/components/Label';

import { i18n } from '@i18n';

import {
  RadioPrimaryTheme,
  RadioGroup,
  RadioGroupTheme,
  RadioGroupItemRootTheme,
} from '..';

const DefaultRadioValues = [
  {
    name: 'Left',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam ducimus inventore minima optio error unde incidunt atque. Minima, maxime?',
  },
  {
    name: 'Top',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptatibus. Rem ipsa placeat a laboriosam ipsum harum eligendi corrupti laudantium dicta, doloribus quia labore libero et, quod dolores architecto repellendus.',
  },
  {
    name: 'Right',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, accusamus.',
  },
];

const USAGE = `
import { useState } from "react";
import { Label, LabelTheme } from "@kommo-crm/crm-react-ui-kit/Label";
import {
  Text,
  TextPrimaryTheme,
  TextSecondaryLightTheme,
} from "@kommo-crm/crm-react-ui-kit/Text";

import {
  RadioPrimaryTheme,
  RadioGroup,
  RadioGroupItemRootTheme,
  RadioGroupTheme,
} from "@kommo-crm/crm-react-ui-kit/RadioGroup";

const DefaultRadioValues = [
  {
    name: "${i18n.t('Left')}",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam ducimus inventore minima optio error unde incidunt atque. Minima, maxime?",
  },
  {
    name: "${i18n.t('Top')}",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptatibus. Rem ipsa placeat a laboriosam ipsum harum eligendi corrupti laudantium dicta, doloribus quia labore libero et, quod dolores architecto repellendus.",
  },
  {
    name: "${i18n.t('Right')}",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, accusamus.",
  },
];

function App() {
  const [value, setValue] = useState<string>("");

  const handleChange = (e: string) => {
    setValue(e);
  };

  return (
    <RadioGroup
      name="radioGroup"
      orientation="horizontal"
      theme={RadioGroupTheme}
      onChange={handleChange}
      value={value}
    >
      {DefaultRadioValues.map((item) => (
        <RadioGroup.ItemRoot
          key={item.name}
          value={item.name.toLowerCase()}
          theme={RadioGroupItemRootTheme}
        >
          <Label
            textPlacement="right"
            theme={LabelTheme}
            text={
              <Text size="l" theme={TextPrimaryTheme}>
                {item.name}
              </Text>
            }
            description={
              <Text size="s" theme={TextSecondaryLightTheme}>
                {item.description}
              </Text>
            }
          >
            <RadioGroup.Radio theme={RadioPrimaryTheme} />
          </Label>
        </RadioGroup.ItemRoot>
      ))}
    </RadioGroup>
  );
}
`;

const meta = {
  title: 'Components/RadioGroup',
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
    theme: RadioGroupTheme,
    onChange: action('onChange'),
    orientation: 'horizontal',
    name: 'radioGroup',
  },
  component: RadioGroup,
  render: (props) => {
    const [, setArgs] = useArgs();

    const handleChange = (e: string) => {
      props.onChange(e);

      if (!('defaultValue' in props)) {
        setArgs({ value: e });
      }
    };

    return (
      <RadioGroup {...props} onChange={handleChange}>
        {DefaultRadioValues.map((item) => (
          <RadioGroup.ItemRoot
            key={item.name}
            value={item.name.toLowerCase()}
            theme={RadioGroupItemRootTheme}
          >
            <Label
              textPlacement="right"
              theme={LabelTheme}
              text={
                <Text size="l" theme={TextPrimaryTheme}>
                  {i18n.t(item.name)}
                </Text>
              }
              description={
                <Text size="s" theme={TextSecondaryLightTheme}>
                  {item.description}
                </Text>
              }
            >
              <RadioGroup.Radio theme={RadioPrimaryTheme} />
            </Label>
          </RadioGroup.ItemRoot>
        ))}
      </RadioGroup>
    );
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: DefaultRadioValues[0].name.toLowerCase(),
  },
};

export const Uncontrolled: Story = {
  args: { defaultValue: DefaultRadioValues[0].name.toLowerCase() },
};

export const Vertical: Story = {
  args: {
    value: DefaultRadioValues[0].name.toLowerCase(),
    orientation: 'vertical',
  },
};
