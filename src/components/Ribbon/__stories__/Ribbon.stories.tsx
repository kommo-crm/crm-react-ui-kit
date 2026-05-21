import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';

import { CanvasCentered } from '@storybook-utils/constants';

import {
  ContentBlock,
  ContentBlockPrimaryTheme,
} from 'src/components/ContentBlock';

import { Text, TextPrimaryTheme } from 'src/components/Text';

import { Ribbon } from '..';
import { RibbonPrimaryTheme } from '../Ribbon.themes';

const themeMap = {
  RibbonPrimaryTheme,
};

const USAGE = `
import { Ribbon, RibbonPrimaryTheme } from '@kommo-crm/crm-react-ui-kit/Ribbon';
import { ContentBlock, ContentBlockPrimaryTheme } from '@kommo-crm/crm-react-ui-kit/ContentBlock';
import { Text, TextPrimaryTheme } from '@kommo-crm/crm-react-ui-kit/Text';

function App() {
  return (
    <div style={{ display: 'flex', columnGap: '16px' }}>
      <ContentBlock
        style={{
          position: 'relative',
          width: '300px',
        }}
        theme={ContentBlockPrimaryTheme}
      >
        <Ribbon text="Pro" theme={RibbonPrimaryTheme} />

        <Text theme={TextPrimaryTheme} size="m">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
          consequuntur nam non vero voluptate reiciendis aliquid magnam aut
          laudantium aspernatur.
        </Text>
      </ContentBlock>

      <Ribbon text="Pro" theme={RibbonPrimaryTheme}>
          <ContentBlock
            style={{
              width: '300px',
            }}
            theme={ContentBlockPrimaryTheme}
          >
            <Text theme={TextPrimaryTheme} size="m">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
              consequuntur nam non vero voluptate reiciendis aliquid magnam aut
              laudantium aspernatur.
            </Text>
          </ContentBlock>
      </Ribbon>
    </div>
  );
}
`;

const sampleContentBlockContent = (
  <Text theme={TextPrimaryTheme} size="m">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere consequuntur
    nam non vero voluptate reiciendis aliquid magnam aut laudantium aspernatur.
  </Text>
);

const meta = {
  title: 'Components/Ribbon',
  parameters: {
    ...CanvasCentered,
    docs: {
      source: {
        code: USAGE,
        language: 'jsx',
      },
    },
  },
  component: Ribbon,
  argTypes: {
    children: {
      control: false,
    },
    offset: {
      control: { type: 'range', min: 0, max: 200, step: 1 },
      table: {
        defaultValue: { summary: '86' },
      },
    },
    theme: {
      control: { type: 'select' },
      mapping: themeMap,
      options: Object.keys(themeMap),
      table: {
        type: { summary: 'select' },
      },
    },
  },
  render: (props) => {
    return (
      <div style={{ display: 'flex', columnGap: '16px' }}>
        <ContentBlock
          style={{
            position: 'relative',
            width: '300px',
          }}
          theme={ContentBlockPrimaryTheme}
        >
          <Ribbon {...props} />

          {sampleContentBlockContent}
        </ContentBlock>

        <Ribbon {...props}>
          <ContentBlock
            style={{
              width: '300px',
            }}
            theme={ContentBlockPrimaryTheme}
          >
            {sampleContentBlockContent}
          </ContentBlock>
        </Ribbon>
      </div>
    );
  },
  args: {
    text: 'Pro',
    theme: RibbonPrimaryTheme,
    offset: 86,
  },
} satisfies Meta<typeof Ribbon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
