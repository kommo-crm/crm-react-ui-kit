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

import { ContextMenu, ContextMenuMode } from '..';
import { ContentProps, Direction } from '../components/Content';

const TextContextMenuTheme: TextTheme = {
  ...TextPrimaryTheme,
  '--crm-ui-kit-text-color': 'inherit',
};

interface ContextMenuComponentProps {
  direction?: ContentProps['direction'];
  isDefaultOpenSubMenu?: boolean;
  isDefaultOpenSub?: boolean;
}

const ContextMenuComponent = ({
  direction,
  isDefaultOpenSubMenu,
  isDefaultOpenSub,
}: ContextMenuComponentProps) => {
  const [autoupdateChecked, setAutoupdateChecked] = useState(true);
  const [theme, setTheme] = useState('light');

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
        <ContextMenu.Content
          collisionBoundary={
            document.querySelector('.docs-story') as HTMLElement
          }
          direction={direction}
          sideOffset={5}
        >
          <ContextMenu.Label>
            <Text theme={TextSecondaryDarkTheme} size="l">
              Label
            </Text>
          </ContextMenu.Label>

          <ContextMenu.Item isSelectable={false}>
            <Text theme={TextContextMenuTheme} size="l">
              <b>Workspace:</b> Kommo
            </Text>
          </ContextMenu.Item>

          <ContextMenu.Item>
            <Text theme={TextContextMenuTheme} size="l">
              Workspace Settings
            </Text>

            <ContextMenu.ItemRightSlot>
              <ContextMenu.SubRoot
                mode={ContextMenuMode.CLICK}
                defaultOpen={isDefaultOpenSubMenu}
              >
                <ContextMenu.SubRoot.Trigger
                  style={{
                    all: 'unset',
                    display: 'flex',
                    padding: '10px 16px',
                    color: 'var(--crm-ui-kit-palette-text-secondary-dark)',
                    cursor: 'pointer',
                  }}
                >
                  <ContextMenuTriggerIcon />
                </ContextMenu.SubRoot.Trigger>

                <ContextMenu.Portal>
                  <ContextMenu.SubRoot.Content sideOffset={-5} alignOffset={16}>
                    <ContextMenu.CheckboxItem
                      isChecked={autoupdateChecked}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setAutoupdateChecked(e.target.checked);
                      }}
                      hasIconCheckFn={() => true}
                    >
                      <ContextMenu.ItemIndicator>
                        <ContextMenuCheckIcon />
                      </ContextMenu.ItemIndicator>

                      <Text theme={TextContextMenuTheme} size="l">
                        Autoupdate
                      </Text>
                    </ContextMenu.CheckboxItem>

                    <ContextMenu.Separator />

                    <ContextMenu.Label>
                      <Text theme={TextSecondaryDarkTheme} size="l">
                        Theme
                      </Text>
                    </ContextMenu.Label>

                    <ContextMenu.RadioGroup
                      value={theme}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setTheme(e.target.value);
                      }}
                    >
                      <ContextMenu.RadioItem value="light">
                        <Text theme={TextContextMenuTheme} size="l">
                          Light
                        </Text>
                      </ContextMenu.RadioItem>

                      <ContextMenu.RadioItem value="dark">
                        <Text theme={TextContextMenuTheme} size="l">
                          Dark
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
              Switch Workspace
            </Text>
          </ContextMenu.Item>

          <ContextMenu.Separator />

          <ContextMenu.Sub
            mode={ContextMenuMode.CLICK}
            defaultOpen={isDefaultOpenSub}
          >
            <ContextMenu.SubTrigger>
              <Text theme={TextContextMenuTheme} size="l">
                Contacts
              </Text>

              <ContextMenu.ItemRightSlot>
                <ContextMenuChevronRightIcon />
              </ContextMenu.ItemRightSlot>
            </ContextMenu.SubTrigger>

            <ContextMenu.Portal>
              <ContextMenu.SubContent>
                <ContextMenu.Item>
                  <Text theme={TextContextMenuTheme} size="l">
                    Contact 1
                  </Text>
                </ContextMenu.Item>

                <ContextMenu.Item isDisabled>
                  <Text theme={TextContextMenuTheme} size="l">
                    Contact 2
                  </Text>
                </ContextMenu.Item>

                <ContextMenu.Item isDanger hasIconCheckFn={() => true}>
                  <ContextMenu.ItemIcon data-icon>
                    <ContextMenuTrashcanIcon />
                  </ContextMenu.ItemIcon>

                  <Text theme={TextContextMenuTheme} size="l">
                    Delete All
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
              marginTop: direction?.endsWith('down') ? '60px' : undefined,
            }}
          >
            <ContextMenuComponent {...itemProps} />
          </div>
        );
      }}
    </ComponentPlayground>
  );
};
