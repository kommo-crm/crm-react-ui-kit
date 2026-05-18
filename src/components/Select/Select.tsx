import React, { forwardRef, useCallback, useState } from 'react';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { noop } from 'src/utils';

import { SelectProps, SelectType } from './Select.props';
import { DISPLAY_NAME, SelectProvider } from './Select.context';
import { SelectItem } from './Select.types';

import { Button } from './components/Button';
import { Item } from './components/Item';
import { List } from './components/List';

import { Value } from './components/Value/Value';
import { Arrow } from './components/Arrow/Arrow';

import { SelectRootThemeType } from './Select.theme';

import { Icon } from './components/Icon/Icon';

import Option from './components/Option/Option';

import s from './Select.module.css';

type D = HTMLDivElement;

const BASE_HOVER_INDEX = -1;

export const Select = forwardRef<D, SelectProps>((props, ref) => {
  const {
    theme,
    value: valueProp,
    defaultValue: defaultValueProp,
    onChange = noop,
    onOpenChange = noop,
    className,
    children,
    isDisabled = false,
    isOpen: isOpenProp = false,
    isDefaultOpen = false,
    isInvalid = false,
  } = props;

  const isControlled = 'value' in props;
  const isOpenControlled = 'isOpen' in props;

  const themeClassName = useThemeClassName<SelectRootThemeType>(theme);

  const [isOpened, setIsOpened] = useState(isDefaultOpen);
  const [hoveredIndex, setHoveredIndex] = useState(BASE_HOVER_INDEX);
  const [defaultValue, setDefaultValue] = useState(defaultValueProp);

  const selected = isControlled ? valueProp : defaultValue;
  const isOpen = isOpenControlled ? isOpenProp : isOpened;

  const handleOpen = useCallback(
    (open: boolean) => {
      if (!isDisabled && !isOpenControlled) {
        setIsOpened(open);
        onOpenChange(open);
      }
    },
    [isDisabled, onOpenChange]
  );

  const handleChange = useCallback(
    (item: SelectItem) => {
      if (!isControlled) {
        setDefaultValue(item);
      }

      onChange(item);
      setIsOpened(false);
    },
    [isControlled, onChange]
  );

  const handleHoveredIndexChange = useCallback((index: number) => {
    setHoveredIndex(index);
  }, []);

  return (
    <SelectProvider
      hoveredIndex={hoveredIndex}
      onHoveredIndexChange={handleHoveredIndexChange}
      onChange={handleChange}
      isOpened={isOpen}
      onOpen={handleOpen}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      value={selected}
      defaultValue={defaultValue}
    >
      <div
        className={cx(s.select, themeClassName, className, {
          [s.opened]: isOpen,
        })}
        ref={ref}
      >
        {children}
      </div>
    </SelectProvider>
  );
}) as SelectType;

Select.displayName = DISPLAY_NAME;

Select.Root = Select;
Select.List = List;
Select.Item = Item;
Select.Button = Button;
Select.Value = Value;
Select.Arrow = Arrow;
Select.Icon = Icon;
Select.Option = Option;
