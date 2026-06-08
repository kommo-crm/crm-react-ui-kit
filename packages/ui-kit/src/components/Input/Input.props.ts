import { type BaseInputProps } from '../BaseInput/BaseInput.props';

import { type InputTheme } from './Input.themes';

export type InputInvalidDescriptionPlacement = 'bottom' | 'right';

export interface InputProps extends BaseInputProps {
  /**
   * Valid value is entered or not.
   *
   * If true, the appropriate styles will be applied.
   * @default false
   */
  isInvalid?: boolean;
  /**
   * Adds an icon on the left.
   */
  before?: React.ReactNode;
  /**
   * Adds an icon on the right.
   */
  after?: React.ReactNode;
  /**
   * Error message
   */
  invalidDescription?: string;
  /**
   * Error message
   */
  invalidDescriptionPlacement?: InputInvalidDescriptionPlacement;
  /**
   * Object with CSS properties of the theme.
   */
  theme: InputTheme;
}
