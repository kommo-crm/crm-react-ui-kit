import React, { CSSProperties, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { AddonsMap, CanvasCentered } from '@storybook-utils/constants';

import { i18n } from '@i18n';

import {
  Input,
  InputDarkTheme,
  InputLightTheme,
  type InputInvalidDescriptionPlacement,
} from '..';

const invalidDescriptionPlacements: InputInvalidDescriptionPlacement[] = [
  'bottom',
  'right',
];

const themeMap = {
  InputLightTheme,
  InputDarkTheme,
};

const USAGE = `
import { useState } from "react";

import { Input, InputLightTheme } from "@kommo-crm/crm-react-ui-kit/Input";

function App() {
  const [text, setText] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <Input
      theme={InputLightTheme}
      value={text}
      onChange={handleChange}
      placeholder="Placeholder"
    />
  );
}
`;

const meta = {
  title: 'Components/Input',
  component: Input,
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
    onChange: action('onChange'),
    placeholder: 'Placeholder',
    theme: InputLightTheme,
  },
  argTypes: {
    before: {
      control: 'select',
      mapping: AddonsMap,
      options: Object.keys(AddonsMap),
    },
    after: {
      control: 'select',
      mapping: AddonsMap,
      options: Object.keys(AddonsMap),
    },
    theme: {
      control: 'select',
      options: Object.keys(themeMap),
      mapping: themeMap,
    },
    invalidDescriptionPlacement: {
      control: 'select',
      mapping: invalidDescriptionPlacements,
      options: invalidDescriptionPlacements,
    },
  },
  render: (props) => {
    const [text, setText] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);

      if (props?.onChange) {
        props.onChange(e);
      }
    };

    return <Input {...props} value={text} onChange={handleChange} />;
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const baseContainerStyles: CSSProperties = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
};

export const States: Story = {
  render: (props) => {
    return (
      <div style={baseContainerStyles}>
        <Input {...props} placeholder="Idle" />
        <Input
          {...props}
          isInvalid
          invalidDescription={i18n.t('Required field')}
          placeholder="isInvalid"
        />
        <Input {...props} isDisabled placeholder="isDisabled" />
      </div>
    );
  },
};

export const InvalidPlacement: Story = {
  args: {
    invalidDescription: i18n.t('Required field'),
  },
  render: (props) => {
    return (
      <div style={baseContainerStyles}>
        {invalidDescriptionPlacements.map((placement) => (
          <Input
            {...props}
            isInvalid
            key={placement}
            invalidDescriptionPlacement={placement}
          />
        ))}
      </div>
    );
  },
};

export const Addons: Story = {
  args: {
    before: AddonsMap.CopyIcon,
    after: AddonsMap.NeutralButton,
  },
};

export const InputLight: Story = {
  tags: ['!dev'],
  args: { theme: InputLightTheme },
};

export const InputDark: Story = {
  tags: ['!dev'],
  args: { theme: InputDarkTheme },
};
