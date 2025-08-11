import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Root as RadixDropdownMenuRoot } from '@radix-ui/react-dropdown-menu';

import { ContextMenuRootProps } from './ContextMenu.props';
import { ContextMenuMode } from './ContextMenu.enums';
import { ContextMenuType } from './ContextMenu.types';

import { Trigger } from './components/Trigger/Trigger';
import { Portal } from './components/Portal/Portal';
import { Sub } from './components/Sub/Sub';
import { SubTrigger } from './components/SubTrigger/SubTrigger';
import { SubContent } from './components/SubContent/SubContent';
import { SubSelect } from './components/SubSelect/SubSelect';
import { Content } from './components/Content/Content';
import { Arrow } from './components/Arrow/Arrow';
import { Item } from './components/Item/Item';
import { MetaItem } from './components/MetaItem/MetaItem';
import { ItemRightSlot } from './components/ItemRightSlot/ItemRightSlot';
import { Group } from './components/Group/Group';
import { Label } from './components/Label/Label';
import { CheckboxItem } from './components/CheckboxItem/CheckboxItem';
import { ItemIndicator } from './components/ItemIndicator/ItemIndicator';
import { RadioGroup } from './components/RadioGroup/RadioGroup';
import { RadioItem } from './components/RadioItem/RadioItem';
import { Separator } from './components/Separator/Separator';

import { ContextMenuProvider } from './ContextMenu.context';

const DISPLAY_NAME = 'ContextMenu';

export const ContextMenu = forwardRef<HTMLDivElement, ContextMenuRootProps>(
  (
    {
      children,
      mode,
      hoverCloseDelay = 200,
      hoverOpenDelay = 100,
      onOpen,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [isInsideContent, setIsInsideContent] = useState(false);
    const [temporaryHoverClose, setTemporaryHoverClose] = useState(false);

    const triggerRef = useRef<HTMLButtonElement>(null);
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
      if (!open || (mode !== ContextMenuMode.HOVER && !temporaryHoverClose)) {
        return;
      }

      if (isInsideContent) {
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
          closeTimeoutRef.current = null;
        }
      } else if (!closeTimeoutRef.current) {
        closeTimeoutRef.current = setTimeout(() => {
          setOpen(false);
          setIsInsideContent(false);
          setTemporaryHoverClose(false);
        }, hoverCloseDelay);
      }
    }, [mode, open, isInsideContent, temporaryHoverClose, hoverCloseDelay]);

    const handleOpenChange = (value: boolean) => {
      setOpen(value);

      if (value) {
        onOpen?.(value);
      }
    };

    const handleMouseEnter = () => {
      if (mode !== ContextMenuMode.HOVER && !temporaryHoverClose) {
        return;
      }

      if (open) {
        setIsInsideContent(true);
      } else {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
          hoverTimeoutRef.current = null;
        }

        hoverTimeoutRef.current = setTimeout(() => {
          if (!open) {
            setOpen(true);
          }

          setIsInsideContent(true);
        }, hoverOpenDelay);
      }
    };

    const handleMouseLeave = () => {
      if (mode !== ContextMenuMode.HOVER && !temporaryHoverClose) {
        return;
      }

      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }

      setIsInsideContent(false);
    };

    return (
      <ContextMenuProvider
        triggerRef={triggerRef}
        hoverCloseDelay={hoverCloseDelay}
        hoverOpenDelay={hoverOpenDelay}
        enableTemporaryHoverClose={() => {
          setIsInsideContent(true);
          setTemporaryHoverClose(true);
        }}
        mode={mode}
      >
        <RadixDropdownMenuRoot
          onOpenChange={handleOpenChange}
          open={open}
          modal={false}
          {...props}
        >
          <div
            ref={ref}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {children}
          </div>
        </RadixDropdownMenuRoot>
      </ContextMenuProvider>
    );
  }
) as ContextMenuType;

ContextMenu.displayName = DISPLAY_NAME;

ContextMenu.Root = ContextMenu;
ContextMenu.Trigger = Trigger;
ContextMenu.Content = Content;
ContextMenu.Portal = Portal;
ContextMenu.Sub = Sub;
ContextMenu.SubTrigger = SubTrigger;
ContextMenu.SubContent = SubContent;
ContextMenu.SubSelect = SubSelect;
ContextMenu.Arrow = Arrow;
ContextMenu.Item = Item;
ContextMenu.ItemRightSlot = ItemRightSlot;
ContextMenu.MetaItem = MetaItem;
ContextMenu.Group = Group;
ContextMenu.Label = Label;
ContextMenu.CheckboxItem = CheckboxItem;
ContextMenu.RadioGroup = RadioGroup;
ContextMenu.RadioItem = RadioItem;
ContextMenu.ItemIndicator = ItemIndicator;
ContextMenu.Separator = Separator;
