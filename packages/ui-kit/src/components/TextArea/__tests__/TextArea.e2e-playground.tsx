import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from '@/tests/e2e/ComponentPlayground';

import { TextArea } from '../TextArea';
import { TextareaLightTheme, TextareaDarkTheme } from '../TextArea.themes';
import { type TextAreaProps } from '../TextArea.props';

export const TextAreaLightPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<TextAreaProps>) => (
  <ComponentPlayground<TextAreaProps> appearance={appearance} props={props}>
    {(p) => <TextArea {...p} theme={TextareaLightTheme} />}
  </ComponentPlayground>
);

export const TextAreaDarkPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<TextAreaProps>) => (
  <ComponentPlayground<TextAreaProps> appearance={appearance} props={props}>
    {(p) => <TextArea {...p} theme={TextareaDarkTheme} />}
  </ComponentPlayground>
);
