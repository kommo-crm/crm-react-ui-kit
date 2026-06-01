import React, { forwardRef } from 'react';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { Label } from 'src/components/Label';

import { type RadioGroupType, type RadioGroupProps } from './RadioGroup.props';
import { RadioGroupProvider, DISPLAY_NAME } from './RadioGroup.context';
import { type RadioGroupThemeType } from './RadioGroup.themes';

import { ItemRoot } from './components/ItemRoot';
import { Radio } from './components/Radio';

import s from './RadioGroup.module.css';

type D = HTMLDivElement;

export const RadioGroup = forwardRef<D, RadioGroupProps>((props, ref) => {
  const {
    className,
    onChange,
    value,
    name,
    defaultValue,
    isDisabled = false,
    orientation = 'vertical',
    theme,
    children,
    ...rest
  } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const themeClassName = useThemeClassName<RadioGroupThemeType>(theme);

  return (
    <RadioGroupProvider
      name={name}
      value={value}
      defaultValue={defaultValue}
      onChange={handleChange}
      isDisabled={isDisabled}
    >
      <div
        className={cx(s.radiogroup, themeClassName, className, {
          [s.horizontal]: orientation === 'horizontal',
        })}
        role="radiogroup"
        ref={ref}
        {...rest}
      >
        {children}
      </div>
    </RadioGroupProvider>
  );
}) as RadioGroupType;

RadioGroup.displayName = DISPLAY_NAME;

RadioGroup.Label = Label;
RadioGroup.ItemRoot = ItemRoot;
RadioGroup.Radio = Radio;
