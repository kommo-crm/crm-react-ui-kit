import { useCallback, useState } from 'react';

import type {
  UseControllableStateOptions,
  UseControllableStateResult,
} from './useControllableState.types';

/**
 * Value that is controlled when `value` is defined and uncontrolled
 * otherwise. The setter calls `onChange` only for a new value and keeps a
 * controlled value as is, so the owner decides whether the change happens.
 */
export const useControllableState = <T>(
  options: UseControllableStateOptions<T>
): UseControllableStateResult<T> => {
  const { value, defaultValue, onChange } = options;

  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const currentValue = isControlled ? value : uncontrolledValue;

  const setValue = useCallback(
    (nextValue: T) => {
      if (nextValue === currentValue) {
        return;
      }

      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }

      onChange?.(nextValue);
    },
    [currentValue, isControlled, onChange]
  );

  return [currentValue, setValue];
};
