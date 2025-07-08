import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { i18n } from '@i18n';

import { CanvasCentered } from '@storybook-utils/constants';

import { Button, ButtonNeutralTheme } from 'src/components/Button';
import { Text, TextPrimaryTheme } from 'src/components/Text';

import { Tooltip, TooltipPrimaryTheme } from '..';
import { PopupPrimaryTheme } from '../components/Arrow';

const USAGE = `
import { Tooltip, TooltipPrimaryTheme } from '@packages/crm-react-ui-kit/Tooltip';

function App() {
  return (
    <Tooltip theme={TooltipPrimaryTheme}>
      ${i18n.t('Hover me!')}
    </Tooltip>
  );
}
`;

const meta = {
  title: 'Components/Tooltip',
  parameters: {
    ...CanvasCentered,
    docs: {
      source: {
        code: USAGE,
        language: 'jsx',
      },
    },
  },
  component: Tooltip,
  args: {
    theme: TooltipPrimaryTheme,
    href: '#',
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        margin: '200px 0',
        alignItems: 'end',
        // gap: '30px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          height: '10px',
          width: '10px',
          backgroundColor: 'red',
        }}
        id="lool"
      ></div>

      <Tooltip
        boundaryElement={
          document.querySelector('.innerZoomElementWrapper') as HTMLElement
        }
        isHoverable={true}
      >
        <Tooltip.Content>
          <Tooltip.Arrow theme={PopupPrimaryTheme}>
            <Text theme={TextPrimaryTheme} size="m">
              LOOOOOOOOOOOOOOOOOOOOOL
            </Text>
          </Tooltip.Arrow>

          <Tooltip.Trigger>
            {/* <Button theme={ButtonNeutralTheme}>{i18n.t('Hover me!')}</Button> */}
            TEXT
          </Tooltip.Trigger>
        </Tooltip.Content>
      </Tooltip>
    </div>
  ),
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
