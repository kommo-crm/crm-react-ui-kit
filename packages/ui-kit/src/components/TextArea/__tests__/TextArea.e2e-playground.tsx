import React, { useLayoutEffect, useRef } from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from '@ui-kit/tests/e2e/ComponentPlayground';

import { TextArea } from '../TextArea';
import { TextareaLightTheme, TextareaDarkTheme } from '../TextArea.themes';
import { type TextAreaProps } from '../TextArea.props';

export interface TextAreaTestProps extends TextAreaProps {
  /**
   * Scroll offset of the textarea content.
   */
  scrollPosition?: 'start' | 'middle' | 'end';
}

const TextAreaTestItem = (props: TextAreaTestProps) => {
  const { scrollPosition = 'start', ...rest } = props;

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const scroll = async () => {
      /**
       * Font swap changes scrollHeight, so the offset is measured after it
       */
      await document.fonts.ready;

      const textarea = textareaRef.current;

      if (!textarea) {
        return;
      }

      const maxScrollTop = textarea.scrollHeight - textarea.clientHeight;

      textarea.scrollTop = {
        start: 0,
        middle: Math.round(maxScrollTop / 2),
        end: maxScrollTop,
      }[scrollPosition];
    };

    scroll();
  }, [scrollPosition]);

  return <TextArea {...rest} ref={textareaRef} />;
};

export const TextAreaLightPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<TextAreaTestProps>) => (
  <ComponentPlayground<TextAreaTestProps> appearance={appearance} props={props}>
    {(p) => <TextAreaTestItem {...p} theme={TextareaLightTheme} />}
  </ComponentPlayground>
);

export const TextAreaDarkPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<TextAreaTestProps>) => (
  <ComponentPlayground<TextAreaTestProps> appearance={appearance} props={props}>
    {(p) => <TextAreaTestItem {...p} theme={TextareaDarkTheme} />}
  </ComponentPlayground>
);
