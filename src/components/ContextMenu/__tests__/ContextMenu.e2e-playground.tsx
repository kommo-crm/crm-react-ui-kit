import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import ContextMenuTriggerIcon from '@storybook-utils/icons/trigger.svg';
import ContextMenuTrashcanIcon from '@storybook-utils/icons/trashcan.svg';
import ContextMenuCheckIcon from '@storybook-utils/icons/check.svg';

import { Text, TextPrimaryTheme, TextTheme } from 'src/components/Text';

import { ContextMenu, ContextMenuMode } from '..';
import { type ContextMenuRootProps } from '../ContextMenu.props';

const TextContextMenuTheme: TextTheme = {
  ...TextPrimaryTheme,
  '--crm-ui-kit-text-color': 'inherit',
};

export const ContextMenuPlayground = (
  props: ComponentPlaygroundProps<ContextMenuRootProps>
) => {
  return (
    <ComponentPlayground<ContextMenuRootProps>
      {...props}
      propSets={[
        {
          children: [
            <>
              <ContextMenu.Trigger>
                <ContextMenuTriggerIcon />
              </ContextMenu.Trigger>

              <ContextMenu.Portal>
                <ContextMenu.Content>
                  <ContextMenu.Item>
                    <Text theme={TextContextMenuTheme} size="l">
                      Change Workspace
                    </Text>

                    <ContextMenu.ItemRightSlot>
                      <Text theme={TextContextMenuTheme} size="l">
                        ⌘+W
                      </Text>
                    </ContextMenu.ItemRightSlot>
                  </ContextMenu.Item>

                  <ContextMenu.Sub defaultOpen>
                    <ContextMenu.SubTrigger>
                      <Text theme={TextContextMenuTheme} size="l">
                        Contacts
                      </Text>
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

                        <ContextMenu.Item isDanger>
                          <ContextMenu.ItemIcon>
                            <ContextMenuTrashcanIcon />
                          </ContextMenu.ItemIcon>

                          <Text theme={TextContextMenuTheme} size="l">
                            Delete All
                          </Text>
                        </ContextMenu.Item>

                        <ContextMenu.Separator />

                        <ContextMenu.Item>
                          <Text theme={TextContextMenuTheme} size="l">
                            Technical support
                          </Text>
                        </ContextMenu.Item>
                      </ContextMenu.SubContent>
                    </ContextMenu.Portal>
                  </ContextMenu.Sub>

                  <ContextMenu.Separator />

                  <ContextMenu.CheckboxItem isChecked={true}>
                    <Text theme={TextContextMenuTheme} size="l">
                      Autoupdate
                    </Text>

                    <ContextMenu.ItemIndicator>
                      <ContextMenuCheckIcon />
                    </ContextMenu.ItemIndicator>
                  </ContextMenu.CheckboxItem>

                  <ContextMenu.Separator />

                  <ContextMenu.Label>
                    <Text theme={TextContextMenuTheme} size="l">
                      Select Theme
                    </Text>
                  </ContextMenu.Label>

                  <ContextMenu.RadioGroup value={'light'}>
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

                  <ContextMenu.Arrow />
                </ContextMenu.Content>
              </ContextMenu.Portal>
            </>,
          ],
          open: [true],
          mode: [ContextMenuMode.CLICK],
        },
      ]}
    >
      {(itemProps: ContextMenuRootProps) => (
        <div
          style={{
            height: '400px',
            padding: '10px',
          }}
        >
          <ContextMenu.Root {...itemProps} />
        </div>
      )}
    </ComponentPlayground>
  );
};
