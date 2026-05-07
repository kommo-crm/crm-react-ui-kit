import React, { forwardRef, useCallback, useEffect, useRef } from 'react';

import { SelectButton, SelectButtonProps } from 'src/components/SelectButton';

import { mergeRefs } from 'src/lib/utils';

import { useSelectContext } from '../../Select.context';
import { getSelectItemTitle } from '../../Select.types';

export type ButtonProps = SelectButtonProps;

const DISPLAY_NAME = 'Select.Button';

type I = HTMLButtonElement;

export const Button = forwardRef<I, ButtonProps>((props, ref) => {
  const { theme, ...rest } = props;
  const { isDisabled, onOpen, isOpened, isInvalid, value } =
    useSelectContext(DISPLAY_NAME);

  const selectButtonRef = useRef<HTMLButtonElement>(null);

  const handleToggle = useCallback(() => {
    onOpen(!isOpened);
  }, [onOpen]);

  useEffect(() => {
    return () => {
      /**
       * This is necessary so that after closing the list,
       * the focus remains on the button.
       */
      if (isOpened) {
        selectButtonRef.current?.focus();
      }
    };
  }, [isOpened]);

  /**
   *  Native tooltip for the trigger reflects the currently selected item so the
   *  user can read truncated values without opening the dropdown. Consumer can
   *  still override via `title` prop on <Select.Button>.
   */
  const title = value ? getSelectItemTitle(value) : undefined;

  return (
    <SelectButton
      ref={mergeRefs(selectButtonRef, ref)}
      onToggle={handleToggle}
      title={title}
      theme={theme}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      {...rest}
    />
  );
});

Button.displayName = DISPLAY_NAME;
