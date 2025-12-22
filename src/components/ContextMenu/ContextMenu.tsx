import React from 'react';
import { Root as RadixDropdownMenuRoot } from '@radix-ui/react-dropdown-menu';

import { useContextMenu, useContextMenuKeyboardNavigation } from './hooks';

import { ContextMenuRootProps } from './ContextMenu.props';
import { ContextMenuMode } from './ContextMenu.enums';

import { Trigger } from './components/Trigger/Trigger';
import { Portal } from './components/Portal/Portal';
import { Sub } from './components/Sub/Sub';
import { SubTrigger } from './components/SubTrigger/SubTrigger';
import { SubContent } from './components/SubContent/SubContent';
import { Content } from './components/Content/Content';
import { Arrow } from './components/Arrow/Arrow';
import { Item } from './components/Item/Item';
import { ItemRightSlot } from './components/ItemRightSlot/ItemRightSlot';
import { Group } from './components/Group/Group';
import { Label } from './components/Label/Label';
import { CheckboxItem } from './components/CheckboxItem/CheckboxItem';
import { ItemIndicator } from './components/ItemIndicator/ItemIndicator';
import { RadioGroup } from './components/RadioGroup/RadioGroup';
import { RadioItem } from './components/RadioItem/RadioItem';
import { Separator } from './components/Separator/Separator';
import { ItemIcon } from './components/ItemIcon/ItemIcon';
import { SubRoot } from './components/SubRoot/SubRoot';

import {
  ContextMenuProvider,
  ContextMenuRootProvider,
  DISPLAY_NAME,
} from './ContextMenu.context';

const HOVER_CLOSE_DELAY = 200;
const ANIMATION_DURATION = 150;

export const ContextMenu = (props: ContextMenuRootProps) => {
  const {
    children,
    mode,
    isOpen: isOpenForcefully,
    defaultOpen,
    shouldCloseCurrentMenuOnSelect = true,
    enableInnerInputFocus = false,
    enableCloseOnFocusLoss = false,
    onOpen,
    onAnimatedOpen,

    ...rest
  } = props;

  const {
    mode: rootMode,
    isOpen,
    triggerRef,
    contentRef,
    isAnimatedOpen,
    animationDuration,
    hoverCloseDelay,
    isRootContentBlocked,
    isChildOpen,
    itemWithFocusedInput,
    closeMenuImmediately,
    onOpenChange,
    onContentEnter,
    onContentLeave,
    onOpenByKeyboard,
    onChildOpen,
    onSubmenuOpen,
    setItemWithFocusedInput,
    shouldPreventFocusRestore,
    setMenuAimDirection,
  } = useContextMenu({
    mode: mode as ContextMenuMode,
    defaultOpen,
    animationDuration: ANIMATION_DURATION,
    hoverCloseDelay: HOVER_CLOSE_DELAY,
    isOpen: isOpenForcefully,
    enableInnerInputFocus,
    enableCloseOnFocusLoss,
    onOpen,
    onAnimatedOpen,
  });

  useContextMenuKeyboardNavigation({
    isOpen: isOpenForcefully ?? isOpen,
    isAnimatedOpen,
    contentRef,
    mode: rootMode,
  });

  return (
    <ContextMenuRootProvider
      closeRootMenuImmediately={closeMenuImmediately}
      enableInnerInputFocus={enableInnerInputFocus}
    >
      <ContextMenuProvider
        mode={rootMode}
        triggerRef={triggerRef}
        contentRef={contentRef}
        isAnimatedOpen={isAnimatedOpen}
        animationDuration={animationDuration}
        hoverCloseDelay={hoverCloseDelay}
        closeMenuImmediately={closeMenuImmediately}
        onContentEnter={onContentEnter}
        onContentLeave={onContentLeave}
        onOpenByKeyboard={onOpenByKeyboard}
        shouldCloseCurrentMenuOnSelect={shouldCloseCurrentMenuOnSelect}
        onChildOpen={onChildOpen}
        isOpen={isOpen}
        onSubmenuOpen={onSubmenuOpen}
        isRootContentBlocked={isRootContentBlocked}
        isChildOpen={isChildOpen}
        itemWithFocusedInput={itemWithFocusedInput}
        setItemWithFocusedInput={setItemWithFocusedInput}
        shouldPreventFocusRestore={shouldPreventFocusRestore}
        setMenuAimDirection={setMenuAimDirection}
      >
        <RadixDropdownMenuRoot
          open={isOpenForcefully ?? isOpen}
          onOpenChange={onOpenChange}
          /**
           * Necessary for hover mode to work correctly.
           */
          modal={false}
          {...rest}
        >
          {children}
        </RadixDropdownMenuRoot>
      </ContextMenuProvider>
    </ContextMenuRootProvider>
  );
};

ContextMenu.displayName = DISPLAY_NAME;

ContextMenu.Root = ContextMenu;
ContextMenu.experimental_SubRoot = SubRoot;
ContextMenu.Trigger = Trigger;
ContextMenu.Content = Content;
ContextMenu.Portal = Portal;
ContextMenu.Sub = Sub;
ContextMenu.SubTrigger = SubTrigger;
ContextMenu.SubContent = SubContent;
ContextMenu.Arrow = Arrow;
ContextMenu.Item = Item;
ContextMenu.ItemRightSlot = ItemRightSlot;
ContextMenu.Group = Group;
ContextMenu.Label = Label;
ContextMenu.CheckboxItem = CheckboxItem;
ContextMenu.RadioGroup = RadioGroup;
ContextMenu.RadioItem = RadioItem;
ContextMenu.ItemIndicator = ItemIndicator;
ContextMenu.Separator = Separator;
ContextMenu.ItemIcon = ItemIcon;
