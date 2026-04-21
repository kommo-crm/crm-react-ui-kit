import { type VisuallyHiddenInputProps } from '@/components/VisuallyHiddenInput/VisuallyHiddenInput.props';

import { type LabelProps } from '@/components/Label';

import { type SwitcherTheme } from './Switcher.themes';

type BaseSwitcherProps = {
  /**
   * Object with CSS properties of the theme.
   */
  theme: SwitcherTheme;
};

export type SwitcherProps = VisuallyHiddenInputProps<BaseSwitcherProps>;

export type SwitcherType = React.ForwardRefExoticComponent<
  SwitcherProps & React.RefAttributes<HTMLInputElement>
> & {
  /**
   * Label component.
   */
  Label: React.ForwardRefExoticComponent<
    LabelProps & React.RefAttributes<HTMLLabelElement>
  >;
};
