import React, { useState } from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import ContextMenuTriggerIcon from '@storybook-utils/icons/trigger.svg';
import ContextMenuTrashcanIcon from '@storybook-utils/icons/trashcan.svg';
import ContextMenuCheckIcon from '@storybook-utils/icons/check.svg';
import ContextMenuChevronRightIcon from '@storybook-utils/icons/chevronRight.svg';

import {
  Text,
  TextPrimaryTheme,
  TextSecondaryDarkTheme,
  TextTheme,
} from 'src/components/Text';

import { ContextMenuMode } from '../ContextMenu.enums';
import { ContextMenu } from '..';
import { ContentProps, Direction } from '../components/Content';

const TextContextMenuTheme: TextTheme = {
  ...TextPrimaryTheme,
  '--crm-ui-kit-text-color': 'inherit',
};

interface ContextMenuComponentProps {
  /**
   * The direction of the context menu.
   */
  direction?: ContentProps['direction'];
  /**
   * Whether the sub menu is default open.
   */
  isDefaultOpenSubMenu: boolean | undefined;
  /**
   * Whether the sub menu is default open.
   */
  isDefaultOpenSub: boolean | undefined;
  /**
   * Whether the checkbox is checked.
   *
   * @default true
   */
  isCheckboxChecked?: boolean;
}

const ContextMenuComponent = ({
  direction,
  isDefaultOpenSubMenu,
  isDefaultOpenSub,
  isCheckboxChecked = true,
}: ContextMenuComponentProps) => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] =
    useState(isCheckboxChecked);
  const [theme, setTheme] = useState('light');

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsNotificationsEnabled(e.target.checked);
  };

  const handleRadioChange = (themeValue: string) => {
    setTheme(themeValue);
  };

  return (
    <ContextMenu.Root mode={ContextMenuMode.CLICK} defaultOpen>
      <ContextMenu.Trigger
        style={{
          all: 'unset',
          display: 'flex',
          padding: '4px',
          color: 'var(--crm-ui-kit-palette-text-secondary-dark)',
          cursor: 'pointer',
        }}
      >
        <ContextMenuTriggerIcon />
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Content direction={direction} sideOffset={5}>
          <ContextMenu.Label>
            <Text theme={TextSecondaryDarkTheme} size="l">
              Profile
            </Text>
          </ContextMenu.Label>

          <ContextMenu.Separator />

          <ContextMenu.Item isSelectable={false}>
            <Text theme={TextContextMenuTheme} size="l">
              <b>User ID:</b> 123456
            </Text>
          </ContextMenu.Item>

          <ContextMenu.Item style={{ maxHeight: '20px' }}>
            <Text theme={TextContextMenuTheme} size="l">
              Lead
            </Text>

            <ContextMenu.ItemRightSlot>
              <ContextMenu.experimental_SubRoot
                mode={ContextMenuMode.CLICK}
                defaultOpen={isDefaultOpenSubMenu}
              >
                <ContextMenu.experimental_SubRoot.Trigger
                  style={{
                    all: 'unset',
                    display: 'flex',
                    padding: '10px 16px',
                    color: 'var(--crm-ui-kit-palette-text-secondary-dark)',
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
                        Edit
                      </Text>
                    </ContextMenu.Item>

                    <ContextMenu.Item isDisabled>
                      <ContextMenu.ItemIcon />

                      <Text theme={TextContextMenuTheme} size="l" isEllipsis>
                        Export to PDF
                      </Text>
                    </ContextMenu.Item>

                    <ContextMenu.Item isDanger>
                      <ContextMenu.ItemIcon>
                        <ContextMenuTrashcanIcon />
                      </ContextMenu.ItemIcon>

                      <Text theme={TextContextMenuTheme} size="l" isEllipsis>
                        Delete
                      </Text>
                    </ContextMenu.Item>
                  </ContextMenu.experimental_SubRoot.Content>
                </ContextMenu.Portal>
              </ContextMenu.experimental_SubRoot>
            </ContextMenu.ItemRightSlot>
          </ContextMenu.Item>

          <ContextMenu.Sub
            mode={ContextMenuMode.CLICK}
            defaultOpen={isDefaultOpenSub}
          >
            <ContextMenu.SubTrigger>
              <Text theme={TextContextMenuTheme} size="l" isEllipsis>
                Settings
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
                    Enable notifications
                  </Text>
                </ContextMenu.CheckboxItem>

                <ContextMenu.Separator />

                <ContextMenu.Label>
                  {isNotificationsEnabled && <ContextMenu.ItemIcon />}

                  <Text theme={TextSecondaryDarkTheme} size="l" isEllipsis>
                    Theme
                  </Text>
                </ContextMenu.Label>

                <ContextMenu.RadioGroup
                  value={theme}
                  onChange={handleRadioChange}
                >
                  <ContextMenu.RadioItem value="light">
                    {isNotificationsEnabled && <ContextMenu.ItemIcon />}

                    <Text theme={TextContextMenuTheme} size="l" isEllipsis>
                      Light
                    </Text>
                  </ContextMenu.RadioItem>

                  <ContextMenu.RadioItem value="dark">
                    {isNotificationsEnabled && <ContextMenu.ItemIcon />}

                    <Text theme={TextContextMenuTheme} size="l" isEllipsis>
                      Dark
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

export const ContextMenuPlayground = (
  props: ComponentPlaygroundProps<ContextMenuComponentProps>
) => {
  return (
    <ComponentPlayground<ContextMenuComponentProps>
      {...props}
      propSets={[
        {
          isDefaultOpenSubMenu: [true],
          isDefaultOpenSub: [false],
          direction: [Direction.DOWN_RIGHT],
        },
        {
          isDefaultOpenSubMenu: [false],
          isDefaultOpenSub: [true],
          direction: [Direction.DOWN_RIGHT],
          isCheckboxChecked: [true],
        },
        {
          isDefaultOpenSubMenu: [false],
          isDefaultOpenSub: [true],
          direction: [Direction.DOWN_RIGHT],
          isCheckboxChecked: [false],
        },
        {
          isDefaultOpenSubMenu: [false],
          isDefaultOpenSub: [false],
          direction: [
            Direction.DOWN_RIGHT,
            Direction.DOWN_LEFT,
            Direction.UP_RIGHT,
            Direction.UP_LEFT,
            Direction.RIGHT_UP,
            Direction.RIGHT_DOWN,
            Direction.LEFT_UP,
            Direction.LEFT_DOWN,
          ],
        },
      ]}
    >
      {(itemProps: ContextMenuComponentProps) => {
        const { direction, isDefaultOpenSubMenu, isDefaultOpenSub } = itemProps;
        let alignItems: 'flex-start' | 'center' | 'flex-end' = 'center';
        let justifyContent: 'flex-start' | 'center' | 'flex-end' = 'center';
        let height = '320px';

        if (!isDefaultOpenSubMenu && !isDefaultOpenSub) {
          height = '270px';
        }

        if (direction?.startsWith('right') || direction?.startsWith('left')) {
          height = '220px';
        }

        if (direction?.startsWith('down') || direction?.endsWith('down')) {
          alignItems = 'flex-start';
        } else if (direction?.startsWith('up') || direction?.endsWith('up')) {
          alignItems = 'flex-end';
        }

        if (direction?.endsWith('right') || direction?.startsWith('right')) {
          justifyContent = 'flex-start';
        } else if (
          direction?.endsWith('left') ||
          direction?.startsWith('left')
        ) {
          justifyContent = 'flex-end';
        }

        return (
          <div
            style={{
              display: 'flex',
              justifyContent,
              alignItems,
              height,
              width: '320px',
              padding: '20px',
              marginTop: direction?.endsWith('down') ? '100px' : undefined,
            }}
          >
            <ContextMenuComponent {...itemProps} />
          </div>
        );
      }}
    </ComponentPlayground>
  );
};
