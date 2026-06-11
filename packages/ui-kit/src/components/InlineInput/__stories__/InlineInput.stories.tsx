import React, { CSSProperties, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { CanvasCentered, IconsMap } from '@storybook-utils/constants';

import { i18n } from '@i18n';

import {
  InlineInput,
  InlineInputPrimaryTheme,
  InlineInputPrimaryFocusedTheme,
  type InlineInputTheme,
} from '..';

const FixedWithInlineInputPrimaryTheme: InlineInputTheme = {
  ...InlineInputPrimaryTheme,
  '--crm-ui-kit-inline-input-width': '300px',
};

const FixedWidthInlineInputPrimaryFocusedTheme: InlineInputTheme = {
  ...InlineInputPrimaryFocusedTheme,
  '--crm-ui-kit-inline-input-width': '300px',
};

const themeMap = {
  InlineInputPrimaryTheme: FixedWithInlineInputPrimaryTheme,
  InlineInputPrimaryFocusedTheme: FixedWidthInlineInputPrimaryFocusedTheme,
};

const USAGE = `
import { useState } from "react";

import {
  InlineInput,
  InlineInputPrimaryTheme,
} from "@kommo-crm/crm-react-ui-kit/InlineInput";

function App() {
  const [text, setText] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <InlineInput
      theme={InlineInputPrimaryTheme}
      value={text}
      onChange={handleChange}
      placeholder="Placeholder"
    />
  );
}
`;

const meta = {
  title: 'Components/InlineInput',
  component: InlineInput,
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
    theme: FixedWithInlineInputPrimaryTheme,
  },
  argTypes: {
    after: {
      control: 'select',
      mapping: IconsMap,
      options: Object.keys(IconsMap),
    },
    theme: {
      control: 'select',
      options: Object.keys(themeMap),
      mapping: themeMap,
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

    return <InlineInput {...props} value={text} onChange={handleChange} />;
  },
} satisfies Meta<typeof InlineInput>;

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
        <InlineInput {...props} placeholder="Idle" />
        <InlineInput
          {...props}
          isInvalid
          invalidDescription={i18n.t('Required field')}
          placeholder="isInvalid"
        />
        <InlineInput {...props} isDisabled placeholder="isDisabled" />
      </div>
    );
  },
};

export const Invalid: Story = {
  args: {
    isInvalid: true,
    invalidDescription: 'Required field',
  },
};

export const Icons: Story = {
  args: {
    after: IconsMap.CopyIcon,
  },
};
