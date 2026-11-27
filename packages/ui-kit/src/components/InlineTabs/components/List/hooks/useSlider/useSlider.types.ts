import type React from 'react';

/**
 * Options for the `useSlider` hook.
 */
export interface UseSliderOptions {
  /**
   * The panel of the tabs; the slider is positioned inside it.
   */
  panelRef: React.RefObject<HTMLElement>;
  /**
   * Trigger of the selected tab in the panel.
   */
  selectedTabRef: React.RefObject<HTMLElement>;
  /**
   * The overflow button rendered for the current split.
   */
  overflowButtonRef: React.RefObject<HTMLElement>;
  /**
   * Value of the selected tab; a change animates the move.
   */
  value: string | undefined;
  /**
   * Whether the selected tab is in the overflow menu, so the slider goes
   * under the overflow button.
   */
  isSelectedHidden: boolean;
  /**
   * Whether the split is final; a candidate split is never measured.
   */
  isEnabled: boolean;
}

/**
 * Position of the slider under the selected tab.
 */
export interface SliderState {
  /**
   * Offset from the left edge of the panel, in px.
   */
  left: number;
  /**
   * Width of the selected tab or the overflow button, in px.
   */
  width: number;
  /**
   * Whether the move animates: only when the selected tab changes,
   * not when a resize shifts it.
   */
  animated: boolean;
}
