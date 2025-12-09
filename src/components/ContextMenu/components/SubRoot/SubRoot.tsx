import React from 'react';
import { Root as RadixDropdownMenuRoot } from '@radix-ui/react-dropdown-menu';

import {
  ContextMenuProvider,
  useContextMenuContext,
} from '../../ContextMenu.context';
import { ContextMenuMode } from '../../ContextMenu.enums';

import { useSubMenuContext } from '../../providers';

import { FocusBlocker } from '../FocusBlocker';

import { useContextMenuSubMenu } from './hooks';

import { Trigger } from './components/Trigger/Trigger';
import { Content } from './components/Content/Content';

import { ContextMenuSubRootProps } from './SubRoot.props';

const DISPLAY_NAME = 'ContextMenu.SubRoot';

export const SubRoot = (props: ContextMenuSubRootProps) => {
  const {
    children,
    defaultOpen,
    mode = ContextMenuMode.HOVER,
    shouldCloseCurrentMenuOnSelect = true,
    shouldCloseRootMenuOnSelect = false,
    onOpen,
    onAnimatedOpen,

    ...rest
  } = props;

  const { animationDuration, hoverCloseDelay } =
    useContextMenuContext(DISPLAY_NAME);

  const { subMenuOpen: subMenuOpenContext, setSubMenuOpen } =
    useSubMenuContext(DISPLAY_NAME);

  const {
    mode: rootMode,
    isOpen,
    onOpenChange,
    triggerRef,
    contentRef,
    isAnimatedOpen,
    closeMenuImmediately,
    onContentEnter,
    onContentLeave,
    triggerId,
    onOpenByKeyboard,
    onChildOpen,
    itemWithFocusedInput,
    setItemWithFocusedInput,
  } = useContextMenuSubMenu({
    displayName: DISPLAY_NAME,
    mode: mode,
    defaultOpen,
    onOpen,
    onAnimatedOpen,
    animationDuration,
    subMenuOpen: subMenuOpenContext,
    setSubMenuOpen,
    hoverCloseDelay,
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
      subMenuOpen={isOpen}
      setSubMenuOpen={setSubMenuOpen}
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

SubRoot.displayName = DISPLAY_NAME;

SubRoot.Trigger = Trigger;
SubRoot.Content = Content;
