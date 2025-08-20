import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import ContextMenuTriggerIcon from 'src/icons/trigger.svg';
import ContextMenuTrashcanIcon from 'src/icons/trashcan.svg';
import ContextMenuCheckIcon from 'src/icons/check.svg';

import { Text } from 'src/components/Text';

import { ContextMenu, ContextMenuMode, TextContextMenuTheme } from '..';
import { type ContextMenuRootProps } from '../ContextMenu.props';

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
                  <ContextMenu.MetaItem label="Workspace" value="Kommo" />

                  <ContextMenu.MetaItem
                    label="Workspace ID"
                    value="33764107"
                    isCopyable
                  />

                  <ContextMenu.Item
                    text={
                      <Text theme={TextContextMenuTheme} size="l">
                        Change Workspace
                      </Text>
                    }
                  >
                    <ContextMenu.ItemRightSlot>
                      <Text theme={TextContextMenuTheme} size="l">
                        ⌘+W
                      </Text>
                    </ContextMenu.ItemRightSlot>
                  </ContextMenu.Item>

                  <ContextMenu.Sub mode={ContextMenuMode.CLICK} open>
                    <ContextMenu.SubTrigger
                      text={
                        <Text theme={TextContextMenuTheme} size="l">
                          Contacts
                        </Text>
                      }
                    />

                    <ContextMenu.Portal>
                      <ContextMenu.SubContent>
                        <ContextMenu.Item
                          text={
                            <Text theme={TextContextMenuTheme} size="l">
                              Contact 1
                            </Text>
                          }
                        />

                        <ContextMenu.Item
                          text={
                            <Text theme={TextContextMenuTheme} size="l">
                              Contact 2
                            </Text>
                          }
                          isDisabled
                        />

                        <ContextMenu.Item
                          icon={<ContextMenuTrashcanIcon />}
                          text={
                            <Text theme={TextContextMenuTheme} size="l">
                              Delete All
                            </Text>
                          }
                          isDanger
                        />

                        <ContextMenu.Separator />

                        <ContextMenu.Item
                          text={
                            <Text theme={TextContextMenuTheme} size="l">
                              Technical support
                            </Text>
                          }
                        />
                      </ContextMenu.SubContent>
                    </ContextMenu.Portal>
                  </ContextMenu.Sub>

                  <ContextMenu.Separator />

                  <ContextMenu.CheckboxItem
                    isChecked={true}
                    text={
                      <Text theme={TextContextMenuTheme} size="l">
                        Autoupdate
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
                        Select Theme
                      </Text>
                    }
                  />

                  <ContextMenu.RadioGroup value={'light'}>
                    <ContextMenu.RadioItem
                      value="light"
                      text={
                        <Text theme={TextContextMenuTheme} size="l">
                          Light
                        </Text>
                      }
                    />

                    <ContextMenu.RadioItem
                      value="dark"
                      text={
                        <Text theme={TextContextMenuTheme} size="l">
                          Dark
                        </Text>
                      }
                    />
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
