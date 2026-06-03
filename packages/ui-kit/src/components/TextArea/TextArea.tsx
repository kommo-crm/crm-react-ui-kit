import React, { forwardRef } from 'react';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { noop } from 'src/utils';

import { mergeRefs } from 'src/lib/utils';

import { CustomScrollClassName } from 'src/stylesheets/utils/BaseClasses';

import { Text } from '../Text/Text';

import { TextPrimaryTheme } from '../Text/Text.themes';

import { useAutosizeTextarea } from './hooks';

import { type TextAreaProps } from './TextArea.props';
import { type TextAreaTheme } from './TextArea.themes';

import s from './TextArea.module.css';

type I = HTMLTextAreaElement;

export const TextArea = forwardRef<I, TextAreaProps>((props, ref) => {
  const {
    className = '',
    isDisabled,
    isReadOnly,
    isInvalid = false,
    isAutosized = false,
    isPlaceholderVisibleOnFocus = false,
    invalidDescription,
    onAutosize = noop,
    maxHeight,
    value,
    theme,
    ...rest
  } = props;

  const themeClassName = useThemeClassName<TextAreaTheme>(theme);

  const resizeElementRef = useAutosizeTextarea(onAutosize, isAutosized, [
    value,
    isAutosized,
  ]);

  return (
    <div className={cx(s.wrapper, themeClassName, className)}>
      <div
        className={cx(s.textarea_container, {
          [s.invalid]: isInvalid,
          [s.disabled]: isDisabled,
        })}
      >
        <textarea
          style={{ maxHeight }}
          ref={mergeRefs(resizeElementRef, ref)}
          className={cx(CustomScrollClassName, s.textarea, {
            [s.placeholder_visible]: isPlaceholderVisibleOnFocus,
          })}
          disabled={isDisabled}
          readOnly={isReadOnly}
          value={value}
          {...rest}
        />
      </div>
      {Boolean(isInvalid && invalidDescription) && (
        <Text
          className={cx(s.invalid_description)}
          size="m"
          theme={TextPrimaryTheme}
        >
          {invalidDescription}
        </Text>
      )}
    </div>
  );
});

TextArea.displayName = 'TextArea';
