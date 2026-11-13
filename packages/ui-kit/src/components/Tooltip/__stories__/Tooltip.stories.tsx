import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { CanvasCentered } from '@storybook-utils/constants';

import { i18n } from '@i18n';

import { Button, ButtonNeutralTheme } from '@ui-kit/components/Button';
import { Link, LinkPrimaryTheme } from '@ui-kit/components/Link';

import { Tooltip, TooltipPrimaryTheme } from '..';

const themeMap = {
  TooltipPrimaryTheme,
};

const USAGE = `
import { Tooltip, TooltipPrimaryTheme } from '@kommo-crm/crm-react-ui-kit/Tooltip';
import { Button, ButtonNeutralTheme } from '@kommo-crm/crm-react-ui-kit/Button';
import { Link, LinkPrimaryTheme } from '@kommo-crm/crm-react-ui-kit/Link';

function App() {
  return (
    <Tooltip.Root theme={TooltipPrimaryTheme}>
      <Tooltip.Trigger asChild>
        <Button theme={ButtonNeutralTheme}>${i18n.t('Hover me')}</Button>
      </Tooltip.Trigger>

      <Tooltip.Portal>
        <Tooltip.Content>
          ${i18n.t('Plain text')}{' '}
          <Link theme={LinkPrimaryTheme} href="#">
            ${i18n.t('Go to Dashboard')}
          </Link>
          <Tooltip.Arrow />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
`;

const LONG_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

type DemoProps = {
  /** Text of the trigger button. */
  label?: React.ReactNode;
  /** Tooltip content. */
  content?: React.ReactNode;
  /** Called when the trigger is activated. */
  onTriggerClick?: () => void;
} & Omit<React.ComponentProps<typeof Tooltip.Root>, 'children'>;

const Demo = ({
  label = i18n.t('Hover me'),
  content = i18n.t('Plain text'),
  onTriggerClick,
  ...rootProps
}: DemoProps) => (
  <Tooltip.Root {...rootProps}>
    <Tooltip.Trigger asChild>
      <Button theme={ButtonNeutralTheme} onClick={onTriggerClick}>
        {label}
      </Button>
    </Tooltip.Trigger>

    <Tooltip.Portal>
      <Tooltip.Content>
        {content}
        <Tooltip.Arrow />
      </Tooltip.Content>
    </Tooltip.Portal>
  </Tooltip.Root>
);

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
    {children}
  </div>
);

const meta = {
  title: 'Components/Tooltip',
  parameters: {
    ...CanvasCentered,
    docs: {
      source: { code: USAGE, language: 'jsx' },
    },
  },
  component: Tooltip.Root,
  argTypes: {
    theme: {
      control: 'select',
      options: Object.keys(themeMap),
      mapping: themeMap,
    },
    onTriggerClick: { table: { disable: true } },
  },
  args: {
    theme: TooltipPrimaryTheme,
    onOpenChange: action('onOpenChange'),
    onTriggerClick: action('onTriggerClick'),
  },
  render: (props) => <Demo {...props} />,
} satisfies Meta<typeof Demo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => (
    <Demo
      {...props}
      content={
        <>
          {i18n.t('Plain text')}{' '}
          <Link theme={LinkPrimaryTheme} href="#">
            {i18n.t('Go to Dashboard')}
          </Link>
        </>
      }
    />
  ),
};

const TRIGGER_STYLES: React.CSSProperties[] = [
  { top: 0, left: 0 },
  { top: 0, right: 0 },
  { bottom: 0, left: 0 },
  { bottom: 0, right: 0 },
  { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
];

export const Collision: Story = {
  parameters: { layout: 'fullscreen' },
  render: (props) => (
    <>
      {TRIGGER_STYLES.map((style, index) => (
        <div key={index} style={{ position: 'fixed', ...style }}>
          <Demo {...props} />
        </div>
      ))}
    </>
  ),
};

export const LongContent: Story = {
  args: { isDefaultOpen: true },
  render: (props) => <Demo {...props} content={LONG_TEXT} />,
};

export const Controlled: Story = {
  render: (props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Row>
        <Button
          theme={ButtonNeutralTheme}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {i18n.t('Click me')}
        </Button>

        <Demo {...props} isOpen={isOpen} />
      </Row>
    );
  },
};

export const Disabled: Story = {
  args: { isDisabled: true },
};

export const TooltipPrimary: Story = {
  tags: ['!dev'],
  args: { theme: TooltipPrimaryTheme },
};
