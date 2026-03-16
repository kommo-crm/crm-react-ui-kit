import React, { forwardRef } from 'react';

import { VisuallyHiddenInput } from 'src/components/VisuallyHiddenInput';

import { useSelectContext } from '../../Select.context';
import { SelectItem } from '../../Select.types';

import Option from '../Option/Option';

import { ValueProps } from './Value.props';

const DISPLAY_NAME = 'Select.Value';

type S = HTMLDivElement;

const shouldShowPlaceholder = (value: SelectItem | undefined) => {
  return !value;
};

export const Value = forwardRef<S, ValueProps>((props, ref) => {
  const { className = '', placeholder = '', name, children } = props;

  const { value } = useSelectContext(DISPLAY_NAME);

  const getContent = () => {
    if (children) {
      return children;
    }

    return (
      <Option className={className} ref={ref}>
        {shouldShowPlaceholder(value) ? placeholder : value?.option}
      </Option>
    );
  };

  return (
    <>
      {getContent()}

      <VisuallyHiddenInput name={name} type="hidden" value={value?.value} />
    </>
  );
});

Value.displayName = DISPLAY_NAME;
