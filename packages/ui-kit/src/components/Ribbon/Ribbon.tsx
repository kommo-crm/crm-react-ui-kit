import React, { forwardRef } from 'react';

import cx from 'classnames';

import { useThemeClassName } from '@ui-kit/hooks';

import { RibbonProps } from './Ribbon.props';

import { RibbonTheme } from './Ribbon.themes';

import s from './Ribbon.module.css';

type D = HTMLDivElement;

const SQRT2 = Math.sqrt(2);

export const Ribbon = forwardRef<D, RibbonProps>((props, ref) => {
  const {
    label,
    className,
    theme,
    offset = 86,
    children,
    style = {},
    ...rest
  } = props;

  const themeClassName = useThemeClassName<RibbonTheme>(theme);

  const ribbonWrapperContent = (
    <div
      style={{
        width: SQRT2 * offset,
      }}
      className={cx(s.ribbon, themeClassName)}
    >
      <span className={s.label}>{label}</span>
    </div>
  );

  if (children) {
    return (
      <div
        ref={ref}
        className={cx(s.container, className)}
        style={style}
        {...rest}
      >
        {children}

        <div
          style={{
            width: offset,
            height: offset,
          }}
          className={s['ribbon-wrapper']}
        >
          {ribbonWrapperContent}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      style={{ width: offset, height: offset, ...style }}
      className={cx(s['ribbon-wrapper'], className)}
      {...rest}
    >
      {ribbonWrapperContent}
    </div>
  );
});

Ribbon.displayName = 'Ribbon';
