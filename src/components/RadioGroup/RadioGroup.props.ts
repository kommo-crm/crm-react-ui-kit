import React, { HTMLAttributes } from 'react';

import { type LabelProps } from 'src/components/Label';

import { type RadioGroupThemeType } from './RadioGroup.themes';
import { type RadioProps } from './components/Radio';
import { type ItemRootProps } from './components/ItemRoot';

export type LabelGroupOrientation = 'horizontal' | 'vertical';

type RadioGroupBaseProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'disabled'
>;

export type RadioContextProps = {
  /**
   * Currently selected value.
   */
  value?: string;
  /**
   * The initial selected value of the Radio button.
   * Applies to a single Radio button.
   *
   * Used for the Uncontrolled RadioGroup.
   */
  defaultValue?: string;
  /**
   * `name` attribute for `Radio`.
   *
   * Automatically applied to all Radio buttons.
   */
  name: string;
  /**
   * `disabled` attribute for `Radio`.
   *
   * Automatically applied to all Radio buttons.
   */
  isDisabled?: boolean;
  /**
   * Handler for the selected value.
   *
   * Automatically applied to all Radio buttons.
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type RadioGroupProps = RadioGroupBaseProps &
  Omit<RadioContextProps, 'onChange'> & {
    onChange: (value: string) => void;
    /**
     * Object with CSS theme properties.
     */
    theme: RadioGroupThemeType;
    /**
     * Responsible for vertical or horizontal alignment of RadioGroup.
     */
    orientation?: LabelGroupOrientation;
  };

export type RadioGroupType = React.ForwardRefExoticComponent<
  RadioGroupProps & React.RefAttributes<HTMLDivElement>
> & {
  /**
   * Radio component.
   */
  Radio: React.ForwardRefExoticComponent<
    RadioProps & React.RefAttributes<HTMLInputElement>
  >;
  /**
   * Label component.
   */
  Label: React.ForwardRefExoticComponent<
    LabelProps & React.RefAttributes<HTMLLabelElement>
  >;
  /**
   * ItemRoot component.
   */
  ItemRoot: React.FC<ItemRootProps>;
};
