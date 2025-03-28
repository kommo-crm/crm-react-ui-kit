import React, { CSSProperties, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { CanvasCentered } from '@storybook-utils/constants';

import { i18n } from '@i18n';

import { TextArea, TextareaLightTheme, TextareaDarkTheme } from '..';

const themeMap = {
  TextareaLightTheme,
  TextareaDarkTheme,
};

const USAGE = `
import { useState } from "react";
import {
  TextArea,
  TextareaLightTheme,
} from "@kommo-crm/crm-react-ui-kit/TextArea";

function App() {
  const [text, setText] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <TextArea
      theme={TextareaLightTheme}
      rows={2}
      placeholder="TextArea"
      value={text}
      onChange={handleChange}
    />
  );
}
`;

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
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
    onResize: action('onResize'),
    placeholder: 'TextArea',
    rows: 2,
    theme: TextareaLightTheme,
  },
  argTypes: {
    theme: {
      control: 'select',
      options: Object.keys(themeMap),
      mapping: themeMap,
    },
  },
  render: (props) => {
    const [text, setText] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);

      if (props?.onChange) {
        props.onChange(e);
      }
    };

    return <TextArea {...props} value={text} onChange={handleChange} />;
  },
} satisfies Meta<typeof TextArea>;

export default meta;

const baseContainerStyles: CSSProperties = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
  render: (props) => {
    return (
      <div style={baseContainerStyles}>
        <TextArea {...props} placeholder="Idle" />
        <TextArea
          {...props}
          isInvalid
          invalidDescription={i18n.t('Required field')}
          placeholder="isInvalid"
        />
        <TextArea {...props} isDisabled placeholder="isDisabled" />
      </div>
    );
  },
};

export const Autosize: Story = {
  args: {
    isAutosized: true,
    maxHeight: 500,
  },
};

export const TextareaLight: Story = {
  tags: ['!dev'],
  args: { theme: TextareaLightTheme },
};

export const TextareaDark: Story = {
  tags: ['!dev'],
  args: { theme: TextareaDarkTheme },
};
