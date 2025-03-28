import React from 'react';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { useCheckboxGroupContext } from '../../CheckboxGroup.context';

import { CheckboxItemRootProvider, DISPLAY_NAME } from './ItemRoot.context';
import { type ItemRootThemeType } from './ItemRoot.themes';
import { type ItemRootProps } from './ItemRoot.props';

import s from './ItemRoot.module.css';

export const ItemRoot: React.FC<ItemRootProps> = ({
  children,
  theme,
  className,
  name,
  value,
  ...checkboxProps
}) => {
  const themeClassName = useThemeClassName<ItemRootThemeType>(theme);

  const { isDisabled, register } = useCheckboxGroupContext(DISPLAY_NAME);

  return (
    <CheckboxItemRootProvider value={value} {...register(name, checkboxProps)}>
      <div
        className={cx(s.item_root, themeClassName, className, {
          /**
           * If `isDisabled` was passed directly to the component
           * Blocking a specific Checkbox.
           *
           * If passed to the CheckboxGroup component
           * We block all Checkboxes.
           */
          [s.disabled]: isDisabled || checkboxProps.isDisabled,
        })}
      >
        {children}
      </div>
    </CheckboxItemRootProvider>
  );
};

ItemRoot.displayName = DISPLAY_NAME;
