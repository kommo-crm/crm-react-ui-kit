import React from 'react';
import { RadioGroup as RadixDropdownMenuRadioGroup } from '@radix-ui/react-dropdown-menu';

import { RadioGroupProps } from './RadioGroup.props';
import { RadioGroupProvider, DISPLAY_NAME } from './RadioGroup.context';

export const RadioGroup = (props: RadioGroupProps): JSX.Element => {
  const { onChange, ...rest } = props;

  const handleValueChange = (value: string) => {
    if (onChange) {
      const syntheticEvent = {
        target: { value },
      } as React.ChangeEvent<HTMLInputElement>;

      onChange(syntheticEvent);
    }
  };

  return (
    <RadioGroupProvider onChange={handleValueChange}>
      <RadixDropdownMenuRadioGroup
        {...rest}
        onValueChange={handleValueChange}
      />
    </RadioGroupProvider>
  );
};

RadioGroup.displayName = DISPLAY_NAME;
