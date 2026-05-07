import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { CanvasCentered } from '@storybook-utils/constants';

import {
  Separator,
  SeparatorRoundedLightTheme,
  SeparatorSquaredLightTheme,
  SeparatorRoundedDarkTheme,
  SeparatorSquaredDarkTheme,
} from '..';

const themeMap = {
  SeparatorRoundedLightTheme,
  SeparatorSquaredLightTheme,
  SeparatorRoundedDarkTheme,
  SeparatorSquaredDarkTheme,
};

const USAGE = `
import {
  Separator,
  SeparatorRoundedTheme,
} from '@kommo-crm/crm-react-ui-kit/Separator';

function App() {
  return (
    <Separator
      theme={SeparatorRoundedLightTheme}
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
    theme: SeparatorRoundedLightTheme,
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
  args: { theme: SeparatorRoundedLightTheme },
};

export const SeparatorSquare: Story = {
  tags: ['!dev'],
  args: { theme: SeparatorSquaredLightTheme },
};

export const SeparatorLight: Story = {
  tags: ['!dev'],
  args: { theme: SeparatorSquaredLightTheme },
};

export const SeparatorDark: Story = {
  tags: ['!dev'],
  args: { theme: SeparatorSquaredDarkTheme },
};
