import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/preview-api';

import { CanvasCentered } from '@storybook-utils/constants';
import { LabelWrapper } from '@storybook-utils/components';

import { i18n } from '@i18n';

import { Text, TextPrimaryTheme } from 'src/components/Text';

import {
  Checkbox,
  CheckboxLightTheme,
  CheckboxSmallLightTheme,
  CheckboxDarkTheme,
  CheckboxSmallDarkTheme,
  CheckboxLabelTheme,
  type CheckedStyleType,
} from '..';

const themeMap = {
  CheckboxLightTheme,
  CheckboxSmallLightTheme,
  CheckboxDarkTheme,
  CheckboxSmallDarkTheme,
};

const USAGE = `
import { useState } from "react";
import { Text, TextPrimaryTheme } from "@kommo-crm/crm-react-ui-kit/Text";

import {
  Checkbox,
  CheckboxLabelTheme,
  CheckboxLightTheme,
} from "@kommo-crm/crm-react-ui-kit/Checkbox"; 

function App() {
  const [checked, setChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return (
    <Checkbox.Label
      theme={CheckboxLabelTheme}
      textPlacement="right"
      isCentered
      text={
        <Text size="l" theme={TextPrimaryTheme}>
          ${i18n.t('Click me')}
        </Text>
      }
    >
      <Checkbox
        theme={CheckboxLightTheme}
        onChange={handleChange}
        isChecked={checked}
      />
    </Checkbox.Label>
  );
}
`;

const meta = {
  title: 'Components/Checkbox',
  parameters: {
    ...CanvasCentered,
    docs: {
      source: {
        code: USAGE,
        language: 'jsx',
      },
    },
  },
  component: Checkbox,
  args: {
    theme: CheckboxLightTheme,
    onChange: action('onChange'),
  },
  argTypes: {
    theme: {
      control: 'select',
      options: Object.keys(themeMap),
      mapping: themeMap,
    },
  },
  render: (props) => {
    const [, setArgs] = useArgs();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (props.onChange) {
        props.onChange(e);
      }

      if (!('isDefaultChecked' in props)) {
        setArgs({ isChecked: e.target.checked });
      }
    };

    return (
      <LabelWrapper
        Component={Checkbox.Label}
        theme={CheckboxLabelTheme}
        textPlacement="right"
      >
        <Checkbox {...props} onChange={handleChange} />
      </LabelWrapper>
    );
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isChecked: true,
  },
};

export const Uncontrolled: Story = {
  args: {
    isDefaultChecked: true,
  },
};

export const CheckedStyles: Story = {
  args: { isDefaultChecked: true },
  render: (props) => {
    return (
      <div>
        {['Mark', 'Indeterminate'].map((style) => (
          <div key={style}>
            <LabelWrapper
              Component={Checkbox.Label}
              theme={CheckboxLabelTheme}
              text={i18n.t(style)}
              textPlacement="right"
            >
              <Checkbox
                {...props}
                checkedStyle={style.toLowerCase() as CheckedStyleType}
              />
            </LabelWrapper>
          </div>
        ))}
      </div>
    );
  },
};

export const States: Story = {
  args: { isDefaultChecked: false },
  render: (props) => (
    <div>
      <div>
        <LabelWrapper
          Component={Checkbox.Label}
          text={i18n.t('Disabled')}
          textPlacement="right"
        >
          <Checkbox {...props} isDisabled />
        </LabelWrapper>
      </div>
      <div>
        <LabelWrapper
          Component={Checkbox.Label}
          text={i18n.t('Invalid')}
          textPlacement="right"
        >
          <Checkbox {...props} isInvalid />
        </LabelWrapper>
      </div>
      <div>
        <LabelWrapper
          Component={Checkbox.Label}
          text={i18n.t('Checked')}
          textPlacement="right"
        >
          <Checkbox theme={props.theme} isDefaultChecked />
        </LabelWrapper>
      </div>
    </div>
  ),
};

export const CheckboxLight: Story = {
  tags: ['!dev'],
  args: {
    theme: CheckboxLightTheme,
  },
};

export const CheckboxDark: Story = {
  tags: ['!dev'],
  args: {
    theme: CheckboxDarkTheme,
  },
};

const renderSmallCheckbox = (props: any) => {
  const [, setArgs] = useArgs();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e);
    }

    if (!('isDefaultChecked' in props)) {
      setArgs({ isChecked: e.target.checked });
    }
  };

  return (
    <LabelWrapper
      Component={Checkbox.Label}
      theme={CheckboxLabelTheme}
      textPlacement="right"
      text={
        <Text theme={TextPrimaryTheme} size="s">
          {i18n.t('Click me')}
        </Text>
      }
      isCentered
    >
      <Checkbox {...props} onChange={handleChange} />
    </LabelWrapper>
  );
};

export const CheckboxSmallLight: Story = {
  tags: ['!dev'],
  args: {
    theme: CheckboxSmallLightTheme,
  },
  render: renderSmallCheckbox,
};

export const CheckboxSmallDark: Story = {
  tags: ['!dev'],
  args: {
    theme: CheckboxSmallLightTheme,
  },
  render: renderSmallCheckbox,
};
