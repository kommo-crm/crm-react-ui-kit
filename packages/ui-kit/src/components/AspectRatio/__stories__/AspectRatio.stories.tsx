import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { CanvasCentered } from '@storybook-utils/constants';
import redImage from '@storybook-utils/img/red.png';

import { AspectRatio } from '..';

const USAGE = `
import { AspectRatio } from '@kommo-crm/crm-react-ui-kit/AspectRatio';

function App() {
  return (
    <div style={{ width: 320 }}>
      <AspectRatio ratio={16 / 9}>
        <img src="..." alt="..." style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </AspectRatio>
    </div>
  );
}
`;

const CONTAINER_STYLE: React.CSSProperties = {
  width: 320,
};

const IMAGE_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

const RATIO_OPTIONS = [1, 4 / 3, 16 / 9, 9 / 16];

const RATIO_LABELS: Record<number, string> = {
  [1]: '1:1',
  [4 / 3]: '4:3',
  [16 / 9]: '16:9',
  [9 / 16]: '9:16',
};

const meta = {
  title: 'Components/AspectRatio',
  parameters: {
    ...CanvasCentered,
    docs: {
      source: { code: USAGE, language: 'jsx' },
    },
  },
  component: AspectRatio,
  argTypes: {
    ratio: {
      options: RATIO_OPTIONS,
      control: { type: 'select', labels: RATIO_LABELS },
    },
    asChild: { control: false },
    children: { control: false },
  },
  args: {
    ratio: 16 / 9,
    children: <img src={redImage} alt="Red" style={IMAGE_STYLE} />,
  },
  render: (props) => {
    return (
      <div style={CONTAINER_STYLE}>
        <AspectRatio {...props} />
      </div>
    );
  },
} satisfies Meta<typeof AspectRatio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
