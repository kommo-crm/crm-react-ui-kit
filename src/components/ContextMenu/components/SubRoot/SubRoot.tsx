import React from 'react';
import { Root as RadixDropdownMenuRoot } from '@radix-ui/react-dropdown-menu';

import {
  ContextMenuProvider,
  useContextMenuContext,
} from '../../ContextMenu.context';
import { ContextMenuMode } from '../../ContextMenu.enums';
import { useContextMenuSubMenu } from '../../hooks';
import { useContextMenuItemContext } from '../Item/Item.context';

import { Trigger } from './components/Trigger/Trigger';
import { Content } from './components/Content/Content';

import { ContextMenuSubRootProps } from './SubRoot.props';

const DISPLAY_NAME = 'ContextMenu.SubRoot';

export const SubRoot = ({
  children,
  mode = ContextMenuMode.HOVER,
  onOpen,
  defaultOpen,
  isCloseWithRootMenu = false,
  ...rest
}: ContextMenuSubRootProps) => {
  const {
    animationDuration,
    hoverCloseDelay,
    closeMenuImmediately: closeRootMenuImmediatelyContext,
  } = useContextMenuContext(DISPLAY_NAME);

  const { subMenuOpen: subMenuOpenContext, setSubMenuOpen } =
    useContextMenuItemContext(DISPLAY_NAME);

  const closeRootMenuImmediately = isCloseWithRootMenu
    ? closeRootMenuImmediatelyContext
    : undefined;

  const {
    mode: rootMode,
    open: openContext,
    onOpenChange,
    triggerRef,
    contentRef,
    inheritedArrowColor,
    animatedOpen,
    temporaryHoverClose,
    closeMenuImmediately,
    onMouseEnter,
    onMouseLeave,
    enableTemporaryHoverClose,
    triggerId,
  } = useContextMenuSubMenu({
    displayName: DISPLAY_NAME,
    mode: mode,
    defaultOpen,
    onOpen,
    animationDuration,
    subMenuOpen: subMenuOpenContext,
    setSubMenuOpen,
    hoverCloseDelay,
    closeRootMenuImmediately,
  });

  return (
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
      subMenuOpen={subMenuOpenContext}
      setSubMenuOpen={setSubMenuOpen}
      triggerId={triggerId}
    >
      <RadixDropdownMenuRoot
        open={openContext || subMenuOpenContext}
        onOpenChange={onOpenChange}
        modal={false}
        {...rest}
      >
        {children}
      </RadixDropdownMenuRoot>
    </ContextMenuProvider>
  );
};

SubRoot.displayName = DISPLAY_NAME;

SubRoot.Trigger = Trigger;
SubRoot.Content = Content;
