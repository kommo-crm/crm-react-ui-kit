import React, { forwardRef } from 'react';
import cx from 'classnames';

import { useThemeClassName } from '@ui-kit/hooks/useThemeClassName';

import {
  ScrollArea,
  ScrollAreaSurfaceTheme,
} from '@ui-kit/components/ScrollArea';

import { DropdownListProps } from './DropdownList.props';
import { DropdownListThemeType } from './DropdownList.theme';

import s from './DropdownList.module.css';

type D = HTMLDivElement;

export const DropdownList = forwardRef<D, DropdownListProps>((props, ref) => {
  const {
    className = '',
    theme,
    children,
    isOpened,
    viewportRef,
    onScrollVisibilityChange,
    ...rest
  } = props;

  const themeClassName = useThemeClassName<DropdownListThemeType>(theme);

  return (
    isOpened && (
      <div
        ref={ref}
        className={cx(s.list, themeClassName, className)}
        {...rest}
      >
        <ScrollArea
          ref={viewportRef}
          className={s.scroll_area}
          theme={ScrollAreaSurfaceTheme}
          onScrollVisibilityChange={onScrollVisibilityChange}
        >
          {children}
        </ScrollArea>
      </div>
    )
  );
});

DropdownList.displayName = 'DropdownList';
