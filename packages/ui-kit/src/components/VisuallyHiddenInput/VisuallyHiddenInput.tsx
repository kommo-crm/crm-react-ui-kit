import React, { forwardRef } from 'react';
import cx from 'classnames';

import { BaseInput } from 'src/components/BaseInput/BaseInput';

import { type VisuallyHiddenInputProps } from './VisuallyHiddenInput.props';

import s from './VisuallyHiddenInput.module.css';

type El = HTMLInputElement;
type P<T> = VisuallyHiddenInputProps<T>;

export const VisuallyHiddenInput = forwardRef<El, P<unknown>>((props, ref) => {
  const { className = '', ...rest } = props;

  const getInputPropsBasedOnControlType = () => {
    /**
     * Props for `controlled` state
     */
    if ('isChecked' in rest) {
      const { isChecked, ...controlledProps } = rest;

      return { checked: isChecked, ...controlledProps };
    }

    /**
     * Props for `uncontrolled` state
     */
    const { isDefaultChecked, ...uncontrolledProps } = rest;

    return { defaultChecked: isDefaultChecked, ...uncontrolledProps };
  };

  return (
    <BaseInput
      ref={ref}
      className={cx(s.input, className)}
      {...getInputPropsBasedOnControlType()}
    />
  );
});

VisuallyHiddenInput.displayName = 'VisuallyHiddenInput';
