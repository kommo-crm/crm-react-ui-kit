import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ChevronRightIcon from '@storybook-utils/icons/chevronRight.svg';
import ContextMenuTriggerIcon from '@storybook-utils/icons/trigger.svg';
import ContextMenuTrashcanIcon from '@storybook-utils/icons/trashcan.svg';
import ContextMenuCheckIcon from '@storybook-utils/icons/check.svg';

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

import { ContextMenuRootProps } from '../ContextMenu.props';

import { ContextMenuMode } from '../ContextMenu.enums';
import { ContentProps } from '../components/Content/Content.props';

import { ContextMenuModeType } from '../ContextMenu.types';

import s from './ContextMenu.module.css';

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
import ChevronRightIcon from '@storybook-utils/icons/chevronRight.svg';

const TextContextMenuTheme: TextTheme = {
  ...TextPrimaryTheme,
  '--crm-ui-kit-text-color': 'inherit',
};

function App() {
  const [autoupdateChecked, setAutoupdateChecked] = useState(true);
  const [theme, setTheme] = useState("light");

  const handleAutoupdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutoupdateChecked(e.target.checked);
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.value);
  };

  return (
    <ContextMenu.Root mode="click">
      <ContextMenu.Trigger
        className={isTriggerAsChild ? '' : s.trigger}
        asChild={isTriggerAsChild}
      >
        {button}
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Content
          collisionBoundary={
            document.querySelector('.docs-story') as HTMLElement
          }
          direction="down-right"
          sideOffset={5}
        >
          <ContextMenu.Label>
            <Text theme={TextSecondaryDarkTheme} size="l">
              ${i18n.t('Label')}
            </Text>
          </ContextMenu.Label>

          <ContextMenu.Item isNotSelectable>
            <Text theme={TextContextMenuTheme} size="l">
              <b>${i18n.t('Workspace')}:</b> Kommo
            </Text>
          </ContextMenu.Item>

          <ContextMenu.Item>
            <Text theme={TextContextMenuTheme} size="l">
              ${i18n.t('Workspace Settings')}
            </Text>

            <ContextMenu.ItemRightSlot>
              <ContextMenu.SubRoot mode="hover" isCloseWithRootMenu>
                <ContextMenu.SubRoot.Trigger className={s.subTrigger}>
                  <ContextMenuTriggerIcon />
                </ContextMenu.SubRoot.Trigger>

                <ContextMenu.Portal>
                  <ContextMenu.SubRoot.Content
                    sideOffset={-10}
                    alignOffset={16}
                  >
                    <ContextMenu.CheckboxItem
                      isChecked={autoupdateChecked}
                      onChange={handleAutoupdateChange}
                    >
                      <ContextMenu.ItemIndicator>
                        <ContextMenuCheckIcon />
                      </ContextMenu.ItemIndicator>

                      <Text theme={TextContextMenuTheme} size="l">
                        ${i18n.t('Autoupdate')}
                      </Text>
                    </ContextMenu.CheckboxItem>

                    <ContextMenu.Separator />

                    <ContextMenu.Label>
                      <Text theme={TextSecondaryDarkTheme} size="l">
                        ${i18n.t('Select Theme')}
                      </Text>
                    </ContextMenu.Label>

                    <ContextMenu.RadioGroup
                      value={theme}
                      onChange={handleThemeChange}
                    >
                      <ContextMenu.RadioItem value="light">
                        <Text theme={TextContextMenuTheme} size="l">
                          ${i18n.t('Light')}
                        </Text>
                      </ContextMenu.RadioItem>

                      <ContextMenu.RadioItem value="dark">
                        <Text theme={TextContextMenuTheme} size="l">
                          ${i18n.t('Dark')}
                        </Text>
                      </ContextMenu.RadioItem>
                    </ContextMenu.RadioGroup>
                  </ContextMenu.SubRoot.Content>
                </ContextMenu.Portal>
              </ContextMenu.SubRoot>
            </ContextMenu.ItemRightSlot>
          </ContextMenu.Item>

          <ContextMenu.Item>
            <Text theme={TextContextMenuTheme} size="l">
              ${i18n.t('Change Workspace')}
            </Text>
          </ContextMenu.Item>

          <ContextMenu.Separator />

          <ContextMenu.Sub>
            <ContextMenu.SubTrigger>
              <Text theme={TextContextMenuTheme} size="l">
                ${i18n.t('Contacts')}
              </Text>

              <ContextMenu.ItemRightSlot>
                <ChevronRightIcon />
              </ContextMenu.ItemRightSlot>
            </ContextMenu.SubTrigger>

            <ContextMenu.Portal>
              <ContextMenu.SubContent>
                <ContextMenu.Item>
                  <Text theme={TextContextMenuTheme} size="l">
                    ${i18n.t('Contact')} 1
                  </Text>
                </ContextMenu.Item>

                <ContextMenu.Item isDisabled>
                  <Text theme={TextContextMenuTheme} size="l">
                    ${i18n.t('Contact')} 2
                  </Text>
                </ContextMenu.Item>

                <ContextMenu.Item isDanger>
                  <ContextMenu.ItemIcon>
                    <ContextMenuTrashcanIcon />
                  </ContextMenu.ItemIcon>

                  <Text theme={TextContextMenuTheme} size="l">
                    ${i18n.t('Delete All')}
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

const StoryComponent = ({
  mode,
  subMenuMode = mode,
  direction,
  onCheckboxChange,
  onRadioChange,
  button = <ContextMenuTriggerIcon />,
  isTriggerAsChild = false,
}: ContextMenuRootProps & {
  subMenuMode?: ContextMenuModeType;
  direction?: ContentProps['direction'];
  onCheckboxChange?: (checked: boolean) => void;
  onRadioChange?: (value: string) => void;
  button?: React.ReactNode;
  isTriggerAsChild?: boolean;
}) => {
  const [autoupdateChecked, setAutoupdateChecked] = useState(true);
  const [theme, setTheme] = useState('light');

  return (
    <ContextMenu.Root mode={mode}>
      <ContextMenu.Trigger
        className={isTriggerAsChild ? '' : s.trigger}
        asChild={isTriggerAsChild}
      >
        {button}
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Content
          collisionBoundary={
            document.querySelector('.docs-story') as HTMLElement
          }
          direction={direction}
          sideOffset={5}
        >
          <ContextMenu.Label>
            <Text theme={TextSecondaryDarkTheme} size="l">
              {i18n.t('Label')}
            </Text>
          </ContextMenu.Label>

          <ContextMenu.Item isNotSelectable>
            <Text theme={TextContextMenuTheme} size="l">
              <b>{i18n.t('Workspace')}:</b> Kommo
            </Text>
          </ContextMenu.Item>

          <ContextMenu.Item>
            <Text theme={TextContextMenuTheme} size="l">
              {i18n.t('Workspace Settings')}
            </Text>

            <ContextMenu.ItemRightSlot>
              <ContextMenu.SubRoot mode={subMenuMode} isCloseWithRootMenu>
                <ContextMenu.SubRoot.Trigger className={s.subTrigger}>
                  <ContextMenuTriggerIcon />
                </ContextMenu.SubRoot.Trigger>

                <ContextMenu.Portal>
                  <ContextMenu.SubRoot.Content sideOffset={-5} alignOffset={16}>
                    <ContextMenu.CheckboxItem
                      isChecked={autoupdateChecked}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setAutoupdateChecked(e.target.checked);
                        onCheckboxChange?.(e.target.checked);
                      }}
                    >
                      <ContextMenu.ItemIndicator>
                        <ContextMenuCheckIcon />
                      </ContextMenu.ItemIndicator>

                      <Text theme={TextContextMenuTheme} size="l">
                        {i18n.t('Autoupdate')}
                      </Text>
                    </ContextMenu.CheckboxItem>

                    <ContextMenu.Separator />

                    <ContextMenu.Label>
                      <Text theme={TextSecondaryDarkTheme} size="l">
                        {i18n.t('Select Theme')}
                      </Text>
                    </ContextMenu.Label>

                    <ContextMenu.RadioGroup
                      value={theme}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setTheme(e.target.value);
                        onRadioChange?.(e.target.value);
                      }}
                    >
                      <ContextMenu.RadioItem value="light">
                        <Text theme={TextContextMenuTheme} size="l">
                          {i18n.t('Light')}
                        </Text>
                      </ContextMenu.RadioItem>

                      <ContextMenu.RadioItem value="dark">
                        <Text theme={TextContextMenuTheme} size="l">
                          {i18n.t('Dark')}
                        </Text>
                      </ContextMenu.RadioItem>
                    </ContextMenu.RadioGroup>
                  </ContextMenu.SubRoot.Content>
                </ContextMenu.Portal>
              </ContextMenu.SubRoot>
            </ContextMenu.ItemRightSlot>
          </ContextMenu.Item>

          <ContextMenu.Item>
            <Text theme={TextContextMenuTheme} size="l">
              {i18n.t('Change Workspace')}
            </Text>
          </ContextMenu.Item>

          <ContextMenu.Separator />

          <ContextMenu.Sub mode={subMenuMode}>
            <ContextMenu.SubTrigger>
              <Text theme={TextContextMenuTheme} size="l">
                {i18n.t('Contacts')}
              </Text>

              <ContextMenu.ItemRightSlot>
                <ChevronRightIcon />
              </ContextMenu.ItemRightSlot>
            </ContextMenu.SubTrigger>

            <ContextMenu.Portal>
              <ContextMenu.SubContent>
                <ContextMenu.Item>
                  <Text theme={TextContextMenuTheme} size="l">
                    {i18n.t('Contact')} 1
                  </Text>
                </ContextMenu.Item>

                <ContextMenu.Item isDisabled>
                  <Text theme={TextContextMenuTheme} size="l">
                    {i18n.t('Contact')} 2
                  </Text>
                </ContextMenu.Item>

                <ContextMenu.Item isDanger>
                  <ContextMenu.ItemIcon>
                    <ContextMenuTrashcanIcon />
                  </ContextMenu.ItemIcon>

                  <Text theme={TextContextMenuTheme} size="l">
                    {i18n.t('Delete All')}
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
    subMenuMode: ContextMenuMode.HOVER,
    direction: 'down-right',
    onCheckboxChange: action('onCheckboxChange'),
    onRadioChange: action('onRadioChange'),
  },
  argTypes: {
    mode: {
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
          minHeight: '320px',
          height: '100%',
          padding: '20px',
          marginTop: direction?.endsWith('down') ? '60px' : undefined,
        }}
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
  render: (args) => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'start',
          minHeight: '380px',
          height: '100%',
          padding: '20px',
          gap: '40px',
        }}
      >
        <StoryComponent
          {...args}
          mode={ContextMenuMode.CLICK}
          subMenuMode={ContextMenuMode.CLICK}
          button={
            <Button theme={ButtonNeutralTheme}>{i18n.t('Click me')}</Button>
          }
          isTriggerAsChild
        />
        <StoryComponent
          {...args}
          mode={ContextMenuMode.HOVER}
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
