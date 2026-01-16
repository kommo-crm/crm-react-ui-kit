import React, { forwardRef, useState } from 'react';
import { SubContent as RadixDropdownMenuSubContent } from '@radix-ui/react-dropdown-menu';
import { useSpring, animated, easings } from '@react-spring/web';
import cx from 'classnames';

import { mergeRefs } from 'src/lib/utils';

import { LevelProvider, useLevelContext } from '../../providers/LevelProvider';

import { useContextMenuSubContext } from '../Sub/Sub.context';

import { useContextMenuContext } from '../../ContextMenu.context';

import { useContentPositioning } from '../../hooks/useContentPositioning/useContentPositioning';

import { ContextMenuMode } from '../../ContextMenu.enums';

import type { SubContentProps } from './SubContent.props';

import s from './SubContent.module.css';

const DISPLAY_NAME = 'ContextMenu.SubContent';

type El = HTMLDivElement;

export const SubContent = forwardRef<El, SubContentProps>((props, ref) => {
  const {
    className,
    children,
    sideOffset = 4,
    collisionPadding = 10,
    alignOffset,
    disableAutoPositioning = false,
    disableRepositioning = false,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onEscapeKeyDown,

    ...rest
  } = props;

  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  const {
    isAnimatedOpen,
    mode,
    defaultOpen,
    isOpen,
    triggerRef,
    contentRef,
    shouldCloseCurrentMenuOnSelect,
    shouldCloseRootMenuOnSelect,
    onContentEnter,
    onContentLeave,
    onChildOpen,
    onSubRootOpen,
    closeMenuImmediately,
    itemWithFocusedInput,
    setItemWithFocusedInput,
    isAimingContentRef,
  } = useContextMenuSubContext(DISPLAY_NAME);

  const { animationDuration } = useContextMenuContext(DISPLAY_NAME);

  const { level } = useLevelContext(DISPLAY_NAME);

  const { offset, isPositioned: isContentPositioned } = useContentPositioning({
    alignOffset,
    triggerRef,
    contentRef,
    children,
    disableAutoPositioning,
    disableRepositioning,
    isSubContent: true,
  });

  const springStyles = useSpring({
    opacity:
      (isContentPositioned && isAnimatedOpen) || defaultOpen !== undefined
        ? 1
        : 0,
    config:
      mode === ContextMenuMode.CLICK || defaultOpen !== undefined
        ? { duration: 0 }
        : { duration: animationDuration, easing: easings.easeInOutCubic },
  });

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    onContentEnter?.(e);

    onMouseEnter?.(e);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    onContentEnter?.(e);

    onMouseMove?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    onContentLeave?.(e);

    onMouseLeave?.(e);
  };

  const handleEscapeKeyDown = (e: KeyboardEvent) => {
    /**
     * Otherwise, it will also close Root.
     */
    e.preventDefault();

    triggerRef.current?.focus();

    closeMenuImmediately();

    onEscapeKeyDown?.(e);
  };

  return (
    <LevelProvider
      activeItemId={activeItemId}
      setActiveItemId={setActiveItemId}
      onChildOpen={onChildOpen}
      onSubRootOpen={onSubRootOpen}
      shouldCloseCurrentMenuOnSelect={shouldCloseCurrentMenuOnSelect}
      closeMenuImmediately={closeMenuImmediately}
      shouldCloseRootMenuOnSelect={shouldCloseRootMenuOnSelect}
      isAnimatedOpen={isAnimatedOpen}
      itemWithFocusedInput={itemWithFocusedInput}
      setItemWithFocusedInput={setItemWithFocusedInput}
      isAimingRef={isAimingContentRef}
      level={level + 1}
    >
      {isOpen && (
        <animated.div
          style={{
            position: 'fixed',
            zIndex: Number.MAX_SAFE_INTEGER - 10,
            ...springStyles,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <RadixDropdownMenuSubContent
            ref={mergeRefs(contentRef, ref)}
            className={cx(s.sub_content, className)}
            sideOffset={sideOffset}
            collisionPadding={collisionPadding}
            alignOffset={offset}
            onEscapeKeyDown={handleEscapeKeyDown}
            data-menu-level={level + 1}
            {...rest}
          >
            {children}
          </RadixDropdownMenuSubContent>
        </animated.div>
      )}
    </LevelProvider>
  );
});

SubContent.displayName = DISPLAY_NAME;
