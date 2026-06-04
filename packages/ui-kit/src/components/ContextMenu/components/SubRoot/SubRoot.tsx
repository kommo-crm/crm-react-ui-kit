import React from 'react';
import { Root as RadixDropdownMenuRoot } from '@radix-ui/react-dropdown-menu';

import { ContextMenuProvider } from '../../ContextMenu.context';
import { ContextMenuMode } from '../../ContextMenu.enums';

import { FocusBlocker } from '../FocusBlocker';

import { useContextMenuSubMenu } from './hooks';

import { Trigger } from './components/Trigger/Trigger';
import { Content } from './components/Content/Content';

import { ContextMenuSubRootProps } from './SubRoot.props';

const DISPLAY_NAME = 'ContextMenu.__experimental_SubRoot';

export const __experimental_SubRoot = (props: ContextMenuSubRootProps) => {
  const {
    children,
    defaultOpen,
    mode = ContextMenuMode.HOVER,
    shouldCloseCurrentMenuOnSelect = true,
    shouldCloseRootMenuOnSelect = true,
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
    triggerId,
    itemWithFocusedInput,
    animationDuration,
    hoverCloseDelay,
    closeMenuImmediately,
    setItemWithFocusedInput,
    setIsSubMenuOpen,
    onOpenChange,
    onContentEnter,
    onContentLeave,
    onOpenByKeyboard,
    onChildOpen,
  } = useContextMenuSubMenu({
    displayName: DISPLAY_NAME,
    mode: mode,
    defaultOpen,
    onOpen,
    onAnimatedOpen,
  });

  return (
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
      isSubMenuOpen={isOpen}
      setIsSubMenuOpen={setIsSubMenuOpen}
      triggerId={triggerId}
      onOpenByKeyboard={onOpenByKeyboard}
      shouldCloseCurrentMenuOnSelect={shouldCloseCurrentMenuOnSelect}
      shouldCloseRootMenuOnSelect={shouldCloseRootMenuOnSelect}
      onChildOpen={onChildOpen}
      isOpen={isOpen}
      itemWithFocusedInput={itemWithFocusedInput}
      setItemWithFocusedInput={setItemWithFocusedInput}
    >
      <RadixDropdownMenuRoot
        open={isOpen}
        onOpenChange={onOpenChange}
        modal={false}
        {...rest}
      >
        {children}

        {isOpen && (
          <FocusBlocker
            onClick={() => {
              closeMenuImmediately();
            }}
          />
        )}
      </RadixDropdownMenuRoot>
    </ContextMenuProvider>
  );
};

__experimental_SubRoot.displayName = DISPLAY_NAME;

__experimental_SubRoot.Trigger = Trigger;
__experimental_SubRoot.Content = Content;
