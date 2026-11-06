import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs, useEffect, useRef } from '@storybook/preview-api';

import { CanvasCentered } from '@storybook-utils/constants';

import { Text, TextPrimaryTheme } from '@ui-kit/components/Text';

import {
  Skeleton,
  SkeletonCirclePrimaryTheme,
  SkeletonPrimaryTheme,
  type SkeletonProps,
} from '..';

const themeMap = {
  SkeletonPrimaryTheme,
  SkeletonCirclePrimaryTheme,
};

const USAGE = `
import {
  Skeleton,
  SkeletonPrimaryTheme,
} from '@kommo-crm/crm-react-ui-kit/Skeleton';

function App() {
  return <Skeleton theme={SkeletonPrimaryTheme} width="120px" height="16px" />;
}
`;

const CONTAINER_STYLE: React.CSSProperties = {
  width: 240,
};

const meta = {
  title: 'Components/Skeleton',
  parameters: {
    ...CanvasCentered,
    docs: {
      source: { code: USAGE, language: 'jsx' },
    },
  },
  component: Skeleton,
  argTypes: {
    as: { control: 'inline-radio', options: ['div', 'span'] },
    theme: {
      control: 'select',
      options: Object.keys(themeMap),
      mapping: themeMap,
    },
    width: { control: 'text' },
    minWidth: { control: 'text' },
    maxWidth: { control: 'text' },
    height: { control: 'text' },
    minHeight: { control: 'text' },
    maxHeight: { control: 'text' },
    children: { control: false },
  },
  args: {
    theme: SkeletonPrimaryTheme,
    isLoading: true,
    width: '120px',
    height: '16px',
  },
  render: (props) => {
    const [, updateArgs] = useArgs();

    const previousSize = useRef({ width: props.width, height: props.height });

    const isCircle = props.theme === SkeletonCirclePrimaryTheme;

    useEffect(() => {
      const { width, height } = props;

      if (isCircle && width !== height) {
        const isHeightChanged = height !== previousSize.current.height;

        updateArgs(isHeightChanged ? { width: height } : { height: width });
      }

      previousSize.current = { width, height };
    }, [isCircle, props.width, props.height]);

    return <Skeleton {...props} />;
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

type ElementStory = StoryObj<
  Extract<SkeletonProps, { as?: 'div' }> & { text: string }
>;

export const WithElement: ElementStory = {
  argTypes: {
    text: { control: 'text' },
  },
  args: {
    width: undefined,
    height: undefined,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
  render: ({ text, ...props }) => {
    return (
      <div style={CONTAINER_STYLE}>
        <Skeleton {...props}>
          <Text size="m" theme={TextPrimaryTheme}>
            {text}
          </Text>
        </Skeleton>
      </div>
    );
  },
};

export const SkeletonPrimary: Story = {
  tags: ['!dev'],
  args: { theme: SkeletonPrimaryTheme },
};

export const SkeletonCirclePrimary: Story = {
  tags: ['!dev'],
  args: { theme: SkeletonCirclePrimaryTheme, width: '40px', height: '40px' },
};
