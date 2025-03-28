import React, { forwardRef, KeyboardEvent } from 'react';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { noop } from 'src/utils';

import { SelectButtonProps } from './SelectButton.props';
import { SelectButtonThemeType } from './SelectButton.theme';

import s from './SelectButton.module.css';

const ENTER = 'Enter';
const SPACEBAR = 'Space';

type D = HTMLButtonElement;

export const SelectButton = forwardRef<D, SelectButtonProps>((props, ref) => {
  const {
    theme,
    className,
    onToggle = noop,
    isInvalid = false,
    isDisabled = false,
    children,
    ...rest
  } = props;

  const themeClassName = useThemeClassName<SelectButtonThemeType>(theme);

  const handleClick = () => {
    onToggle();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if ([ENTER, SPACEBAR].includes(e.code)) {
      e.preventDefault();

      onToggle();
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      className={cx(
        s.button,
        themeClassName,
        {
          [s.invalid]: isInvalid,
          [s.disabled]: isDisabled,
        },
        className
      )}
      disabled={isDisabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {children}
    </button>
  );
});

SelectButton.displayName = 'SelectButton';
