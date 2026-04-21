import { TextAreaTheme } from './TextArea.themes';

type TextArea = Omit<
  React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >,
  'disabled' | 'readOnly'
>;

export interface TextAreaProps extends TextArea {
  /**
   * Valid value is entered or not.
   *
   * If true the appropriate styles will be applied.
   * @default false
   */
  isInvalid?: boolean;
  /**
   * Error text.
   *
   * Used with `isInvalid: true`.
   */
  invalidDescription?: string;
  /**
   * Callback for resizing fields.
   *
   * Used with `isAutosized: true`.
   */
  onAutosize?: () => void;
  /**
   * Automatically adjust the field size.
   * @default false
   */
  isAutosized?: boolean;
  /**
   * Maximum field height.
   */
  maxHeight?: number;
  /**
   * Is `placeholder` should be visible when TextArea in `focus`.
   *
   * If true the appropriate styles will be applied.
   * @default false
   */
  isPlaceholderVisibleOnFocus?: boolean;
  /**
   * `disabled` status.
   */
  isDisabled?: boolean;
  /**
   * `readonly` status.
   */
  isReadOnly?: boolean;
  /**
   * Object with CSS properties of the theme.
   */
  theme: TextAreaTheme;
}
