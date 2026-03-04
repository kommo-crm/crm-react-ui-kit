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
import { __experimental_SubRoot } from './components/SubRoot/SubRoot';

import {
  ContextMenuProvider,
  ContextMenuRootProvider,
  DISPLAY_NAME,
} from './ContextMenu.context';

const HOVER_CLOSE_DELAY = 200;
const ANIMATION_DURATION = 150;

export const DEFAULT_AIMING_TOLERANCE = 20;
export const DEFAULT_AIMING_IDLE_TIMEOUT = 200;

const ContextMenu = (props: ContextMenuRootProps) => {
  const {
    children,
    mode,
    isOpen: isOpenForcefully,
    defaultOpen,
    shouldCloseCurrentMenuOnSelect = true,
    onOpen,
    onAnimatedOpen,
    onAiming,
    aimingTolerance = DEFAULT_AIMING_TOLERANCE,
    aimingIdleTimeout = DEFAULT_AIMING_IDLE_TIMEOUT,

    ...rest
  } = props;

  const {
    mode: rootMode,
    isOpen,
    triggerRef,
    contentRef,
    isAnimatedOpen,
    skipAnimation,
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
    setOnFocusOutside,
    isChildAiming,
    onChildAiming,
  } = useContextMenu({
    mode: mode as ContextMenuMode,
    defaultOpen,
    animationDuration: ANIMATION_DURATION,
    hoverCloseDelay: HOVER_CLOSE_DELAY,
    isOpen: isOpenForcefully,
    onOpen,
    onAnimatedOpen,
    onAiming,
    aimingTolerance,
    aimingIdleTimeout,
  });

  const { navigationContentRef } = useContextMenuKeyboardNavigation({
    isOpen: isOpenForcefully ?? isOpen,
    isAnimatedOpen,
  });

  return (
    <ContextMenuRootProvider
      closeRootMenuImmediately={closeMenuImmediately}
      navigationContentRef={navigationContentRef}
    >
      <ContextMenuProvider
        mode={rootMode}
        triggerRef={triggerRef}
        contentRef={contentRef}
        isAnimatedOpen={isAnimatedOpen}
        skipAnimation={skipAnimation}
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
        setOnFocusOutside={setOnFocusOutside}
        isChildAiming={isChildAiming}
        onChildAiming={onChildAiming}
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

const ContextMenuRoot = Object.assign(ContextMenu, {
  displayName: DISPLAY_NAME,
  Root: ContextMenu,
  experimental_SubRoot: __experimental_SubRoot,
  Trigger,
  Content,
  Portal,
  Sub,
  SubTrigger,
  SubContent,
  Arrow,
  Item,
  ItemRightSlot,
  Group,
  Label,
  CheckboxItem,
  RadioGroup,
  RadioItem,
  ItemIndicator,
  Separator,
  ItemIcon,
});

export { ContextMenuRoot as ContextMenu };
