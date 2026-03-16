import type { ComponentPropsWithoutRef } from 'react';
import type { RadioGroup as RadixDropdownMenuRadioGroup } from '@radix-ui/react-dropdown-menu';

type RadixRadioGroupProps = Omit<
  ComponentPropsWithoutRef<typeof RadixDropdownMenuRadioGroup>,
  'onValueChange' | 'onChange'
>;

export type RadioGroupProps = RadixRadioGroupProps & {
  /**
   * Callback that fires when the selected radio value changes.
   * Replaces Radix `onValueChange` with native-like `onChange`.
   */
  onChange?: (value: string) => void;
};

export type RadioGroupContextProps = {
  /**
   * Handler for the selected value.
   *
   * Automatically applied to all Radio buttons.
   */
  onChange: (value: string) => void;
};
