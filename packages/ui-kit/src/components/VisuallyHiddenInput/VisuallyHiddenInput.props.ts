import { type BaseInputProps } from 'src/components/BaseInput';

export type VisuallyHiddenInputBaseProps<T> = Omit<
  BaseInputProps,
  'isPlaceholderVisibleOnFocus'
> &
  T;

export type ControlledVisuallyHiddenInputProps<T> =
  VisuallyHiddenInputBaseProps<T> & {
    /**
     * Checkbox state.
     *
     * Used for a controlled checkbox along with `onChange`.
     */
    isChecked: boolean;
    isDefaultChecked?: never;
  };

export type UncontrolledVisuallyHiddenInputProps<T> =
  VisuallyHiddenInputBaseProps<T> & {
    /**
     * Initial checkbox state.
     *
     * Used for uncontrolled checkbox.
     */
    isDefaultChecked?: boolean;
    isChecked?: never;
  };

export type VisuallyHiddenInputProps<T> =
  | ControlledVisuallyHiddenInputProps<T>
  | UncontrolledVisuallyHiddenInputProps<T>;
