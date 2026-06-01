import React, { forwardRef } from 'react';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';
import { VisuallyHiddenInput } from 'src/components/VisuallyHiddenInput';
import { Label } from 'src/components/Label';

import { isTouchableDevice } from 'src/lib/utils';

import { type CheckboxProps, type CheckboxType } from './Checkbox.props';
import { type CheckboxThemeType } from './Checkbox.themes';

import s from './Checkbox.module.css';

type I = HTMLInputElement;

export const Checkbox = forwardRef<I, CheckboxProps>((props, ref) => {
  const {
    className = '',
    checkedStyle,
    isInvalid,

    theme,

    ...rest
  } = props;

  const themeClassName = useThemeClassName<CheckboxThemeType>(theme);

  return (
    <div
      className={cx(s.wrapper, themeClassName, className, {
        [s.touchable]: isTouchableDevice(),
      })}
    >
      <VisuallyHiddenInput
        className={cx(s.input)}
        ref={ref}
        type="checkbox"
        {...rest}
      />
      <span
        className={cx(s.checkbox, {
          [s.indeterminate]: checkedStyle === 'indeterminate',
          [s.invalid]: isInvalid,
        })}
      />
    </div>
  );
}) as CheckboxType;

Checkbox.displayName = 'Checkbox';

Checkbox.Label = Label;
