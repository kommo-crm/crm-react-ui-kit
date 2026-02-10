import React from 'react';
import { Sub as RadixDropdownMenuSub } from '@radix-ui/react-dropdown-menu';

import { ContextMenuMode } from '../../ContextMenu.enums';

import {
  DEFAULT_AIMING_IDLE_TIMEOUT,
  DEFAULT_AIMING_TOLERANCE,
} from '../../ContextMenu';

import { useContextMenuSub } from './hooks';

import { SubProps } from './Sub.props';
import { ContextMenuSubProvider, DISPLAY_NAME } from './Sub.context';

export const Sub = (props: SubProps) => {
  const {
    children,
    mode = ContextMenuMode.HOVER,
    onOpen,
    defaultOpen,
    shouldCloseRootMenuOnSelect = true,
    shouldCloseCurrentMenuOnSelect = true,
    onAiming,
    aimingTolerance = DEFAULT_AIMING_TOLERANCE,
    aimingIdleTimeout = DEFAULT_AIMING_IDLE_TIMEOUT,

    ...rest
  } = props;

  const {
    isOpen,
    setIsOpen,
    isAnimatedOpen,
    handleContentEnter,
    handleContentLeave,
    handleOpenChange,
    triggerId,
    onOpenByKeyboard,
    contentRef,
    triggerRef,
    onChildOpen,
    onSubRootOpen,
    closeMenuImmediately,
    itemWithFocusedInput,
    setItemWithFocusedInput,
    isAiming,
    handlePointerDownOutside,
  } = useContextMenuSub({
    displayName: DISPLAY_NAME,
    mode,
    defaultOpen,
    onOpen,
    onAiming,
    aimingTolerance,
    aimingIdleTimeout,
  });

  return (
    <ContextMenuSubProvider
      mode={mode}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isAnimatedOpen={isAnimatedOpen}
      defaultOpen={defaultOpen}
      onContentEnter={handleContentEnter}
      onContentLeave={handleContentLeave}
      onOpenByKeyboard={onOpenByKeyboard}
      triggerId={triggerId}
      contentRef={contentRef}
      triggerRef={triggerRef}
      onChildOpen={onChildOpen}
      onSubRootOpen={onSubRootOpen}
      shouldCloseRootMenuOnSelect={shouldCloseRootMenuOnSelect}
      shouldCloseCurrentMenuOnSelect={shouldCloseCurrentMenuOnSelect}
      closeMenuImmediately={closeMenuImmediately}
      itemWithFocusedInput={itemWithFocusedInput}
      setItemWithFocusedInput={setItemWithFocusedInput}
      isAiming={isAiming}
      onPointerDownOutside={handlePointerDownOutside}
    >
      <RadixDropdownMenuSub
        open={isOpen}
        onOpenChange={handleOpenChange}
        {...rest}
      >
        {children}
      </RadixDropdownMenuSub>
    </ContextMenuSubProvider>
  );
};

Sub.displayName = DISPLAY_NAME;
