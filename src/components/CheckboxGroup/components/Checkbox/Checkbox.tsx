import React, { forwardRef } from 'react';

import { Checkbox as CheckboxCore } from 'src/components/Checkbox/Checkbox';

import { useCheckboxGroupContext } from '../../CheckboxGroup.context';
import { useCheckboxItemRootContext } from '../ItemRoot/ItemRoot.context';

import { type CheckboxProps } from './Checkbox.props';

type I = HTMLInputElement;

const DISPLAY_NAME = 'CheckboxGroup.Checkbox';

export const Checkbox = forwardRef<I, CheckboxProps>((props, ref) => {
  const { theme, className, ...rest } = props;

  const { values, isDisabled: isGlobalDisabled } =
    useCheckboxGroupContext(DISPLAY_NAME);

  const {
    isDisabled: isItemRootIsDisabled,
    name,
    value,
    onChange,
  } = useCheckboxItemRootContext(DISPLAY_NAME);

  const isDisabled = isGlobalDisabled || isItemRootIsDisabled;

  const isChecked = Boolean(values.get(name || '')?.isChecked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ type: 'checkbox', name: e.target.name });
  };

  return (
    <CheckboxCore
      ref={ref}
      className={className}
      name={name}
      value={value}
      theme={theme}
      onChange={handleChange}
      isChecked={isChecked}
      isDisabled={isDisabled}
      {...rest}
    />
  );
});

Checkbox.displayName = DISPLAY_NAME;
