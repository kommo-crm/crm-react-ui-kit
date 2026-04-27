import { type BaseInputProps } from '../BaseInput/BaseInput.props';

import { type InlineInputTheme } from './InlineInput.themes';

export interface InlineInputProps extends BaseInputProps {
  /**
   * Valid value is entered or not.
   *
   * If true, the appropriate styles will be applied.
   * @default false
   */
  isInvalid?: boolean;
  /**
   * Error message
   */
  invalidDescription?: string;
  /**
   * Adds an icon on the right.
   */
  after?: React.ReactNode;
  /**
   * Object with CSS properties of the theme.
   */
  theme: InlineInputTheme;
}
