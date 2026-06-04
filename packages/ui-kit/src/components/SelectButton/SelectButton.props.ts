import { HTMLAttributes } from 'react';

import { SelectButtonThemeType } from './SelectButton.theme';

export interface SelectButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * Object with CSS theme properties.
   */
  theme: SelectButtonThemeType;
  /**
   * Custom CSS class for component.
   */
  className?: string;
  /**
   * Callback that is called when the component is clicked.
   */
  onToggle?: () => void;
  /**
   * Whether the button is invalid.
   *
   * If the value is `true`, the appropriate styles are applied.
   * @default false
   */
  isInvalid?: boolean;
  /**
   * An attribute indicating whether the element is disabled.
   * If `true', the user will not be able to interact with the component.
   */
  isDisabled?: boolean;
}
