import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import {
  SelectButton,
  SelectButtonProps,
} from '@ui-kit/components/SelectButton';

import { mergeRefs } from '@ui-kit/lib/utils';

import { useSelectContext } from '../../Select.context';
import { getSelectItemTitle } from '../../Select.types';

export type ButtonProps = SelectButtonProps;

const DISPLAY_NAME = 'Select.Button';

type I = HTMLButtonElement;

export const Button = forwardRef<I, ButtonProps>((props, ref) => {
  const { theme, ...rest } = props;
  const {
    isDisabled,
    onOpen,
    isOpened,
    isInvalid,
    value,
    onButtonElementChange,
  } = useSelectContext(DISPLAY_NAME);

  const selectButtonRef = useRef<HTMLButtonElement>(null);

  /**
   * The button is registered as the anchor of the list.
   * A new merged callback on every render would reattach the refs.
   */
  const mergedRef = useMemo(
    () => mergeRefs<I>(selectButtonRef, onButtonElementChange, ref),
    [onButtonElementChange, ref]
  );

  const handleToggle = useCallback(() => {
    onOpen(!isOpened);
  }, [onOpen, isOpened]);

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
      ref={mergedRef}
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
