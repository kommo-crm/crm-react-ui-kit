import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { CanvasCentered } from '@storybook-utils/constants';

import { Separator, SeparatorRoundedTheme, SeparatorSquareTheme } from '..';

const themeMap = {
  SeparatorRoundedTheme,
  SeparatorSquareTheme,
};

const USAGE = `
import {
  Separator,
  SeparatorRoundedTheme,
} from '@kommo-crm/crm-react-ui-kit/Separator';

function App() {
  return (
    <Separator
      theme={SeparatorRoundedTheme}
      orientation="horizontal"
    />
  );
}
`;

const HORIZONTAL_WRAPPER_STYLE: React.CSSProperties = {
  width: 240,
  display: 'flex',
};

const VERTICAL_WRAPPER_STYLE: React.CSSProperties = {
  height: 80,
  display: 'flex',
};

const meta = {
  title: 'Components/Separator',
  parameters: {
    ...CanvasCentered,
    docs: {
      source: { code: USAGE, language: 'jsx' },
    },
  },
  component: Separator,
  argTypes: {
    theme: {
      control: 'select',
      options: Object.keys(themeMap),
      mapping: themeMap,
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
  args: {
    theme: SeparatorRoundedTheme,
    orientation: 'horizontal',
  },
  render: (props) => (
    <div
      style={
        props.orientation === 'vertical'
          ? VERTICAL_WRAPPER_STYLE
          : HORIZONTAL_WRAPPER_STYLE
      }
    >
      <Separator {...props} />
    </div>
  ),
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
};

export const SeparatorRounded: Story = {
  tags: ['!dev'],
  args: { theme: SeparatorRoundedTheme },
};

export const SeparatorSquare: Story = {
  tags: ['!dev'],
  args: { theme: SeparatorSquareTheme },
};
