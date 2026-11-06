import React, { forwardRef } from 'react';
import cx from 'classnames';

import { useThemeClassName } from '@ui-kit/hooks/useThemeClassName';

import { type SkeletonProps } from './Skeleton.props';
import { type SkeletonTheme } from './Skeleton.themes';

import s from './Skeleton.module.css';

/**
 * Placeholder shown in place of the content while it is loading.
 */
export const Skeleton = forwardRef<HTMLElement, SkeletonProps>((props, ref) => {
  const {
    as: Tag = 'div',
    isLoading = true,
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
    className,
    style,
    theme,
    children,
    ...rest
  } = props;

  const themeClassName = useThemeClassName<SkeletonTheme>(theme);

  const rootStyle: React.CSSProperties = {
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
    ...style,
  };

  const rootClassName = cx(
    {
      [s.inline]: Tag === 'span',
      [s.skeleton]: isLoading,
      [themeClassName]: isLoading,
    },
    className
  );

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      aria-hidden={isLoading || undefined}
      className={rootClassName}
      style={rootStyle}
      {...rest}
    >
      {isLoading && <span className={s.layer} />}
      {children}
    </Tag>
  );
});

Skeleton.displayName = 'Skeleton';
