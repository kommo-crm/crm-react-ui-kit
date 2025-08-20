import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import ContextMenuTriggerIcon from 'src/icons/trigger.svg';
import ContextMenuTrashcanIcon from 'src/icons/trashcan.svg';
import ContextMenuCheckIcon from 'src/icons/check.svg';

import { ContextMenu, TextContextMenuTheme } from 'src/components/ContextMenu';
import { Text } from 'src/components/Text';

import { CanvasCentered } from '@storybook-utils/constants';

import { i18n } from '@i18n';

import { ContextMenuRootProps } from '../ContextMenu.props';

import { ContextMenuMode } from '../ContextMenu.enums';
import { Direction } from '../components/Content';
import { ContentProps } from '../components/Content/Content.props';

const USAGE = `
import { useState } from "react";

import {
  ContextMenu,
  ContextMenuMode,
  TextContextMenuTheme
} from "@kommo-crm/crm-react-ui-kit/ContextMenu";

import { Text } from "@kommo-crm/crm-react-ui-kit/Text";

import ContextMenuTriggerIcon from 'public/icons/trigger.svg';
import ContextMenuTrashcanIcon from 'public/icons/trashcan.svg';
import ContextMenuCheckIcon from 'public/icons/check.svg';

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
    <ContextMenu.Root mode={ContextMenuMode.CLICK}>
      <ContextMenu.Trigger>
        <ContextMenuTriggerIcon />
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Content>
          <ContextMenu.MetaItem
            label=${i18n.t('Workspace')}
            value="Kommo"
          />

          <ContextMenu.MetaItem
            label=${i18n.t('Workspace ID')}
            value="33764107"
            isCopyable
          />

          <ContextMenu.Item
            text={
              <Text theme={TextContextMenuTheme} size="l">
                ${i18n.t('Change Workspace')}
              </Text>
            }
          >
            <ContextMenu.ItemRightSlot>
              <Text theme={TextContextMenuTheme} size="l">
                ⌘+W
              </Text>
            </ContextMenu.ItemRightSlot>
          </ContextMenu.Item>

          <ContextMenu.Sub>
            <ContextMenu.SubTrigger
              text={
                <Text theme={TextContextMenuTheme} size="l">
                  ${i18n.t('Contacts')}
                </Text>
              }
            />

            <ContextMenu.Portal>
              <ContextMenu.SubContent>
                <ContextMenu.Item
                  text={
                    <Text theme={TextContextMenuTheme} size="l">
                      ${i18n.t('Contact')} 1
                    </Text>
                  }
                />

                <ContextMenu.Item
                  text={
                    <Text theme={TextContextMenuTheme} size="l">
                      ${i18n.t('Contact')} 2
                    </Text>
                  }
                  isDisabled
                />

                <ContextMenu.Item
                  icon={<ContextMenuTrashcanIcon />}
                  text={
                    <Text theme={TextContextMenuTheme} size="l">
                      ${i18n.t('Delete All')}
                    </Text>
                  }
                  isDanger
                />

                <ContextMenu.Separator />

                <ContextMenu.Item
                  text={
                    <Text theme={TextContextMenuTheme} size="l">
                      ${i18n.t('Technical support')}
                    </Text>
                  }
                />
              </ContextMenu.SubContent>
            </ContextMenu.Portal>
          </ContextMenu.Sub>

          <ContextMenu.Separator />

          <ContextMenu.CheckboxItem
            isChecked={autoupdateChecked}
            onChange={handleAutoupdateChange}
            text={
              <Text theme={TextContextMenuTheme} size="l">
                ${i18n.t('Autoupdate')}
              </Text>
            }
          >
            <ContextMenu.ItemIndicator>
              <ContextMenuCheckIcon />
            </ContextMenu.ItemIndicator>
          </ContextMenu.CheckboxItem>

          <ContextMenu.Separator />

          <ContextMenu.Label
            text={
              <Text theme={TextContextMenuTheme} size="l">
                ${i18n.t('Select Theme')}
              </Text>
            }
          />

          <ContextMenu.RadioGroup value={theme} onChange={handleThemeChange}>
            <ContextMenu.RadioItem
              value="light"
              text={
                <Text theme={TextContextMenuTheme} size="l">
                  ${i18n.t('Light')}
                </Text>
              }
            />

            <ContextMenu.RadioItem
              value="dark"
              text={
                <Text theme={TextContextMenuTheme} size="l">
                  ${i18n.t('Dark')}
                </Text>
              }
            />
          </ContextMenu.RadioGroup>

          <ContextMenu.Arrow />
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}
`;

const renderSubSelectMenu = (
  key: string = 'menu',
  menuProps: ContextMenuRootProps & {
    isMinimalistic?: boolean;
  } = {
    mode: ContextMenuMode.CLICK,
    isMinimalistic: false,
  },
  contentProps?: Omit<ContentProps, 'theme'>,
  additionalLabel = false
) => {
  const [autoupdateChecked, setAutoupdateChecked] = useState(true);
  const [theme, setTheme] = useState('light');

  const handleAutoupdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutoupdateChecked(e.target.checked);
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.value);
  };

  return (
    <ContextMenu.Root {...menuProps} key={key}>
      <ContextMenu.Trigger>
        <ContextMenuTriggerIcon />
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Content
          collisionBoundary={
            document.querySelector('.docs-story') as HTMLElement
          }
          {...contentProps}
        >
          {additionalLabel && (
            <ContextMenu.Label
              text={
                <Text theme={TextContextMenuTheme} size="l">
                  {i18n.t('Label')}
                </Text>
              }
            />
          )}

          <ContextMenu.MetaItem label={i18n.t('Workspace')} value="Kommo" />

          <ContextMenu.MetaItem
            label={i18n.t('Workspace ID')}
            value="33764107"
            isCopyable
          />

          <ContextMenu.Item
            text={
              <Text theme={TextContextMenuTheme} size="l">
                {i18n.t('Change Workspace')}
              </Text>
            }
          >
            <ContextMenu.ItemRightSlot>
              <Text theme={TextContextMenuTheme} size="l">
                ⌘+W
              </Text>
            </ContextMenu.ItemRightSlot>
          </ContextMenu.Item>

          <ContextMenu.Sub>
            <ContextMenu.SubTrigger
              text={
                <Text theme={TextContextMenuTheme} size="l">
                  {i18n.t('Contacts')}
                </Text>
              }
            />

            <ContextMenu.Portal>
              <ContextMenu.SubContent>
                <ContextMenu.Item
                  text={
                    <Text theme={TextContextMenuTheme} size="l">
                      {i18n.t('Contact')} 1
                    </Text>
                  }
                />

                <ContextMenu.Item
                  text={
                    <Text theme={TextContextMenuTheme} size="l">
                      {i18n.t('Contact')} 2
                    </Text>
                  }
                  isDisabled
                />

                <ContextMenu.Item
                  icon={<ContextMenuTrashcanIcon />}
                  text={
                    <Text theme={TextContextMenuTheme} size="l">
                      {i18n.t('Delete All')}
                    </Text>
                  }
                  isDanger
                />

                <ContextMenu.Separator />

                <ContextMenu.Item
                  text={
                    <Text theme={TextContextMenuTheme} size="l">
                      {i18n.t('Technical support')}
                    </Text>
                  }
                />
              </ContextMenu.SubContent>
            </ContextMenu.Portal>
          </ContextMenu.Sub>

          {!menuProps.isMinimalistic && (
            <>
              <ContextMenu.Separator />

              <ContextMenu.CheckboxItem
                isChecked={autoupdateChecked}
                onChange={handleAutoupdateChange}
                text={
                  <Text theme={TextContextMenuTheme} size="l">
                    {i18n.t('Autoupdate')}
                  </Text>
                }
              >
                <ContextMenu.ItemIndicator>
                  <ContextMenuCheckIcon />
                </ContextMenu.ItemIndicator>
              </ContextMenu.CheckboxItem>

              <ContextMenu.Separator />

              <ContextMenu.Label
                text={
                  <Text theme={TextContextMenuTheme} size="l">
                    {i18n.t('Select Theme')}
                  </Text>
                }
              />

              <ContextMenu.RadioGroup
                value={theme}
                onChange={handleThemeChange}
              >
                <ContextMenu.RadioItem
                  value="light"
                  text={
                    <Text theme={TextContextMenuTheme} size="l">
                      {i18n.t('Light')}
                    </Text>
                  }
                />

                <ContextMenu.RadioItem
                  value="dark"
                  text={
                    <Text theme={TextContextMenuTheme} size="l">
                      {i18n.t('Dark')}
                    </Text>
                  }
                />
              </ContextMenu.RadioGroup>
            </>
          )}

          <ContextMenu.Arrow />
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};

const meta = {
  title: 'Components/ContextMenu',
  parameters: {
    ...CanvasCentered,
    docs: {
      source: {
        code: USAGE,
        language: 'jsx',
      },
    },
  },
  component: ContextMenu,
  args: {
    mode: ContextMenuMode.CLICK,
  },
} satisfies Meta<typeof ContextMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          width: '100%',
          marginBottom: '380px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: () => {
    return renderSubSelectMenu();
  },
};

export const Positions: Story = {
  render: () => {
    const positions = [
      { justify: 'flex-start', align: 'flex-start' },
      { justify: 'center', align: 'flex-start' },
      { justify: 'flex-end', align: 'flex-start' },
      { justify: 'flex-start', align: 'flex-end' },
      { justify: 'center', align: 'flex-end' },
      { justify: 'flex-end', align: 'flex-end' },
    ];

    const centralPositions = [
      Direction.LEFT_DOWN,
      Direction.RIGHT_DOWN,
      Direction.LEFT_UP,
      Direction.RIGHT_UP,
    ];

    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '90vh',
          display: 'flex',
          flexWrap: 'wrap',
          boxSizing: 'border-box',
        }}
      >
        {positions.map((pos, i) => (
          <div
            key={i}
            style={{
              width: '33.33%',
              height: '50%',
              display: 'flex',
              justifyContent: pos.justify,
              alignItems: pos.align,
            }}
          >
            {renderSubSelectMenu(`menu-${i}`, {
              mode: ContextMenuMode.CLICK,
            })}
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
            justifyItems: 'center',
            alignItems: 'center',
          }}
        >
          {centralPositions.map((dir, i) => (
            <div key={dir}>
              {renderSubSelectMenu(
                `menu-center-${i}`,
                {
                  mode: ContextMenuMode.CLICK,
                  isMinimalistic: true,
                },
                { direction: dir, sideOffset: 10 },
                true
              )}
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const HoverMode: Story = {
  render: () => {
    return renderSubSelectMenu('menu-hover', { mode: ContextMenuMode.HOVER });
  },
};
