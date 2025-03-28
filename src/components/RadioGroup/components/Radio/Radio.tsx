import React, { forwardRef } from 'react';
import cx from 'classnames';

import { VisuallyHiddenInput } from 'src/components/VisuallyHiddenInput';
import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { useRadioGroupContext } from '../../RadioGroup.context';
import { useRadioItemRootContext } from '../ItemRoot/ItemRoot.context';

import { type RadioProps } from './Radio.props';
import { type RadioThemeType } from './Radio.themes';

import s from './Radio.module.css';

type I = HTMLInputElement;

const DISPLAY_NAME = 'RadioGroup.Radio';

export const Radio = forwardRef<I, RadioProps>((props, ref) => {
  const { theme, className } = props;

  const themeClassName = useThemeClassName<RadioThemeType>(theme);

  const {
    value: currentValue,
    defaultValue,
    isDisabled,
    ...restRadioGroupContext
  } = useRadioGroupContext(DISPLAY_NAME);

  const {
    value,
    isDisabled: itemRootIsDisabled,
    className: itemRootClassName,
    ...rest
  } = useRadioItemRootContext(DISPLAY_NAME);

  const getPropsBasedOnType = () => {
    if (defaultValue) {
      return {
        isDefaultChecked: defaultValue === value,
        ...restRadioGroupContext,
      };
    }

    return {
      isChecked: currentValue === value,
      ...restRadioGroupContext,
    };
  };

  return (
    <div className={cx(s.wrapper, themeClassName, itemRootClassName)}>
      <VisuallyHiddenInput
        ref={ref}
        className={cx(s.input, className)}
        type="radio"
        value={value}
        isDisabled={isDisabled || itemRootIsDisabled}
        {...getPropsBasedOnType()}
        {...rest}
      />
      <span className={cx(s.radio)} />
    </div>
  );
});

Radio.displayName = DISPLAY_NAME;
