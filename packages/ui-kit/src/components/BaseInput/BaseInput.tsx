import React, { forwardRef } from 'react';
import cx from 'classnames';

import { type BaseInputProps } from './BaseInput.props';

import s from './BaseInput.module.css';

type I = HTMLInputElement;

export const BaseInput = forwardRef<I, BaseInputProps>((props, ref) => {
  const {
    className = '',
    isDisabled,
    isReadonly,
    isPlaceholderVisibleOnFocus = false,
    ...rest
  } = props;

  return (
    <input
      ref={ref}
      className={cx(
        s.input,
        {
          [s.placeholder_visible]: isPlaceholderVisibleOnFocus,
        },
        className
      )}
      disabled={isDisabled}
      readOnly={isReadonly}
      {...rest}
    />
  );
});

BaseInput.displayName = 'BaseInput';
