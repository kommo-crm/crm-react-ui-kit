import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { CanvasCentered } from '@storybook-utils/constants';

import { Text, TextPrimaryTheme } from '@ui-kit/components/Text';

import { ScrollArea, ScrollAreaSurfaceTheme, ScrollAreaCompactTheme } from '..';

const themeMap = {
  ScrollAreaSurfaceTheme,
  ScrollAreaCompactTheme,
};

const PARAGRAPH =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam ducimus inventore minima optio error unde incidunt atque. Minima, maxime? Quo, voluptatibus. Rem ipsa placeat a laboriosam ipsum harum eligendi corrupti laudantium dicta.';

const LONG_TEXT = Array.from({ length: 6 }, () => PARAGRAPH).join(' ');

const AREA_STYLE = {
  width: 320,
  height: 240,
  background: 'var(--crm-ui-kit-palette-background-primary)',
  border: '1px solid var(--crm-ui-kit-palette-border-primary)',
  borderRadius: 'var(--crm-ui-kit-border-radius-default)',
};

const USAGE = `
import {
  ScrollArea,
  ScrollAreaSurfaceTheme,
} from '@kommo-crm/crm-react-ui-kit/ScrollArea';

function App() {
  return (
    <ScrollArea theme={ScrollAreaSurfaceTheme} style={{ height: 240 }}>
      <Text theme={TextPrimaryTheme} size="l">
        {text}
      </Text>
    </ScrollArea>
  );
}
`;

const meta = {
  title: 'Components/ScrollArea',
  parameters: {
    ...CanvasCentered,
    docs: {
      source: { code: USAGE, language: 'jsx' },
    },
  },
  component: ScrollArea,
  argTypes: {
    theme: {
      control: 'select',
      options: Object.keys(themeMap),
      mapping: themeMap,
    },
    type: {
      control: 'select',
      options: ['auto', 'scroll', 'hover', 'always'],
    },
    children: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  args: {
    theme: ScrollAreaSurfaceTheme,
    style: AREA_STYLE,
    children: (
      <Text
        theme={TextPrimaryTheme}
        size="l"
        style={{ display: 'block', padding: '12px 16px' }}
      >
        {LONG_TEXT}
      </Text>
    ),
  },
} satisfies Meta<typeof ScrollArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const TYPES = [
  { type: 'auto' },
  { type: 'scroll' },
  { type: 'hover' },
  { type: 'always', text: PARAGRAPH },
] as const;

export const Type: Story = {
  args: { theme: ScrollAreaSurfaceTheme },
  argTypes: {
    type: { table: { disable: true } },
  },
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, auto)',
        gap: 24,
      }}
    >
      {TYPES.map((item) => (
        <div
          key={item.type}
          style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
        >
          <Text theme={TextPrimaryTheme} size="l">
            {item.type}
          </Text>
          <ScrollArea {...args} type={item.type}>
            {'text' in item ? (
              <Text
                theme={TextPrimaryTheme}
                size="l"
                style={{ display: 'block', padding: '12px 16px' }}
              >
                {item.text}
              </Text>
            ) : (
              args.children
            )}
          </ScrollArea>
        </div>
      ))}
    </div>
  ),
};

export const IsFadeEnabled: Story = {
  name: 'isFadeEnabled',
  args: { theme: ScrollAreaCompactTheme, isFadeEnabled: true },
};

export const ScrollAreaSurface: Story = {
  tags: ['!dev'],
  args: { theme: ScrollAreaSurfaceTheme },
};

export const ScrollAreaCompact: Story = {
  tags: ['!dev'],
  args: { theme: ScrollAreaCompactTheme },
};
