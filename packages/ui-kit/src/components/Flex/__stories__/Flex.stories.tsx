import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { CanvasCentered } from '@storybook-utils/constants';

import { SPACING_SCALE } from '@ui-kit/lib/spacing';

import { Flex } from '..';

const USAGE = `
import { Flex } from '@kommo-crm/crm-react-ui-kit/Flex';

function App() {
  return (
    <Flex gap="2">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </Flex>
  );
}
`;

const ITEMS_COUNT = 4;

const ITEM_STYLE: React.CSSProperties = {
  width: 60,
  height: 60,
  boxSizing: 'border-box',
  borderRadius: 'var(--crm-ui-kit-border-radius-default)',
  background: 'var(--crm-ui-kit-palette-active-element-900)',
  color: 'var(--crm-ui-kit-color-white)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const CONTAINER_MAX_WIDTH = 480;
const CONTAINER_MAX_HEIGHT = 240;

/**
 * A centered container grows to both sides from the center, so its resize
 * handle moves at half the cursor speed. The fixed frame stays centered
 * instead, and the container grows from its top left corner.
 */
const FRAME_STYLE: React.CSSProperties = {
  width: CONTAINER_MAX_WIDTH,
  height: CONTAINER_MAX_HEIGHT,
};

const CONTAINER_STYLE: React.CSSProperties = {
  width: 320,
  height: 160,
  minWidth: 60,
  minHeight: 60,
  maxWidth: CONTAINER_MAX_WIDTH,
  maxHeight: CONTAINER_MAX_HEIGHT,
  resize: 'both',
  overflow: 'auto',
  outline: '1px dashed var(--crm-ui-kit-palette-border-default)',
};

const Items = () => (
  <>
    {Array.from({ length: ITEMS_COUNT }, (_, index) => (
      <div key={index} style={ITEM_STYLE}>
        {index + 1}
      </div>
    ))}
  </>
);

const meta = {
  title: 'Layout/Flex',
  parameters: {
    ...CanvasCentered,
    docs: {
      source: { code: USAGE, language: 'jsx' },
    },
  },
  component: Flex,
  argTypes: {
    as: { control: false },
    asChild: { control: false },
    display: { control: 'select', options: ['flex', 'inline-flex', 'none'] },
    direction: {
      control: 'select',
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'baseline', 'stretch'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between'],
    },
    wrap: { control: 'select', options: ['nowrap', 'wrap', 'wrap-reverse'] },
    gap: { control: 'select', options: Object.keys(SPACING_SCALE) },
    gapX: { control: 'select', options: Object.keys(SPACING_SCALE) },
    gapY: { control: 'select', options: Object.keys(SPACING_SCALE) },
  },
  args: {
    gap: '2',
  },
  render: (props) => (
    <div style={FRAME_STYLE}>
      <Flex {...props} style={CONTAINER_STYLE}>
        <Items />
      </Flex>
    </div>
  ),
} satisfies Meta<typeof Flex>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
