import React, {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
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
      animationDuration = 150,
      onOpen,
      open: initialOpen,
      disableLabelOffset = false,
      ...rest
    },
    ref
  ) => {
    const [open, setOpen] = useState(initialOpen || false);
    const [animatedOpen, setAnimatedOpen] = useState(false);
    const [isInsideContent, setIsInsideContent] = useState(false);
    const [temporaryHoverClose, setTemporaryHoverClose] = useState(false);
    const [inheritedArrowColor, setInheritedArrowColor] = useState<
      string | null
    >(null);

    const triggerRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearTimers = () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }

      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };

    const requestClose = () => {
      clearTimers();

      if (mode === ContextMenuMode.HOVER || temporaryHoverClose) {
        setAnimatedOpen(false);

        closeTimerRef.current = setTimeout(() => {
          setOpen(false);
          setIsInsideContent(false);
          setTemporaryHoverClose(false);
        }, animationDuration);
      } else {
        setOpen(false);
        setIsInsideContent(false);
        setTemporaryHoverClose(false);
      }
    };

    const closeImmediately = () => {
      clearTimers();

      setAnimatedOpen(false);
      setOpen(false);
      setIsInsideContent(false);
      setTemporaryHoverClose(false);
    };

    useLayoutEffect(() => {
      if (!open) {
        return;
      }

      const raf = requestAnimationFrame(() => {
        const updateColor = (item: Element) => {
          setInheritedArrowColor(getComputedStyle(item).backgroundColor);
        };

        const resolveTargetItem = () => {
          if (!contentRef.current) {
            return;
          }

          const side = contentRef.current?.dataset.side;
          const align = contentRef.current?.dataset.align;

          if (!side || !align) {
            return;
          }

          const items = Array.from(contentRef.current.children);

          if (!items.length) {
            return;
          }

          let index =
            side === 'bottom' || (side !== 'top' && align === 'start')
              ? 0
              : items.length - 1;

          let targetItem = items[index];

          if (!targetItem) {
            return;
          }

          if (targetItem.hasAttribute('data-arrow')) {
            if (side === 'bottom' || (side !== 'top' && align === 'start')) {
              index += 1;
            } else {
              index -= 1;
            }

            targetItem = items[index];

            if (!targetItem) {
              return;
            }
          }

          if (
            !disableLabelOffset &&
            targetItem.hasAttribute('data-label') &&
            ['left', 'right'].includes(contentRef.current.dataset.side ?? '') &&
            contentRef.current.dataset.align === 'start'
          ) {
            if (side === 'bottom' || (side !== 'top' && align === 'start')) {
              index += 1;
            } else {
              index -= 1;
            }

            targetItem = items[index];

            if (!targetItem) {
              return;
            }
          }

          if (
            (targetItem.hasAttribute('data-wrapper') ||
              targetItem.getAttribute('role') === 'group') &&
            targetItem.children
          ) {
            const targetItemChildren = Array.from(targetItem.children);

            targetItem =
              side === 'bottom' || (side !== 'top' && align === 'start')
                ? targetItemChildren[0]
                : targetItemChildren[targetItemChildren.length - 1];

            if (targetItem.hasAttribute('data-content-wrapper')) {
              targetItem =
                side === 'bottom' || (side !== 'top' && align === 'start')
                  ? targetItemChildren[1]
                  : targetItemChildren[targetItemChildren.length - 2];
            }
          }

          return targetItem.hasAttribute('data-item') ? targetItem : null;
        };

        let itemObserver: MutationObserver | null = null;
        let themeObserver: MutationObserver | null = null;

        const handleUpdate = () => {
          const targetItem = resolveTargetItem();

          if (!targetItem) {
            return;
          }

          updateColor(targetItem);

          itemObserver = new MutationObserver(() => updateColor(targetItem));

          itemObserver.observe(targetItem, {
            attributes: true,
            attributeFilter: [
              'style',
              'class',
              'data-highlighted',
              'data-state',
            ],
          });

          const root = document.documentElement;

          themeObserver = new MutationObserver(() => updateColor(targetItem));

          themeObserver.observe(root, {
            attributes: true,
            attributeFilter: ['data-crm-ui-kit-theme'],
          });
        };

        handleUpdate();

        const content = contentRef.current!;
        const sideAlignObserver = new MutationObserver(handleUpdate);

        sideAlignObserver.observe(content, {
          attributes: true,
          attributeFilter: ['data-side', 'data-align'],
        });

        return () => {
          itemObserver?.disconnect();
          themeObserver?.disconnect();
          sideAlignObserver.disconnect();
        };
      });

      return () => cancelAnimationFrame(raf);
    }, [open]);

    useEffect(() => {
      if (!open || (mode !== ContextMenuMode.HOVER && !temporaryHoverClose)) {
        return;
      }

      if (isInsideContent) {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
          hoverTimeoutRef.current = null;
        }
      } else if (!hoverTimeoutRef.current) {
        hoverTimeoutRef.current = setTimeout(() => {
          requestClose();
        }, hoverCloseDelay);
      }
    }, [mode, open, isInsideContent, temporaryHoverClose, hoverCloseDelay]);

    const handleOpenChange = (value: boolean) => {
      if (mode === ContextMenuMode.CLICK && initialOpen !== undefined) {
        return;
      }

      if (value) {
        if (closeTimerRef.current) {
          clearTimeout(closeTimerRef.current);
          closeTimerRef.current = null;
        }

        if (mode === ContextMenuMode.HOVER || temporaryHoverClose) {
          setAnimatedOpen(true);
        }

        setOpen(true);
        onOpen?.(true);
      } else {
        requestClose();
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

        if (open) {
          setIsInsideContent(true);
        } else {
          if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
          }

          setAnimatedOpen(true);
          setOpen(true);
          setIsInsideContent(true);
        }
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
        contentRef={contentRef}
        inheritedArrowColor={inheritedArrowColor}
        hoverCloseDelay={hoverCloseDelay}
        temporaryHoverClose={temporaryHoverClose}
        enableTemporaryHoverClose={() => {
          setAnimatedOpen(true);
          setIsInsideContent(true);
          setTemporaryHoverClose(true);
        }}
        mode={mode}
        animatedOpen={animatedOpen}
        animationDuration={animationDuration}
        closeMenuImmediately={closeImmediately}
        disableLabelOffset={disableLabelOffset}
      >
        <RadixDropdownMenuRoot
          onOpenChange={handleOpenChange}
          open={open}
          modal={false}
          {...rest}
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
