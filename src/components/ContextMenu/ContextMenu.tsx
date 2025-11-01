import React, { forwardRef, useImperativeHandle } from 'react';
import { Root as RadixDropdownMenuRoot } from '@radix-ui/react-dropdown-menu';

import { useContextMenu } from './hooks';

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
import { FocusBlocker } from './components/FocusBlocker/FocusBlocker';

import {
  ContextMenuProvider,
  ContextMenuRootProvider,
  DISPLAY_NAME,
} from './ContextMenu.context';

import { ContextMenuHandle, ContextMenuType } from './ContextMenu.types';

const HOVER_CLOSE_DELAY = 200;
const ANIMATION_DURATION = 150;

export const ContextMenu = forwardRef<ContextMenuHandle, ContextMenuRootProps>(
  (
    {
      children,
      mode,
      onOpen,
      isOpen,
      defaultOpen,
      onAnimatedOpen,
      isCloseOnClick = true,
      enableInnerInputFocus = false,
      backgroundFocusBlockerContainers = [document.body],
      backgroundFocusBlockerClassName,
      backgroundInputFocusBlockerClassName,

      ...rest
    },
    ref
  ) => {
    const {
      mode: rootMode,
      open,
      onOpenChange,
      triggerRef,
      contentRef,
      inheritedArrowColor,
      animatedOpen,
      animationDuration,
      hoverCloseDelay,
      temporaryHoverClose,
      closeMenuImmediately,
      onMouseEnter,
      onMouseLeave,
      enableTemporaryHoverClose,
      onOpenByKeyboard,
      onChildOpen,
      onSubmenuOpen,
      isRootContentBlocked,
      isChildOpen,
      itemWithFocusedInput,
      setItemWithFocusedInput,
    } = useContextMenu({
      mode: mode as ContextMenuMode,
      defaultOpen,
      onOpen,
      onAnimatedOpen,
      animationDuration: ANIMATION_DURATION,
      hoverCloseDelay: HOVER_CLOSE_DELAY,
      isOpen,
      enableInnerInputFocus,
      backgroundFocusBlockerContainers,
      backgroundFocusBlockerClassName,
      backgroundInputFocusBlockerClassName,
    });

    useImperativeHandle(ref, () => ({
      closeMenuImmediately,
      enableTemporaryHoverClose,
      onOpenByKeyboard,
    }));

    return (
      <ContextMenuRootProvider
        closeRootMenuImmediately={closeMenuImmediately}
        itemWithFocusedInput={itemWithFocusedInput}
        setItemWithFocusedInput={setItemWithFocusedInput}
        enableInnerInputFocus={enableInnerInputFocus}
      >
        <ContextMenuProvider
          mode={rootMode}
          triggerRef={triggerRef}
          contentRef={contentRef}
          inheritedArrowColor={inheritedArrowColor}
          animatedOpen={animatedOpen}
          animationDuration={animationDuration}
          hoverCloseDelay={hoverCloseDelay}
          temporaryHoverClose={temporaryHoverClose}
          closeMenuImmediately={closeMenuImmediately}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          enableTemporaryHoverClose={enableTemporaryHoverClose}
          onOpenByKeyboard={onOpenByKeyboard}
          isCloseOnClick={isCloseOnClick}
          onChildOpen={onChildOpen}
          isOpen={open}
          onSubmenuOpen={onSubmenuOpen}
          isRootContentBlocked={isRootContentBlocked}
          isChildOpen={isChildOpen}
        >
          <RadixDropdownMenuRoot
            open={isOpen ?? open}
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
  }
) as ContextMenuType;

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
ContextMenu.FocusBlocker = FocusBlocker;
