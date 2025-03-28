import React, { forwardRef } from 'react';
import cx from 'classnames';

import ChevronDownIcon from 'src/icons/chevronDown.svg';
import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { Text } from '../../../Text/Text';
import { TextPrimaryTheme } from '../../../Text/Text.themes';
import { useAccordionContext } from '../../Accordion.context';

import { type ItemProps } from './Item.props';
import { AccordionItemThemeType } from './Item.themes';

import s from './Item.module.css';

type D = HTMLDivElement;

const DISPLAY_NAME = 'Accordion.Item';

export const Item = forwardRef<D, ItemProps>((props, ref) => {
  const {
    theme,
    children,
    value,
    title,
    before = null,
    className = '',
    ...rest
  } = props;

  const themeClassName = useThemeClassName<AccordionItemThemeType>(theme);

  const { onChange, value: currentValue } = useAccordionContext(DISPLAY_NAME);

  const handleClick = () => {
    onChange(value);
  };

  const isActive = Array.isArray(currentValue)
    ? currentValue.includes(value)
    : currentValue === value;

  return (
    <div
      ref={ref}
      className={cx(
        s.wrapper,
        {
          [s.active]: isActive,
        },
        themeClassName,
        className
      )}
      {...rest}
    >
      <div className={cx(s.header)} onClick={handleClick}>
        <div className={cx(s.header_left)}>
          {before && <div className={cx(s.before_title)}>{before}</div>}

          <Text theme={TextPrimaryTheme} size="xl" isEllipsis>
            {title}
          </Text>
        </div>

        <span className={cx(s.chevron_container)}>
          <ChevronDownIcon className={cx(s.chevron_icon)} />
        </span>
      </div>

      <div className={cx(s.content)}>{children}</div>
    </div>
  );
});

Item.displayName = DISPLAY_NAME;
