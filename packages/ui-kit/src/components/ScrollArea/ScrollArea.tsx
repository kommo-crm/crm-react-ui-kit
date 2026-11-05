import React, { forwardRef, useMemo } from 'react';
import cx from 'classnames';
import * as RadixScrollArea from '@radix-ui/react-scroll-area';

import { useThemeClassName } from '@ui-kit/hooks/useThemeClassName';

import { mergeRefs } from '@ui-kit/lib/utils';

import { useScrollVisibility } from './hooks';

import { type ScrollAreaProps } from './ScrollArea.props';
import { type ScrollAreaThemeType } from './ScrollArea.themes';

import s from './ScrollArea.module.css';

type El = HTMLDivElement;

export const ScrollArea = forwardRef<El, ScrollAreaProps>((props, ref) => {
  const {
    className = '',
    style,
    theme,
    type = 'auto',
    scrollHideDelay = 600,
    isScrollbarHidden = false,
    isFadeEnabled = false,
    onScrollVisibilityChange,
    onScroll,
    children,
    ...rest
  } = props;

  const themeClassName = useThemeClassName<ScrollAreaThemeType>(theme);

  const isVisibilityTracked =
    isFadeEnabled || Boolean(onScrollVisibilityChange);

  const {
    isContentClippedAtTop,
    isContentClippedAtBottom,
    viewportRef,
    updateVisibility,
  } = useScrollVisibility({
    isEnabled: isVisibilityTracked,
    onChange: onScrollVisibilityChange,
  });

  /**
   * A new merged callback on every render would make React detach
   * and reattach every ref, including the consumer's one.
   */
  const mergedViewportRef = useMemo(
    () => mergeRefs(viewportRef, ref),
    [viewportRef, ref]
  );

  const handleScroll = (event: React.UIEvent<El>) => {
    onScroll?.(event);
    updateVisibility();
  };

  return (
    <RadixScrollArea.Root
      className={cx(s.scroll_area, themeClassName, className)}
      style={style}
      type={type}
      scrollHideDelay={scrollHideDelay}
      data-fade-top={(isFadeEnabled && isContentClippedAtTop) || undefined}
      data-fade-bottom={
        (isFadeEnabled && isContentClippedAtBottom) || undefined
      }
    >
      <RadixScrollArea.Viewport
        ref={mergedViewportRef}
        className={s.viewport}
        onScroll={handleScroll}
        {...rest}
      >
        {children}
      </RadixScrollArea.Viewport>
      <RadixScrollArea.Scrollbar
        orientation="vertical"
        className={cx(s.scrollbar, {
          [s.scrollbar_hidden]: isScrollbarHidden,
        })}
      >
        <RadixScrollArea.Thumb className={s.thumb} />
      </RadixScrollArea.Scrollbar>
    </RadixScrollArea.Root>
  );
});

ScrollArea.displayName = 'ScrollArea';
