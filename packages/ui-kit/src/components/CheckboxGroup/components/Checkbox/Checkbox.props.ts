import { type CheckboxProps as CheckboxCoreProps } from '@ui-kit/components/Checkbox/Checkbox.props';

export type CheckboxProps = Omit<
  CheckboxCoreProps,
  'onChange' | 'value' | 'isDisabled' | 'isChecked' | 'isDefaultChecked'
>;
