import React from 'react';

import { type ButtonThemeType } from './Button.themes';

type Button = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  'disabled'
>;

export interface ButtonProps extends Button {
  /**
   * Loading state in the button.
   */
  isLoading?: boolean;
  /**
   * `disabled` state.
   */
  isDisabled?: boolean;
  /**
   * Object with CSS theme properties.
   */
  theme: ButtonThemeType;
  /**
   * Adds an icon on the left.
   */
  before?: React.ReactNode;
  /**
   * Adds an icon on the right.
   */
  after?: React.ReactNode;
  /**
   * Ref for the `showSavedState` function, which calls the `saved` state.
   */
  showSuccessfulStateRef?: React.MutableRefObject<
    (onAnimationEnd?: () => void) => void | null
  >;
  /**
   * Ref for the `showInvalidAnimation` function, which calls the `invalid` state.
   */
  showInvalidAnimationRef?: React.MutableRefObject<
    (onAnimationEnd?: () => void) => void | null
  >;
  /**
   * The text displayed at `triggerSavedRef.current()'.
   */
  successfulStateText?: React.ReactNode;
  /**
   * Whether the click on the blocked button will be processed.
   */
  isClickableWhileDisabled?: boolean;
}
