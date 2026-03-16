import { type VisuallyHiddenInputProps } from 'src/components/VisuallyHiddenInput/VisuallyHiddenInput.props';

import { type LabelProps } from 'src/components/Label';

import { type CheckboxThemeType } from './Checkbox.themes';

export type CheckedStyleType = 'mark' | 'indeterminate';

export type BaseCheckboxProps = {
  /**
   * Type of icon.
   *
   * @default mark
   */
  checkedStyle?: CheckedStyleType;
  /**
   * Indicates if the checkbox is invalid.
   *
   * If `true`, applies corresponding styles.
   * @default false
   */
  isInvalid?: boolean;
  /**
   * Object with CSS properties of the theme.
   */
  theme: CheckboxThemeType;
};

export type CheckboxProps = VisuallyHiddenInputProps<BaseCheckboxProps>;

export type CheckboxType = React.ForwardRefExoticComponent<
  CheckboxProps & React.RefAttributes<HTMLInputElement>
> & {
  /**
   * Label component.
   */
  Label: React.ForwardRefExoticComponent<
    LabelProps & React.RefAttributes<HTMLLabelElement>
  >;
};
