import React, { forwardRef } from 'react';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { Text } from 'src/components/Text';

import MetaItemDefaultCopyIcon from 'src/icons/copyButton.svg';

import { TextContextMenuTheme } from '../Text';

import { copyToClipboard } from '../../utils';

import { useContextMenuContext } from '../../ContextMenu.context';

import { useLevelProviderContext } from '../LevelProvider';

import type { MetaItemProps } from './MetaItem.props';

import s from './MetaItem.module.css';

const DISPLAY_NAME = 'ContextMenu.MetaItem';

export const MetaItem = forwardRef<HTMLDivElement, MetaItemProps>(
  (
    {
      theme,
      className,
      children,
      icon,
      copyIcon,
      label,
      value,
      separator = ':',
      isCopyable,
      onCopy,
      ...props
    },
    ref
  ) => {
    const { disableItemIconAlign } = useContextMenuContext(DISPLAY_NAME);
    const { hasItemWithIcon } = useLevelProviderContext(DISPLAY_NAME);

    const themeClassName = useThemeClassName(theme);

    const handleCopy = () => (onCopy ? onCopy(value) : copyToClipboard(value));
    const CopyIcon = copyIcon || MetaItemDefaultCopyIcon;

    return (
      <div
        ref={ref}
        className={cx(s.meta_item, themeClassName, className)}
        data-no-icon-align={
          icon || (!disableItemIconAlign && !hasItemWithIcon) ? '' : undefined
        }
        {...props}
      >
        {icon}
        <div className={cx(s.wrapper)}>
          <Text theme={TextContextMenuTheme} size="l">
            <span className={cx(s.label)}>
              {label}
              {separator}
            </span>
            {value}
          </Text>
          {isCopyable && (
            <CopyIcon className={cx(s.copy_icon)} onClick={handleCopy} />
          )}
        </div>
        {children}
      </div>
    );
  }
);

MetaItem.displayName = DISPLAY_NAME;
