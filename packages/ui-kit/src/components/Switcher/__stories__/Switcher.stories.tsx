import React from 'react';
import { type Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/preview-api';

import { CanvasCentered } from '@storybook-utils/constants';
import { LabelWrapper } from '@storybook-utils/components';

import { i18n } from '@i18n';

import { SwitcherPrimaryTheme, Switcher, type SwitcherTheme } from '..';

const USAGE = `
import { useState } from "react";
import { LabelTheme } from "@kommo-crm/crm-react-ui-kit/Label";
import { Text, TextPrimaryTheme } from "@kommo-crm/crm-react-ui-kit/Text";

import {
  Switcher,
  SwitcherPrimaryTheme,
} from "@kommo-crm/crm-react-ui-kit/Switcher";

function App() {
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return (
    <Switcher.Label
      theme={LabelTheme}
      isCentered={true}
      textPlacement="right"
      text={
        <Text theme={TextPrimaryTheme} size="l">
          ${i18n.t('Click me')}
        </Text>
      }
    >
      <Switcher
        checked={checked}
        onChange={handleChange}
        theme={SwitcherPrimaryTheme}
      />
    </Switcher.Label>
  );
}
`;

const meta = {
  title: 'Components/Switcher',
  parameters: {
    ...CanvasCentered,
    docs: {
      source: {
        code: USAGE,
        language: 'jsx',
      },
    },
  },
  component: Switcher,
  args: {
    theme: SwitcherPrimaryTheme,
    onChange: action('onChange'),
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
      <LabelWrapper isCentered Component={Switcher.Label} textPlacement="right">
        <Switcher {...props} onChange={handleChange} />
      </LabelWrapper>
    );
  },
} satisfies Meta<typeof Switcher>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isChecked: false,
  },
};

export const Uncontrolled: Story = {
  args: {
    isDefaultChecked: true,
  },
};

export const States: Story = {
  args: { isDefaultChecked: false },
  render: (props) => (
    <div>
      <div>
        <LabelWrapper
          Component={Switcher.Label}
          text={i18n.t('Disabled')}
          textPlacement="right"
        >
          <Switcher {...props} isDisabled />
        </LabelWrapper>
      </div>
      <div>
        <LabelWrapper
          Component={Switcher.Label}
          text={i18n.t('Checked')}
          textPlacement="right"
        >
          <Switcher theme={props.theme} isDefaultChecked={true} />
        </LabelWrapper>
      </div>
    </div>
  ),
};

const themeS: SwitcherTheme = {
  '--crm-ui-kit-switcher-active-element-color': '#FFCC99',
  '--crm-ui-kit-switcher-border-color': '#4169E1',
  '--crm-ui-kit-switcher-disabled-opacity': '0.6',
  '--crm-ui-kit-switcher-circle-size': '14px',
  '--crm-ui-kit-switcher-line-width': '9px',
  '--crm-ui-kit-switcher-border-width': '1px',
  '--crm-ui-kit-switcher-line-border-radius': '26px',
  '--crm-ui-kit-switcher-focus-visible-outline-color': '#0057a9',
  '--crm-ui-kit-switcher-focus-visible-outline-width': '2px',
  '--crm-ui-kit-switcher-focus-visible-border-radius': '2px',
  '--crm-ui-kit-switcher-focus-visible-outline-offset': '1px',
  '--crm-ui-kit-switcher-focus-visible-outline-style': 'solid',
};

const themeM: SwitcherTheme = {
  ...themeS,
  '--crm-ui-kit-switcher-circle-size': '30px',
  '--crm-ui-kit-switcher-line-width': '17px',
  '--crm-ui-kit-switcher-border-width': '2px',
};

const themeL: SwitcherTheme = {
  ...themeS,
  '--crm-ui-kit-switcher-circle-size': '60px',
  '--crm-ui-kit-switcher-line-width': '45px',
  '--crm-ui-kit-switcher-border-width': '3px',
};

export const CustomTheme: Story = {
  args: {
    isChecked: false,
  },
  render: (props) => {
    const [, setArgs] = useArgs();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (props.onChange) {
        props.onChange(e);
      }

      setArgs({ isChecked: e.target.checked });
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <LabelWrapper
          Component={Switcher.Label}
          isCentered
          textPlacement="right"
        >
          <Switcher {...props} onChange={handleChange} theme={themeS} />
        </LabelWrapper>
        <LabelWrapper
          Component={Switcher.Label}
          isCentered
          textPlacement="right"
        >
          <Switcher {...props} onChange={handleChange} theme={themeM} />
        </LabelWrapper>
        <LabelWrapper
          Component={Switcher.Label}
          isCentered
          textPlacement="right"
        >
          <Switcher {...props} onChange={handleChange} theme={themeL} />
        </LabelWrapper>
      </div>
    );
  },
};
