import React, { forwardRef } from 'react';

import cx from 'classnames';

import DropdownArrowIcon from 'src/icons/dropdownArrow.svg';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { ArrowProps } from './Arrow.props';

import s from './Arrow.module.css';

const DISPLAY_NAME = 'Select.Arrow';

type S = HTMLSpanElement;

const BASE_WIDTH = 20;
const BASE_HEIGHT = 20;

export const Arrow = forwardRef<S, ArrowProps>((props, ref) => {
  const {
    theme,
    children = <DropdownArrowIcon width={BASE_WIDTH} height={BASE_HEIGHT} />,
    className,
  } = props;

  const themeClassName = useThemeClassName(theme);

  return (
    <span className={cx(s.wrapper, className, themeClassName)} ref={ref}>
      {children}
    </span>
  );
});

Arrow.displayName = DISPLAY_NAME;
