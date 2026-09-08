import React, { forwardRef, useRef, useState } from 'react';
import { SubContent as RadixDropdownMenuSubContent } from '@radix-ui/react-dropdown-menu';
import { useSpring, animated, easings } from '@react-spring/web';
import cx from 'classnames';

import { mergeRefs } from '@ui-kit/lib/utils';

import { LevelProvider, useLevelContext } from '../../providers/LevelProvider';

import { useContextMenuSubContext } from '../Sub/Sub.context';

import { useContextMenuContext } from '../../ContextMenu.context';

import { useContentPositioning } from '../../hooks/useContentPositioning/useContentPositioning';

import { ContextMenuMode } from '../../ContextMenu.enums';

import type { SubContentProps } from './SubContent.props';

import { FocusOutsideEvent, PointerDownOutsideEvent } from './SubContent.types';

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
    onPointerDownOutside,
    onFocusOutside,

    ...rest
  } = props;

  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  /**
   * Tracks if any child submenu is being aimed at.
   */
  const isChildAimingRef = useRef(false);
  const isChildAiming = () => isChildAimingRef.current;

  const onChildAiming = (aiming: boolean) => {
    isChildAimingRef.current = aiming;
  };

  const {
    isAnimatedOpen,
    mode,
    isControlled,
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
    isAiming,
    onPointerDownOutside: onSubPointerDownOutside,
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
    opacity: (isContentPositioned && isAnimatedOpen) || isControlled ? 1 : 0,
    config:
      mode === ContextMenuMode.CLICK || isControlled
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

  const handlePointerDownOutside = (e: PointerDownOutsideEvent) => {
    e.preventDefault();

    onSubPointerDownOutside?.(e);

    onPointerDownOutside?.(e);
  };

  /**
   * Radix closes the submenu whenever the focus leaves its content, which
   * conflicts with the open state owned by `useContextMenuSub`. The most
   * visible case is `isDefaultOpen`: the parent content autofocuses its first
   * item right after mount, Radix treats that focus as outside the submenu and
   * closes it before it is ever shown.
   *
   * Preventing the default stops that path (`composeEventHandlers` skips
   * Radix's own handler), so closing stays driven by the hook - the same way it
   * already is for the pointer down outside.
   */
  const handleFocusOutside = (e: FocusOutsideEvent) => {
    e.preventDefault();

    onFocusOutside?.(e);
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
      isAiming={isAiming}
      isChildAiming={isChildAiming}
      onChildAiming={onChildAiming}
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
            onPointerDownOutside={handlePointerDownOutside}
            onFocusOutside={handleFocusOutside}
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
