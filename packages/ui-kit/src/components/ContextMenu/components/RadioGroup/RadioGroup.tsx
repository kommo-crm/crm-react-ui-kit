import React from 'react';
import { RadioGroup as RadixDropdownMenuRadioGroup } from '@radix-ui/react-dropdown-menu';

import { RadioGroupProps } from './RadioGroup.props';

export const DISPLAY_NAME = 'ContextMenu.RadioGroup';

export const RadioGroup = (props: RadioGroupProps) => {
  const { onChange, ...rest } = props;

  const handleValueChange = (value: string) => {
    onChange?.(value);
  };

  return (
    <RadixDropdownMenuRadioGroup {...rest} onValueChange={handleValueChange} />
  );
};

RadioGroup.displayName = DISPLAY_NAME;
