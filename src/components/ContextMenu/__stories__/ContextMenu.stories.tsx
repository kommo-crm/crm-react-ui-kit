import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import ContextMenuTriggerIcon from 'src/icons/trigger.svg';
import ContextMenuTrashcanIcon from 'src/icons/trashcan.svg';
import ContextMenuCheckIcon from 'src/icons/check.svg';

import {
  ContextMenu,
  ContextMenuRootTheme,
  ContextMenuTriggerTheme,
  ContextMenuItemTheme,
  ContextMenuSeparatorTheme,
  ContextMenuCheckboxItemTheme,
  ContextMenuItemIndicatorTheme,
  ContextMenuLabelTheme,
  ContextMenuRadioItemTheme,
  ContextMenuArrowTheme,
  ContextMenuSubContentTheme,
  ContextMenuContentTheme,
  ContextMenuItemRightSlotTheme,
  TextContextMenuTheme,
  ContextMenuSubTriggerTheme,
  ContextMenuMetaItemTheme,
} from 'src/components/ContextMenu';
import { Text } from 'src/components/Text';

import { CanvasCentered } from '@storybook-utils/constants';

import { i18n } from '@i18n';

import { ContextMenuMode } from '../ContextMenu.enums';

const USAGE = `
import { useState } from "react";

import {
  ContextMenu,
  ContextMenuRootTheme,
  ContextMenuTriggerTheme,
  ContextMenuItemTheme,
  ContextMenuSeparatorTheme,
  ContextMenuCheckboxItemTheme,
  ContextMenuItemIndicatorTheme,
  ContextMenuLabelTheme,
  ContextMenuRadioItemTheme,
  ContextMenuArrowTheme,
  ContextMenuSubContentTheme,
  ContextMenuContentTheme,
  ContextMenuItemRightSlotTheme,
  TextContextMenuTheme,
  ContextMenuSubTriggerTheme,
  ContextMenuMetaItemTheme,
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
    <ContextMenu.Root theme={ContextMenuRootTheme}>
      <ContextMenu.Trigger theme={ContextMenuTriggerTheme}>
        <ContextMenuTriggerIcon />
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Content theme={ContextMenuContentTheme}>
          <ContextMenu.MetaItem
            theme={ContextMenuMetaItemTheme}
            label=${i18n.t('Workspace')}
            value="Kommo"
          />

          <ContextMenu.MetaItem
            theme={ContextMenuMetaItemTheme}
            label=${i18n.t('Workspace ID')}
            value="33764107"
            isCopyable
          />

          <ContextMenu.Item
            theme={ContextMenuItemTheme}
            text={
              <Text theme={TextContextMenuTheme} size="l">
                ${i18n.t('Change Workspace')}
              </Text>
            }
          >
            <ContextMenu.ItemRightSlot theme={ContextMenuItemRightSlotTheme}>
              <Text theme={TextContextMenuTheme} size="l">
                ⌘+W
              </Text>
            </ContextMenu.ItemRightSlot>
          </ContextMenu.Item>

          <ContextMenu.Sub>
            <ContextMenu.SubTrigger
              theme={ContextMenuSubTriggerTheme}
              text={
                <Text theme={TextContextMenuTheme} size="l">
                  ${i18n.t('Contacts')}
                </Text>
              }
            />

            <ContextMenu.Portal>
              <ContextMenu.SubContent theme={ContextMenuSubContentTheme}>
                <ContextMenu.Item
                  theme={ContextMenuItemTheme}
                  text={
                    <Text theme={TextContextMenuTheme} size="l">
                      ${i18n.t('Contact')} 1
                    </Text>
                  }
                />

                <ContextMenu.Item
                  theme={ContextMenuItemTheme}
                  text={
                    <Text theme={TextContextMenuTheme} size="l">
                      ${i18n.t('Contact')} 2
                    </Text>
                  }
                  isDisabled
                />

                <ContextMenu.Item
                  theme={ContextMenuItemTheme}
                  icon={<ContextMenuTrashcanIcon />}
                  text={
                    <Text theme={TextContextMenuTheme} size="l">
                      ${i18n.t('Delete All')}
                    </Text>
                  }
                  isDanger
                />

                <ContextMenu.Separator theme={ContextMenuSeparatorTheme} />

                <ContextMenu.Item
                  theme={ContextMenuItemTheme}
                  text={
                    <Text theme={TextContextMenuTheme} size="l">
                      ${i18n.t('Technical support')}
                    </Text>
                  }
                />
              </ContextMenu.SubContent>
            </ContextMenu.Portal>
          </ContextMenu.Sub>

          <ContextMenu.Separator theme={ContextMenuSeparatorTheme} />

          <ContextMenu.CheckboxItem
            theme={ContextMenuCheckboxItemTheme}
            isChecked={autoupdateChecked}
            onChange={handleAutoupdateChange}
            text={
              <Text theme={TextContextMenuTheme} size="l">
                ${i18n.t('Autoupdate')}
              </Text>
            }
          >
            <ContextMenu.ItemIndicator theme={ContextMenuItemIndicatorTheme}>
              <ContextMenuCheckIcon />
            </ContextMenu.ItemIndicator>
          </ContextMenu.CheckboxItem>

          <ContextMenu.Separator theme={ContextMenuSeparatorTheme} />

          <ContextMenu.Label
            theme={ContextMenuLabelTheme}
            text={
              <Text theme={TextContextMenuTheme} size="l">
                ${i18n.t('Select Theme')}
              </Text>
            }
          />

          <ContextMenu.RadioGroup value={theme} onChange={handleThemeChange}>
            <ContextMenu.RadioItem
              theme={ContextMenuRadioItemTheme}
              value="light"
              text={
                <Text theme={TextContextMenuTheme} size="l">
                  ${i18n.t('Light')}
                </Text>
              }
            />

            <ContextMenu.RadioItem
              theme={ContextMenuRadioItemTheme}
              value="dark"
              text={
                <Text theme={TextContextMenuTheme} size="l">
                  ${i18n.t('Dark')}
                </Text>
              }
            />
          </ContextMenu.RadioGroup>

          <ContextMenu.Arrow theme={ContextMenuArrowTheme} />
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}
`;

const renderSubSelectMenu = (
  key: string,
  mode: ContextMenuMode = ContextMenuMode.HOVER,
  disableItemIconAlign = false
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
    <ContextMenu.Root
      theme={ContextMenuRootTheme}
      key={key}
      mode={mode}
      disableItemIconAlign={disableItemIconAlign}
    >
      <ContextMenu.Trigger theme={ContextMenuTriggerTheme}>
        <ContextMenuTriggerIcon />
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Content theme={ContextMenuContentTheme}>
          <ContextMenu.MetaItem
            theme={ContextMenuMetaItemTheme}
            label={i18n.t('Workspace')}
            value="Kommo"
          />

          <ContextMenu.MetaItem
            theme={ContextMenuMetaItemTheme}
            label={i18n.t('Workspace ID')}
            value="33764107"
            isCopyable
          />

          <ContextMenu.Item
            theme={ContextMenuItemTheme}
            text={
              <Text theme={TextContextMenuTheme} size="l">
                {i18n.t('Change Workspace')}
              </Text>
            }
          >
            <ContextMenu.ItemRightSlot theme={ContextMenuItemRightSlotTheme}>
              <Text theme={TextContextMenuTheme} size="l">
                ⌘+W
              </Text>
            </ContextMenu.ItemRightSlot>
          </ContextMenu.Item>

          <ContextMenu.Sub>
            <ContextMenu.SubTrigger
              theme={ContextMenuSubTriggerTheme}
              text={
                <Text theme={TextContextMenuTheme} size="l">
                  {i18n.t('Contacts')}
                </Text>
              }
            />

            <ContextMenu.Portal>
              <ContextMenu.SubContent theme={ContextMenuSubContentTheme}>
                <ContextMenu.Item
                  theme={ContextMenuItemTheme}
                  text={
                    <Text theme={TextContextMenuTheme} size="l">
                      {i18n.t('Contact')} 1
                    </Text>
                  }
                />

                <ContextMenu.Item
                  theme={ContextMenuItemTheme}
                  text={
                    <Text theme={TextContextMenuTheme} size="l">
                      {i18n.t('Contact')} 2
                    </Text>
                  }
                  isDisabled
                />

                <ContextMenu.Item
                  theme={ContextMenuItemTheme}
                  icon={<ContextMenuTrashcanIcon />}
                  text={
                    <Text theme={TextContextMenuTheme} size="l">
                      {i18n.t('Delete All')}
                    </Text>
                  }
                  isDanger
                />

                <ContextMenu.Separator theme={ContextMenuSeparatorTheme} />

                <ContextMenu.Item
                  theme={ContextMenuItemTheme}
                  text={
                    <Text theme={TextContextMenuTheme} size="l">
                      {i18n.t('Technical support')}
                    </Text>
                  }
                />
              </ContextMenu.SubContent>
            </ContextMenu.Portal>
          </ContextMenu.Sub>

          <ContextMenu.Separator theme={ContextMenuSeparatorTheme} />

          <ContextMenu.CheckboxItem
            theme={ContextMenuCheckboxItemTheme}
            isChecked={autoupdateChecked}
            onChange={handleAutoupdateChange}
            text={
              <Text theme={TextContextMenuTheme} size="l">
                {i18n.t('Autoupdate')}
              </Text>
            }
          >
            <ContextMenu.ItemIndicator theme={ContextMenuItemIndicatorTheme}>
              <ContextMenuCheckIcon />
            </ContextMenu.ItemIndicator>
          </ContextMenu.CheckboxItem>

          <ContextMenu.Separator theme={ContextMenuSeparatorTheme} />

          <ContextMenu.Label
            theme={ContextMenuLabelTheme}
            text={
              <Text theme={TextContextMenuTheme} size="l">
                {i18n.t('Select Theme')}
              </Text>
            }
          />

          <ContextMenu.RadioGroup value={theme} onChange={handleThemeChange}>
            <ContextMenu.RadioItem
              theme={ContextMenuRadioItemTheme}
              value="light"
              text={
                <Text theme={TextContextMenuTheme} size="l">
                  {i18n.t('Light')}
                </Text>
              }
            />

            <ContextMenu.RadioItem
              theme={ContextMenuRadioItemTheme}
              value="dark"
              text={
                <Text theme={TextContextMenuTheme} size="l">
                  {i18n.t('Dark')}
                </Text>
              }
            />
          </ContextMenu.RadioGroup>

          <ContextMenu.Arrow theme={ContextMenuArrowTheme} />
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
    theme: ContextMenuRootTheme,
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
          marginBottom: '320px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: () => {
    return renderSubSelectMenu('');
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
            {renderSubSelectMenu(`menu-${i}`)}
          </div>
        ))}
      </div>
    );
  },
};

export const ClickMode: Story = {
  render: () => {
    return renderSubSelectMenu('', ContextMenuMode.CLICK);
  },
};

export const DisabledAutoAlign: Story = {
  render: () => {
    return renderSubSelectMenu('', ContextMenuMode.HOVER, true);
  },
};
