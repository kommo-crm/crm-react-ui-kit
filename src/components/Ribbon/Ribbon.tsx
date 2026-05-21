import { forwardRef } from 'react';

import cx from 'classnames';

import React from 'react';

import { useThemeClassName } from 'src/hooks';

import { RibbonProps } from './Ribbon.props';

import { RibbonTheme } from './Ribbon.themes';

import s from './Ribbon.module.css';

type D = HTMLDivElement;

export const Ribbon = forwardRef<D, RibbonProps>((props, ref) => {
  const { text, className = '', theme, offset = 86, children, ...rest } = props;

  const themeClassName = useThemeClassName<RibbonTheme>(theme);

  const ribbonWrapperContent = (
    <div
      style={{
        width: Math.sqrt(2) * offset,
      }}
      className={cx(s.ribbon, themeClassName)}
    >
      <span className={cx(s.text)}>{text}</span>
    </div>
  );

  if (children) {
    return (
      <div ref={ref} className={cx(s.container, className)} {...rest}>
        {children}

        <div
          style={{
            width: offset,
            height: offset,
          }}
          className={cx(s['ribbon-wrapper'], themeClassName)}
        >
          {ribbonWrapperContent}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      style={{
        width: offset,
        height: offset,
      }}
      className={cx(s['ribbon-wrapper'], themeClassName, className)}
      {...rest}
    >
      {ribbonWrapperContent}
    </div>
  );
});

Ribbon.displayName = 'Ribbon';
