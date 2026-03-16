import React, { forwardRef } from 'react';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';
import { isValidRenderValue } from 'src/lib/utils';

import {
  type LabelGroupProps,
  type LabelGroupType,
  type LabelProps,
} from './Label.props';

import { type LabelGroupThemeType, type LabelThemeType } from './Label.theme';

import s from './Label.module.css';

type L = HTMLLabelElement;

const textPlacementMap = {
  top: s.top,
  left: s.left,
  right: s.right,
};

export const Label = forwardRef<L, LabelProps>((props, ref) => {
  const {
    className = '',
    children,
    text,
    theme,
    description,
    textPlacement = 'top',
    isCentered = false,

    ...rest
  } = props;

  const themeClassName = useThemeClassName<LabelThemeType>(theme);

  return (
    <label
      ref={ref}
      className={cx(
        textPlacementMap[textPlacement],
        themeClassName,
        className,
        {
          [s.centered]: isCentered,
        }
      )}
      {...rest}
    >
      {Boolean(isValidRenderValue(text) || isValidRenderValue(description)) && (
        <div className={cx(s.text_container)}>
          {isValidRenderValue(text) && text}
          {isValidRenderValue(description) && (
            <div className={s.text_description}>{description}</div>
          )}
          <div>{true}</div>
        </div>
      )}
      {children}
    </label>
  );
}) as LabelGroupType;

Label.displayName = 'Label';

const Group = forwardRef<HTMLDivElement, LabelGroupProps>((props, ref) => {
  const { children, theme } = props;

  const themeClassName = useThemeClassName<LabelGroupThemeType>(theme);

  return (
    <div ref={ref}>
      {React.Children.map(children, (child) => {
        return <div className={cx(s.wrapper, themeClassName)}>{child}</div>;
      })}
    </div>
  );
});

Group.displayName = 'Group';

Label.Group = Group;
