import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import ContextMenuTriggerIcon from 'src/icons/trigger.svg';
import ContextMenuTrashcanIcon from 'src/icons/trashcan.svg';
import ContextMenuCheckIcon from 'src/icons/check.svg';

import { Text } from 'src/components/Text';

import {
  ContextMenu,
  ContextMenuArrowTheme,
  ContextMenuCheckboxItemTheme,
  ContextMenuContentTheme,
  ContextMenuItemIndicatorTheme,
  ContextMenuItemRightSlotTheme,
  ContextMenuItemTheme,
  ContextMenuLabelTheme,
  ContextMenuMetaItemTheme,
  ContextMenuRadioItemTheme,
  ContextMenuSeparatorTheme,
  ContextMenuSubContentTheme,
  ContextMenuSubTriggerTheme,
  ContextMenuTriggerTheme,
  TextContextMenuTheme,
} from '..';
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
              <ContextMenu.Trigger theme={ContextMenuTriggerTheme}>
                <ContextMenuTriggerIcon />
              </ContextMenu.Trigger>

              <ContextMenu.Portal>
                <ContextMenu.Content theme={ContextMenuContentTheme}>
                  <ContextMenu.MetaItem
                    theme={ContextMenuMetaItemTheme}
                    label="Workspace"
                    value="Kommo"
                  />

                  <ContextMenu.MetaItem
                    theme={ContextMenuMetaItemTheme}
                    label="Workspace ID"
                    value="33764107"
                    isCopyable
                  />

                  <ContextMenu.Item
                    theme={ContextMenuItemTheme}
                    text={
                      <Text theme={TextContextMenuTheme} size="l">
                        Change Workspace
                      </Text>
                    }
                  >
                    <ContextMenu.ItemRightSlot
                      theme={ContextMenuItemRightSlotTheme}
                    >
                      <Text theme={TextContextMenuTheme} size="l">
                        ⌘+W
                      </Text>
                    </ContextMenu.ItemRightSlot>
                  </ContextMenu.Item>

                  <ContextMenu.Sub open={true}>
                    <ContextMenu.SubTrigger
                      theme={ContextMenuSubTriggerTheme}
                      text={
                        <Text theme={TextContextMenuTheme} size="l">
                          Contacts
                        </Text>
                      }
                    />

                    <ContextMenu.Portal>
                      <ContextMenu.SubContent
                        theme={ContextMenuSubContentTheme}
                      >
                        <ContextMenu.Item
                          theme={ContextMenuItemTheme}
                          text={
                            <Text theme={TextContextMenuTheme} size="l">
                              Contact 1
                            </Text>
                          }
                        />

                        <ContextMenu.Item
                          theme={ContextMenuItemTheme}
                          text={
                            <Text theme={TextContextMenuTheme} size="l">
                              Contact 2
                            </Text>
                          }
                          isDisabled
                        />

                        <ContextMenu.Item
                          theme={ContextMenuItemTheme}
                          icon={<ContextMenuTrashcanIcon />}
                          text={
                            <Text theme={TextContextMenuTheme} size="l">
                              Delete All
                            </Text>
                          }
                          isDanger
                        />

                        <ContextMenu.Separator
                          theme={ContextMenuSeparatorTheme}
                        />

                        <ContextMenu.Item
                          theme={ContextMenuItemTheme}
                          text={
                            <Text theme={TextContextMenuTheme} size="l">
                              Technical support
                            </Text>
                          }
                        />
                      </ContextMenu.SubContent>
                    </ContextMenu.Portal>
                  </ContextMenu.Sub>

                  <ContextMenu.Separator theme={ContextMenuSeparatorTheme} />

                  <ContextMenu.CheckboxItem
                    theme={ContextMenuCheckboxItemTheme}
                    isChecked={true}
                    text={
                      <Text theme={TextContextMenuTheme} size="l">
                        Autoupdate
                      </Text>
                    }
                  >
                    <ContextMenu.ItemIndicator
                      theme={ContextMenuItemIndicatorTheme}
                    >
                      <ContextMenuCheckIcon />
                    </ContextMenu.ItemIndicator>
                  </ContextMenu.CheckboxItem>

                  <ContextMenu.Separator theme={ContextMenuSeparatorTheme} />

                  <ContextMenu.Label
                    theme={ContextMenuLabelTheme}
                    text={
                      <Text theme={TextContextMenuTheme} size="l">
                        Select Theme
                      </Text>
                    }
                  />

                  <ContextMenu.RadioGroup value={'light'}>
                    <ContextMenu.RadioItem
                      theme={ContextMenuRadioItemTheme}
                      value="light"
                      text={
                        <Text theme={TextContextMenuTheme} size="l">
                          Light
                        </Text>
                      }
                    />

                    <ContextMenu.RadioItem
                      theme={ContextMenuRadioItemTheme}
                      value="dark"
                      text={
                        <Text theme={TextContextMenuTheme} size="l">
                          Dark
                        </Text>
                      }
                    />
                  </ContextMenu.RadioGroup>

                  <ContextMenu.Arrow theme={ContextMenuArrowTheme} />
                </ContextMenu.Content>
              </ContextMenu.Portal>
            </>,
          ],
          open: [true],
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
