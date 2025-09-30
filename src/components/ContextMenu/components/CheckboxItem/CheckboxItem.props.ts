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
   * A function for checking the presence of an icon.
   *
   * By default, the `hasItemIcon` from utils is used.
   */
  hasIconCheckFn?: (children: React.ReactNode) => boolean;
  /**
   * Whether the CheckboxItem should close the menu when clicked.
   */
  isCloseMenuOnClick?: boolean;
  /**
   * Whether the CheckboxItem should close the root menu when clicked.
   */
  isCloseWithRootMenu?: boolean;
};
