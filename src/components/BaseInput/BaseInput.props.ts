type Input = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'disabled' | 'readonly'
>;

export interface BaseInputProps extends Input {
  /**
   * `disabled` status.
   */
  isDisabled?: boolean;
  /**
   * `readonly` status.
   */
  isReadonly?: boolean;
  /**
   * Is `placeholder` should be visible when Input in `focus`.
   */
  isPlaceholderVisibleOnFocus?: boolean;
}
