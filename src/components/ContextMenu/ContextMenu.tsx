import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Root as RadixDropdownMenuRoot } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { ContextMenuRootProps } from './ContextMenu.props';
import { ContextMenuMode } from './ContextMenu.enums';
import { ContextMenuRootThemeType } from './ContextMenu.theme';
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

import s from './ContextMenu.module.css';

const DISPLAY_NAME = 'ContextMenu';

export const ContextMenu = forwardRef<HTMLDivElement, ContextMenuRootProps>(
  (
    {
      className,
      theme,
      children,
      mode = ContextMenuMode.CLICK,
      autoCloseDelay = 200,
      onOpen,
      ...props
    },
    ref
  ) => {
    const themeClassName = useThemeClassName<ContextMenuRootThemeType>(theme);

    const triggerRef = useRef<HTMLDivElement>(null);
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isInsideTriggerRef = useRef(false);

    const [open, setOpen] = useState(false);
    const [isInsideContent, setIsInsideContent] = useState(false);

    useEffect(() => {
      if (mode !== ContextMenuMode.HOVER || !open) {
        return;
      }

      const clearCloseTimer = () => {
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
          closeTimeoutRef.current = null;
        }
      };

      const startCloseTimer = () => {
        if (!closeTimeoutRef.current) {
          closeTimeoutRef.current = setTimeout(() => {
            setOpen(false);
            setIsInsideContent(false);
            isInsideTriggerRef.current = false;
          }, autoCloseDelay);
        }
      };

      const checkMouse = (e: MouseEvent) => {
        const x = e.clientX;
        const y = e.clientY;
        const triggerRect = triggerRef.current?.getBoundingClientRect();

        isInsideTriggerRef.current = triggerRect
          ? x >= triggerRect.left &&
            x <= triggerRect.right &&
            y >= triggerRect.top &&
            y <= triggerRect.bottom
          : false;

        if (isInsideTriggerRef.current || isInsideContent) {
          clearCloseTimer();
        } else {
          startCloseTimer();
        }
      };

      document.addEventListener('mousemove', checkMouse);

      return () => {
        document.removeEventListener('mousemove', checkMouse);

        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
        }
      };
    }, [mode, open, isInsideContent]);

    const handleOpenChange = (value: boolean) => {
      setOpen(value);

      if (value) {
        onOpen?.(value);
      }
    };

    const handleMouseEnter = () => {
      if (mode !== ContextMenuMode.HOVER) {
        return;
      }

      if (!isInsideTriggerRef.current && !open) {
        setOpen(true);
      }

      setIsInsideContent(true);
    };

    const handleMouseLeave = () => {
      if (mode !== ContextMenuMode.HOVER || isInsideTriggerRef.current) {
        return;
      }

      setIsInsideContent(false);
    };

    return (
      <ContextMenuProvider
        triggerRef={triggerRef}
        autoCloseDelay={autoCloseDelay}
      >
        <RadixDropdownMenuRoot
          onOpenChange={handleOpenChange}
          open={open}
          {...props}
        >
          <div
            ref={ref}
            className={cx(s.root, themeClassName, className)}
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
