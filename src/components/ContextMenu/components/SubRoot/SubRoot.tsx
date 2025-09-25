import React, { forwardRef, useImperativeHandle } from 'react';
import { Root as RadixDropdownMenuRoot } from '@radix-ui/react-dropdown-menu';

import {
  ContextMenuProvider,
  useContextMenuContext,
} from '../../ContextMenu.context';
import { ContextMenuMode } from '../../ContextMenu.enums';
import { useContextMenuSubMenu } from '../../hooks';
import { useSubMenuContext } from '../../providers';

import { ContextMenuHandle } from '../../ContextMenu.types';

import { Trigger } from './components/Trigger/Trigger';
import { Content } from './components/Content/Content';

import { ContextMenuSubRootProps } from './SubRoot.props';
import { ContextMenuSubRootType } from './SubRoot.types';

import s from './SubRoot.module.css';

const DISPLAY_NAME = 'ContextMenu.SubRoot';

export const SubRoot = forwardRef<ContextMenuHandle, ContextMenuSubRootProps>(
  (
    {
      children,
      mode = ContextMenuMode.HOVER,
      onOpen,
      onAnimatedOpen,
      defaultOpen,
      isCloseWithRootMenu = false,
      ...rest
    },
    ref
  ) => {
    const {
      animationDuration,
      hoverCloseDelay,
      closeMenuImmediately: closeRootMenuImmediatelyContext,
    } = useContextMenuContext(DISPLAY_NAME);

    const { subMenuOpen: subMenuOpenContext, setSubMenuOpen } =
      useSubMenuContext(DISPLAY_NAME);

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
      onOpenByKeyboard,
      handleContentMouseEnter,
      hasHoveredContent,
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
      closeRootMenuImmediately,
    });

    useImperativeHandle(ref, () => ({
      closeMenuImmediately,
      enableTemporaryHoverClose,
      onOpenByKeyboard,
    }));

    const isOpen = subMenuOpenContext || openContext;

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
        subMenuOpen={isOpen}
        setSubMenuOpen={setSubMenuOpen}
        triggerId={triggerId}
        onOpenByKeyboard={onOpenByKeyboard}
        onContentMouseEnter={handleContentMouseEnter}
        isOpen={isOpen}
      >
        <RadixDropdownMenuRoot
          open={isOpen}
          onOpenChange={onOpenChange}
          modal={false}
          {...rest}
        >
          {children}

          {isOpen && !hasHoveredContent && (
            <div
              className={s.blocker}
              tabIndex={0}
              onFocus={(e) => e.preventDefault()}
            />
          )}
        </RadixDropdownMenuRoot>
      </ContextMenuProvider>
    );
  }
) as ContextMenuSubRootType;

SubRoot.displayName = DISPLAY_NAME;

SubRoot.Trigger = Trigger;
SubRoot.Content = Content;
