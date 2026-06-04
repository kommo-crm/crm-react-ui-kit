import { useLayoutEffect, useRef, useState } from 'react';

import {
  type InternalCheckboxGroupChangeEvent,
  type RegisterHandlerType,
  type CheckboxStateType,
  type UseCheckboxGroupStateArgs,
} from '../CheckboxGroup.props';

export const useCheckboxGroupState = ({
  isDisabled,
  onChange,
}: UseCheckboxGroupStateArgs) => {
  const [state, setState] = useState<Map<string, CheckboxStateType>>(new Map());
  const registeredComponents = useRef<Record<string, boolean>>({});
  const queueComponents = useRef<CheckboxStateType[]>([]);

  const handleChange = (changeEvent: InternalCheckboxGroupChangeEvent) => {
    setState((prev) => {
      const copyState = new Map(prev);

      if (changeEvent.type === 'selectAll' && !isDisabled) {
        const isSomeChecked = Array.from(copyState.values()).some(
          (checkbox) => checkbox.isChecked && !checkbox.isDisabled
        );

        copyState.forEach((checkbox) => {
          if (!checkbox.isDisabled) {
            checkbox.isChecked = !isSomeChecked;
          }
        });
      }

      if (changeEvent.type === 'checkbox' && !isDisabled) {
        const currentCheckbox = copyState.get(changeEvent.name);

        if (currentCheckbox && !currentCheckbox.isDisabled) {
          copyState.set(currentCheckbox.name, {
            ...currentCheckbox,
            isChecked: !currentCheckbox.isChecked,
          });
        }
      }

      onChange([...copyState.values()], changeEvent);

      return copyState;
    });
  };

  useLayoutEffect(() => {
    if (queueComponents.current.length) {
      const queue = queueComponents.current;

      queueComponents.current = [];

      setState((prev) => {
        const copyState = new Map(prev);

        queue.forEach((checkbox) => copyState.set(checkbox.name, checkbox));

        return copyState;
      });
    }
  });

  const register: RegisterHandlerType = (name, options = {}) => {
    if (name !== 'selectAll' && !registeredComponents.current[name]) {
      registeredComponents.current[name] = true;

      queueComponents.current.push({
        name,
        isChecked: Boolean(options.isDefaultChecked),
        isDisabled: Boolean(options.isDisabled),
      });
    }

    return {
      name,
      onChange: handleChange,
      ...options,
    };
  };

  return {
    state,
    register,
  };
};
