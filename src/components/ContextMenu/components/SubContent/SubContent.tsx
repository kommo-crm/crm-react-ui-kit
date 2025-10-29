import React, { forwardRef, useLayoutEffect, useState } from 'react';
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

export const SubContent = forwardRef<HTMLDivElement, SubContentProps>(
  (
    {
      className,
      children,
      sideOffset = 4,
      collisionPadding = 10,
      onMouseEnter,
      onMouseLeave,
      onMouseMove,
      alignOffset,
      disableAutoPositioning = false,
      disableRepositioning = false,
      onEscapeKeyDown,

      ...rest
    },
    ref
  ) => {
    const [activeItemId, setActiveItemId] = useState<string | null>(null);

    const {
      animatedOpen,
      onStartAnimation,
      mode,
      onMouseEnter: onMouseEnterContext,
      onMouseLeave: onMouseLeaveContext,
      defaultOpen,
      isOpen,
      triggerRef,
      contentRef,
      onChildOpen,
      onSubRootOpen,
      closeMenuImmediately,
      isCloseOnClick,
      shouldCloseRootMenuOnClick,
    } = useContextMenuSubContext(DISPLAY_NAME);

    const { animationDuration } = useContextMenuContext(DISPLAY_NAME);

    const { level } = useLevelContext(DISPLAY_NAME);

    const { offset, isPositioned: isContentPositioned } = useContentPositioning(
      {
        alignOffset,
        disableAutoPositioning,
        triggerRef,
        contentRef,
        children,
        disableRepositioning,
        isSubContent: true,
      }
    );

    const [hasItemWithIcon, setHasItemWithIcon] = useState(false);
    const [isIconsPositioned, setIsIconsPositioned] = useState(false);

    useLayoutEffect(() => {
      onStartAnimation();
    }, []);

    /**
     * Handles the prerender of the submenu (needed for the icons).
     */
    useLayoutEffect(() => {
      let raf: number;

      if (animatedOpen) {
        setIsIconsPositioned(false);

        raf = requestAnimationFrame(() => {
          setIsIconsPositioned(true);
        });
      } else {
        setIsIconsPositioned(false);
      }

      return () => {
        if (raf) {
          cancelAnimationFrame(raf);
        }
      };
    }, [animatedOpen]);

    const springStyles = useSpring({
      opacity:
        (isContentPositioned && isIconsPositioned && animatedOpen) ||
        defaultOpen !== undefined
          ? 1
          : 0,
      config:
        mode === ContextMenuMode.CLICK || defaultOpen !== undefined
          ? { duration: 0 }
          : { duration: animationDuration, easing: easings.easeInOutCubic },
    });

    return (
      <LevelProvider
        hasItemWithIcon={hasItemWithIcon}
        setHasItemWithIcon={setHasItemWithIcon}
        activeItemId={activeItemId}
        setActiveItemId={setActiveItemId}
        onChildOpen={onChildOpen}
        onSubRootOpen={onSubRootOpen}
        isCloseOnClick={isCloseOnClick}
        closeMenuImmediately={closeMenuImmediately}
        shouldCloseRootMenuOnClick={shouldCloseRootMenuOnClick}
        level={level + 1}
      >
        {isOpen && (
          <animated.div
            style={{
              position: 'fixed',
              zIndex: Number.MAX_SAFE_INTEGER - 10,
              ...springStyles,
            }}
            onMouseEnter={(e) => {
              onMouseEnterContext?.(e);

              onMouseEnter?.(e);
            }}
            onMouseMove={(e) => {
              onMouseEnterContext?.(e);

              onMouseMove?.(e);
            }}
            onMouseLeave={(e) => {
              onMouseLeaveContext?.(e);

              onMouseLeave?.(e);
            }}
            data-content-wrapper
          >
            <RadixDropdownMenuSubContent
              ref={mergeRefs(contentRef, ref)}
              className={cx(s.sub_content, className)}
              sideOffset={sideOffset}
              collisionPadding={collisionPadding}
              alignOffset={offset}
              onEscapeKeyDown={(e) => {
                closeMenuImmediately();

                onEscapeKeyDown?.(e);
              }}
              {...rest}
            >
              {children}
            </RadixDropdownMenuSubContent>
          </animated.div>
        )}
      </LevelProvider>
    );
  }
);

SubContent.displayName = DISPLAY_NAME;
