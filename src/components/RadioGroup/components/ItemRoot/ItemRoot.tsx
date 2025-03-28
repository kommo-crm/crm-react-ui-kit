import React from 'react';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { useRadioGroupContext } from '../../RadioGroup.context';

import { RadioItemRootProvider, DISPLAY_NAME } from './ItemRoot.context';
import { type ItemRootThemeType } from './ItemRoot.themes';
import { type ItemRootProps } from './ItemRoot.props';

import s from './ItemRoot.module.css';

export const ItemRoot: React.FC<ItemRootProps> = ({
  children,
  theme,
  ...rest
}) => {
  const themeClassName = useThemeClassName<ItemRootThemeType>(theme);

  const { isDisabled } = useRadioGroupContext(DISPLAY_NAME);

  return (
    <RadioItemRootProvider {...rest}>
      <div
        className={cx(s.item_root, themeClassName, {
          /**
           * If `isDisabled` was passed directly to the component
           * Blocking a specific Radio button.
           * If passed to the RadioGroup component
           * We block all Radio buttons.
           */
          [s.disabled]: isDisabled || rest.isDisabled,
        })}
      >
        {children}
      </div>
    </RadioItemRootProvider>
  );
};

ItemRoot.displayName = DISPLAY_NAME;
