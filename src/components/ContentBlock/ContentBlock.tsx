import React, { forwardRef } from 'react';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { type ContentBlockProps } from './ContentBlock.props';
import { ContentBlockThemeType } from './ContentBlock.themes';

import s from './ContentBlock.module.css';

type D = HTMLDivElement;

export const ContentBlock = forwardRef<D, ContentBlockProps>((props, ref) => {
  const { className = '', theme, children, ...rest } = props;

  const themeClassName = useThemeClassName<ContentBlockThemeType>(theme);

  return (
    <div ref={ref} className={cx(s.block, themeClassName, className)} {...rest}>
      {children}
    </div>
  );
});

ContentBlock.displayName = 'ContentBlock';
