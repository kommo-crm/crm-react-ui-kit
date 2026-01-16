import React from 'react';
import { Sub as RadixDropdownMenuSub } from '@radix-ui/react-dropdown-menu';

import { ContextMenuMode } from '../../ContextMenu.enums';

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
    isAimingContentRef,
  } = useContextMenuSub({
    displayName: DISPLAY_NAME,
    mode,
    defaultOpen,
    onOpen,
    onAiming,
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
      isAimingContentRef={isAimingContentRef}
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
