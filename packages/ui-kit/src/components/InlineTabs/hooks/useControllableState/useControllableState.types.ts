/**
 * Options for the `useControllableState` hook.
 */
export interface UseControllableStateOptions<T> {
  /**
   * Controlled value; `undefined` makes the state uncontrolled.
   */
  value: T | undefined;
  /**
   * Initial value of the uncontrolled state.
   */
  defaultValue: T | undefined;
  /**
   * Called with a new value in both modes.
   */
  onChange?: (value: T) => void;
}

/**
 * Current value and its setter.
 */
export type UseControllableStateResult<T> = [
  value: T | undefined,
  setValue: (value: T) => void,
];
