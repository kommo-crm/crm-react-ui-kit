import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ContextMenuTriggerIcon from '@storybook-utils/icons/trigger.svg';
import ContextMenuTrashcanIcon from '@storybook-utils/icons/trashcan.svg';
import ContextMenuCheckIcon from '@storybook-utils/icons/check.svg';
import ContextMenuChevronRightIcon from '@storybook-utils/icons/chevronRight.svg';

import { ContextMenu } from 'src/components/ContextMenu';
import {
  Text,
  TextPrimaryTheme,
  TextSecondaryDarkTheme,
  type TextTheme,
} from 'src/components/Text';

import { CanvasCentered } from '@storybook-utils/constants';

import { i18n } from '@i18n';

import { Button, ButtonNeutralTheme } from 'src/components/Button';

import { ContextMenuMode } from '../ContextMenu.enums';
import { ContentProps } from '../components/Content/Content.props';

import { ContextMenuModeType } from '../ContextMenu.types';

const TextContextMenuTheme: TextTheme = {
  ...TextPrimaryTheme,
  '--crm-ui-kit-text-color': 'inherit',
};

const USAGE = `
import { useState } from "react";

import { ContextMenu } from 'src/components/ContextMenu';
import {
  Text,
  TextPrimaryTheme,
  TextSecondaryDarkTheme,
  type TextTheme,
} from 'src/components/Text';

import ContextMenuTriggerIcon from 'public/icons/trigger.svg';
import ContextMenuTrashcanIcon from 'public/icons/trashcan.svg';
import ContextMenuCheckIcon from 'public/icons/check.svg';
import ContextMenuChevronRightIcon from '@storybook-utils/icons/chevronRight.svg';

import s from './ContextMenu.module.css';

const TextContextMenuTheme: TextTheme = {
  ...TextPrimaryTheme,
  '--crm-ui-kit-text-color': 'inherit',
};

function App() {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [theme, setTheme] = useState("light");

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsNotificationsEnabled(e.target.checked);
    onCheckboxChange?.(e.target.checked);
  };

  const handleRadioChange = (themeValue: string) => {
    setTheme(themeValue);
    onRadioChange?.(themeValue);
  };

  return (
    <ContextMenu.Root mode="click">
      <ContextMenu.Trigger
        style={{
          display: 'flex',
          padding: '10px 16px',
          margin: 0,
          color: 'var(--crm-ui-kit-palette-text-secondary-dark)',
          background: 'none',
          outline: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <ContextMenuTriggerIcon />
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Content
          direction="down-right"
          sideOffset={5}
          disableRepositioning
          style={{
            maxWidth: '300px',
          }}
        >
          <ContextMenu.Label>
            <Text theme={TextSecondaryDarkTheme} size="l" isEllipsis>
              ${i18n.t('Profile')}
            </Text>
          </ContextMenu.Label>

          <ContextMenu.Separator />

          <ContextMenu.Item isSelectable={false}>
            <Text theme={TextContextMenuTheme} size="l" isEllipsis>
              ${i18n.t('User ID')}: 123456
            </Text>
          </ContextMenu.Item>

          <ContextMenu.Item style={{ maxHeight: '20px' }}>
            <Text theme={TextContextMenuTheme} size="l" isEllipsis>
              ${i18n.t('Settings')}
            </Text>

            <ContextMenu.ItemRightSlot>
              <ContextMenu.experimental_SubRoot mode="click">
                <ContextMenu.experimental_SubRoot.Trigger
                  style={{
                    display: 'flex',
                    padding: '10px 16px',
                    margin: 0,
                    color: 'var(--crm-ui-kit-palette-text-secondary-dark)',
                    background: 'none',
                    outline: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    marginRight: '-16px',
                  }}
                >
                  <ContextMenuTriggerIcon />
                </ContextMenu.experimental_SubRoot.Trigger>

                <ContextMenu.Portal>
                  <ContextMenu.experimental_SubRoot.Content
                    sideOffset={-5}
                    alignOffset={16}
                  >
                    <ContextMenu.CheckboxItem
                      isChecked={isNotificationsEnabled}
                      onChange={handleCheckboxChange}
                    >
                      <ContextMenu.ItemIndicator>
                        <ContextMenuCheckIcon />
                      </ContextMenu.ItemIndicator>

                      <Text theme={TextContextMenuTheme} size="l" isEllipsis>
                        Enable notifications
                      </Text>
                    </ContextMenu.CheckboxItem>

                    <ContextMenu.Separator />

                    <ContextMenu.Label>
                      {isNotificationsEnabled && <ContextMenu.ItemIcon />}

                      <Text theme={TextSecondaryDarkTheme} size="l" isEllipsis>
                        ${i18n.t('Theme')}
                      </Text>
                    </ContextMenu.Label>

                    <ContextMenu.RadioGroup
                      value={theme}
                      onChange={handleRadioChange}
                    >
                      <ContextMenu.RadioItem value="light">
                        {isNotificationsEnabled && <ContextMenu.ItemIcon />}

                        <Text theme={TextContextMenuTheme} size="l" isEllipsis>
                          ${i18n.t('Light')}
                        </Text>
                      </ContextMenu.RadioItem>

                      <ContextMenu.RadioItem value="dark">
                        {isNotificationsEnabled && <ContextMenu.ItemIcon />}

                        <Text theme={TextContextMenuTheme} size="l" isEllipsis>
                          ${i18n.t('Dark')}
                        </Text>
                      </ContextMenu.RadioItem>
                    </ContextMenu.RadioGroup>
                  </ContextMenu.experimental_SubRoot.Content>
                </ContextMenu.Portal>
              </ContextMenu.experimental_SubRoot>
            </ContextMenu.ItemRightSlot>
          </ContextMenu.Item>

          <ContextMenu.Sub mode="hover">
            <ContextMenu.SubTrigger>
              <Text theme={TextContextMenuTheme} size="l" isEllipsis>
                ${i18n.t('Lead')}
              </Text>

              <ContextMenu.ItemRightSlot>
                <ContextMenuChevronRightIcon />
              </ContextMenu.ItemRightSlot>
            </ContextMenu.SubTrigger>

            <ContextMenu.Portal>
              <ContextMenu.SubContent alignOffset={-2}>
                <ContextMenu.Item>
                  <ContextMenu.ItemIcon />

                  <Text theme={TextContextMenuTheme} size="l" isEllipsis>
                    ${i18n.t('Edit')}
                  </Text>
                </ContextMenu.Item>

                <ContextMenu.Item isDisabled>
                  <ContextMenu.ItemIcon />

                  <Text theme={TextContextMenuTheme} size="l" isEllipsis>
                    ${i18n.t('Export to PDF')}
                  </Text>
                </ContextMenu.Item>

                <ContextMenu.Item isDanger>
                  <ContextMenu.ItemIcon>
                    <ContextMenuTrashcanIcon />
                  </ContextMenu.ItemIcon>

                  <Text theme={TextContextMenuTheme} size="l" isEllipsis>
                    ${i18n.t('Delete')}
                  </Text>
                </ContextMenu.Item>
              </ContextMenu.SubContent>
            </ContextMenu.Portal>
          </ContextMenu.Sub>

          <ContextMenu.Arrow />
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}
`;

interface StoryComponentProps {
  mode: ContextMenuModeType;
  subMode?: ContextMenuModeType;
  subMenuMode?: ContextMenuModeType;
  direction?: ContentProps['direction'];
  onCheckboxChange?: (checked: boolean) => void;
  onRadioChange?: (value: string) => void;
  button?: React.ReactNode;
  isTriggerAsChild?: boolean;
  isOpen?: boolean;
}

const StoryComponent = (props: StoryComponentProps) => {
  const {
    mode,
    subMode = mode,
    subMenuMode = mode,
    direction,
    onCheckboxChange,
    onRadioChange,
    button = <ContextMenuTriggerIcon />,
    isTriggerAsChild = false,
    isOpen,
  } = props;

  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [theme, setTheme] = useState('light');

  /**
   * Required for the correct position calculation.
   */
  const collisionBoundary = document.querySelector(
    '.docs-story'
  ) as HTMLElement;

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsNotificationsEnabled(e.target.checked);
    onCheckboxChange?.(e.target.checked);
  };

  const handleRadioChange = (themeValue: string) => {
    setTheme(themeValue);
    onRadioChange?.(themeValue);
  };

  return (
    <ContextMenu.Root mode={mode} isOpen={isOpen}>
      <ContextMenu.Trigger
        style={
          isTriggerAsChild
            ? {}
            : {
                display: 'flex',
                padding: '10px 16px',
                margin: 0,
                color: 'var(--crm-ui-kit-palette-text-secondary-dark)',
                background: 'none',
                outline: 'none',
                border: 'none',
                cursor: 'pointer',
              }
        }
        asChild={isTriggerAsChild}
      >
        {button}
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Content
          collisionBoundary={collisionBoundary}
          direction={direction}
          sideOffset={5}
          disableRepositioning
          style={{
            maxWidth: '300px',
          }}
        >
          <ContextMenu.Label>
            <Text theme={TextSecondaryDarkTheme} size="l" isEllipsis>
              {i18n.t('Profile')}
            </Text>
          </ContextMenu.Label>

          <ContextMenu.Separator />

          <ContextMenu.Item isSelectable={false}>
            <Text theme={TextContextMenuTheme} size="l" isEllipsis>
              <b>{i18n.t('User ID')}:</b> 123456
            </Text>
          </ContextMenu.Item>

          <ContextMenu.Item style={{ maxHeight: '20px' }}>
            <Text theme={TextContextMenuTheme} size="l" isEllipsis>
              {i18n.t('Lead')}
            </Text>

            <ContextMenu.ItemRightSlot>
              <ContextMenu.experimental_SubRoot mode={subMenuMode}>
                <ContextMenu.experimental_SubRoot.Trigger
                  style={{
                    display: 'flex',
                    padding: '10px 16px',
                    margin: 0,
                    color: 'var(--crm-ui-kit-palette-text-secondary-dark)',
                    background: 'none',
                    outline: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    marginRight: '-16px',
                  }}
                >
                  <ContextMenuTriggerIcon />
                </ContextMenu.experimental_SubRoot.Trigger>

                <ContextMenu.Portal>
                  <ContextMenu.experimental_SubRoot.Content
                    sideOffset={-5}
                    alignOffset={16}
                  >
                    <ContextMenu.Item>
                      <ContextMenu.ItemIcon />

                      <Text theme={TextContextMenuTheme} size="l" isEllipsis>
                        {i18n.t('Edit')}
                      </Text>
                    </ContextMenu.Item>

                    <ContextMenu.Item isDisabled>
                      <ContextMenu.ItemIcon />

                      <Text theme={TextContextMenuTheme} size="l" isEllipsis>
                        {i18n.t('Export to PDF')}
                      </Text>
                    </ContextMenu.Item>

                    <ContextMenu.Item isDanger>
                      <ContextMenu.ItemIcon>
                        <ContextMenuTrashcanIcon />
                      </ContextMenu.ItemIcon>

                      <Text theme={TextContextMenuTheme} size="l" isEllipsis>
                        {i18n.t('Delete')}
                      </Text>
                    </ContextMenu.Item>
                  </ContextMenu.experimental_SubRoot.Content>
                </ContextMenu.Portal>
              </ContextMenu.experimental_SubRoot>
            </ContextMenu.ItemRightSlot>
          </ContextMenu.Item>

          <ContextMenu.Sub mode={subMode}>
            <ContextMenu.SubTrigger>
              <Text theme={TextContextMenuTheme} size="l" isEllipsis>
                {i18n.t('Settings')}
              </Text>

              <ContextMenu.ItemRightSlot>
                <ContextMenuChevronRightIcon />
              </ContextMenu.ItemRightSlot>
            </ContextMenu.SubTrigger>

            <ContextMenu.Portal>
              <ContextMenu.SubContent alignOffset={-2}>
                <ContextMenu.CheckboxItem
                  isChecked={isNotificationsEnabled}
                  onChange={handleCheckboxChange}
                >
                  <ContextMenu.ItemIndicator>
                    <ContextMenuCheckIcon />
                  </ContextMenu.ItemIndicator>

                  <Text theme={TextContextMenuTheme} size="l" isEllipsis>
                    {i18n.t('Enable notifications')}
                  </Text>
                </ContextMenu.CheckboxItem>

                <ContextMenu.Separator />

                <ContextMenu.Label>
                  {isNotificationsEnabled && <ContextMenu.ItemIcon />}

                  <Text theme={TextSecondaryDarkTheme} size="l" isEllipsis>
                    {i18n.t('Theme')}
                  </Text>
                </ContextMenu.Label>

                <ContextMenu.RadioGroup
                  value={theme}
                  onChange={handleRadioChange}
                >
                  <ContextMenu.RadioItem value="light">
                    {isNotificationsEnabled && <ContextMenu.ItemIcon />}

                    <Text theme={TextContextMenuTheme} size="l" isEllipsis>
                      {i18n.t('Light')}
                    </Text>
                  </ContextMenu.RadioItem>

                  <ContextMenu.RadioItem value="dark">
                    {isNotificationsEnabled && <ContextMenu.ItemIcon />}

                    <Text theme={TextContextMenuTheme} size="l" isEllipsis>
                      {i18n.t('Dark')}
                    </Text>
                  </ContextMenu.RadioItem>
                </ContextMenu.RadioGroup>
              </ContextMenu.SubContent>
            </ContextMenu.Portal>
          </ContextMenu.Sub>

          <ContextMenu.Arrow />
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};

const meta: Meta<typeof StoryComponent> = {
  title: 'Components/ContextMenu',
  component: StoryComponent,
  parameters: {
    ...CanvasCentered,
    docs: {
      source: {
        code: USAGE,
        language: 'jsx',
      },
    },
    layout: 'fullscreen',
  },
  args: {
    mode: ContextMenuMode.CLICK,
    subMode: ContextMenuMode.HOVER,
    subMenuMode: ContextMenuMode.CLICK,
    direction: 'down-right',
    onCheckboxChange: action('onCheckboxChange'),
    onRadioChange: action('onRadioChange'),
  },
  argTypes: {
    mode: {
      control: 'radio',
      options: [ContextMenuMode.CLICK, ContextMenuMode.HOVER],
    },
    subMode: {
      control: 'radio',
      options: [ContextMenuMode.CLICK, ContextMenuMode.HOVER],
    },
    subMenuMode: {
      control: 'radio',
      options: [ContextMenuMode.CLICK, ContextMenuMode.HOVER],
    },
    direction: {
      control: 'select',
      options: [
        'down-right',
        'down-left',
        'up-right',
        'up-left',
        'right-up',
        'right-down',
        'left-up',
        'left-down',
      ] satisfies ContentProps['direction'][],
    },
  },
  render: (args) => {
    const { direction } = args;
    let alignItems: 'flex-start' | 'center' | 'flex-end' = 'center';

    if (direction?.startsWith('down') || direction?.endsWith('down')) {
      alignItems = 'flex-start';
    } else if (direction?.startsWith('up') || direction?.endsWith('up')) {
      alignItems = 'flex-end';
    }

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems,
          minHeight: '340px',
          height: '100%',
          padding: '20px',
          marginTop: direction?.endsWith('down') ? '60px' : undefined,
        }}
        id="context-menu-story"
      >
        <StoryComponent {...args} />
      </div>
    );
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Modes: Story = {
  argTypes: {
    mode: { control: false },
    subMode: { control: false },
    subMenuMode: { control: false },
    direction: {
      control: 'select',
      options: [
        'down-right',
        'down-left',
        'up-right',
        'up-left',
        'right-up',
        'right-down',
        'left-up',
        'left-down',
      ] satisfies ContentProps['direction'][],
    },
  },
  render: (args) => {
    const { direction } = args;
    let alignItems: 'flex-start' | 'center' | 'flex-end' = 'center';

    if (direction?.startsWith('down') || direction?.endsWith('down')) {
      alignItems = 'flex-start';
    } else if (direction?.startsWith('up') || direction?.endsWith('up')) {
      alignItems = 'flex-end';
    }

    return (
      <div
        style={{
          display: 'flex',
          alignItems,
          minHeight: '340px',
          height: '100%',
          padding: '20px',
          gap: '40px',
        }}
        id="context-menu-story"
      >
        <StoryComponent
          {...args}
          mode={ContextMenuMode.CLICK}
          subMode={ContextMenuMode.CLICK}
          subMenuMode={ContextMenuMode.CLICK}
          button={
            <Button theme={ButtonNeutralTheme}>{i18n.t('Click me')}</Button>
          }
          isTriggerAsChild
        />

        <StoryComponent
          {...args}
          mode={ContextMenuMode.HOVER}
          subMode={ContextMenuMode.HOVER}
          subMenuMode={ContextMenuMode.HOVER}
          button={
            <Button theme={ButtonNeutralTheme}>{i18n.t('Hover me')}</Button>
          }
          isTriggerAsChild
        />
      </div>
    );
  },
};

export const Directions: Story = {
  argTypes: {
    mode: {
      control: 'radio',
      options: [ContextMenuMode.CLICK, ContextMenuMode.HOVER],
    },
    subMode: {
      control: 'radio',
      options: [ContextMenuMode.CLICK, ContextMenuMode.HOVER],
    },
    subMenuMode: {
      control: 'radio',
      options: [ContextMenuMode.CLICK, ContextMenuMode.HOVER],
    },
    direction: { control: false },
  },
  render: (args) => {
    const cornerDirections: ContentProps['direction'][] = [
      'down-right',
      'down-left',
      'up-right',
      'up-left',
    ];

    const centralDirections: ContentProps['direction'][] = [
      'left-down',
      'right-down',
      'left-up',
      'right-up',
    ];

    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: '0',
          padding: '20px',
          boxSizing: 'border-box',
        }}
        id="context-menu-story"
      >
        {cornerDirections.map((dir) => (
          <div
            key={dir}
            style={{
              display: 'flex',
              justifyContent: dir?.includes('right') ? 'start' : 'end',
              alignItems: dir?.includes('up') ? 'end' : 'start',
            }}
          >
            <StoryComponent
              {...args}
              direction={dir}
              button={
                <Button theme={ButtonNeutralTheme} style={{ width: '100px' }}>
                  {dir}
                </Button>
              }
              isTriggerAsChild
            />
          </div>
        ))}

        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gap: '16px',
            zIndex: 100,
          }}
        >
          {centralDirections.map((dir) => (
            <div
              key={dir}
              style={{
                display: 'flex',
                justifyContent: dir?.includes('right') ? 'start' : 'end',
                alignItems: dir?.includes('up') ? 'end' : 'start',
              }}
            >
              <StoryComponent
                {...args}
                direction={dir}
                button={
                  <Button theme={ButtonNeutralTheme} style={{ width: '100px' }}>
                    {dir}
                  </Button>
                }
                isTriggerAsChild
              />
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const VerticalMenu: Story = {
  argTypes: {
    mode: {
      control: 'radio',
      options: [ContextMenuMode.CLICK, ContextMenuMode.HOVER],
    },
    subMode: {
      control: 'radio',
      options: [ContextMenuMode.CLICK, ContextMenuMode.HOVER],
    },
    subMenuMode: {
      control: 'radio',
      options: [ContextMenuMode.CLICK, ContextMenuMode.HOVER],
    },
    direction: {
      control: 'select',
      options: [
        'right-down',
        'right-up',
        'left-down',
        'left-up',
      ] satisfies ContentProps['direction'][],
    },
  },
  args: {
    mode: ContextMenuMode.HOVER,
    direction: 'right-down',
  },
  render: (args) => {
    const { direction } = args;

    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '20px',
          boxSizing: 'border-box',
          alignItems: 'center',
        }}
        id="context-menu-story"
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <StoryComponent
            key={index}
            {...args}
            direction={direction}
            button={
              <Button
                theme={ButtonNeutralTheme}
                style={{ width: '100px', marginLeft: '0px' }}
              >
                {index + 1}
              </Button>
            }
            isTriggerAsChild
          />
        ))}
      </div>
    );
  },
};
