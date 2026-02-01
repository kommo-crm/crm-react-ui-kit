import type { ComponentPropsWithoutRef } from 'react';
import type { CheckboxItem as RadixDropdownMenuCheckboxItem } from '@radix-ui/react-dropdown-menu';

type RadixCheckboxItemProps = Omit<
  ComponentPropsWithoutRef<typeof RadixDropdownMenuCheckboxItem>,
  'disabled' | 'checked'
>;

export type CheckboxItemProps = RadixCheckboxItemProps & {
  /**
   * Callback that fires when the checked state changes.
   * Mimics the native input `onChange` event pattern.
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Whether the CheckboxItem is disabled.
   */
  isDisabled?: boolean;
  /**
   * Whether the CheckboxItem is checked.
   */
  isChecked?: boolean;
  /**
   * Whether the CheckboxItem should close the current menu when selected.
   *
   * @default true
   */
  shouldCloseCurrentMenuOnSelect?: boolean;
  /**
   * Whether the CheckboxItem should close the root menu when selected.
   *
   * @default true
   */
  shouldCloseRootMenuOnSelect?: boolean;
};
