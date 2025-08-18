import React from 'react';
import { RadioGroup as RadixDropdownMenuRadioGroup } from '@radix-ui/react-dropdown-menu';

import { RadioGroupProps } from './RadioGroup.props';

const DISPLAY_NAME = 'ContextMenu.RadioGroup';

export const RadioGroup = ({
  onChange,
  ...rest
}: RadioGroupProps): JSX.Element => {
  const handleValueChange = (value: string) => {
    if (onChange) {
      const syntheticEvent = {
        target: { value },
      } as React.ChangeEvent<HTMLInputElement>;

      onChange(syntheticEvent);
    }
  };

  return (
    <RadixDropdownMenuRadioGroup {...rest} onValueChange={handleValueChange} />
  );
};

RadioGroup.displayName = DISPLAY_NAME;
