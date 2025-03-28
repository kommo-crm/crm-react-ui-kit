import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import { TextArea } from '../TextArea';
import { TextareaLightTheme, TextareaDarkTheme } from '../TextArea.themes';
import { type TextAreaProps } from '../TextArea.props';

export const TextAreaLightPlayground = (
  props: ComponentPlaygroundProps<TextAreaProps>
) => {
  return (
    <ComponentPlayground<TextAreaProps>
      {...props}
      propSets={[
        {
          isDisabled: [true, false],
          placeholder: ['Name', undefined],
          value: ['Jhon', undefined],
        },
        {
          isInvalid: [true],
          invalidDescription: ['Required field'],
          value: ['Jhon', undefined],
          isDisabled: [true, false],
        },
      ]}
    >
      {(itemProps: TextAreaProps) => (
        <TextArea {...itemProps} theme={TextareaLightTheme} />
      )}
    </ComponentPlayground>
  );
};

export const TextAreaDarkPlayground = (
  props: ComponentPlaygroundProps<TextAreaProps>
) => {
  return (
    <ComponentPlayground<TextAreaProps>
      {...props}
      propSets={[
        {
          isDisabled: [true, false],
          placeholder: ['Name', undefined],
          value: ['Jhon', undefined],
        },
        {
          isInvalid: [true],
          invalidDescription: ['Required field'],
          value: ['Jhon', undefined],
          isDisabled: [true, false],
        },
      ]}
    >
      {(itemProps: TextAreaProps) => (
        <TextArea {...itemProps} theme={TextareaDarkTheme} />
      )}
    </ComponentPlayground>
  );
};
