import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import cx from 'classnames';

import { useThemeClassName } from '@ui-kit/hooks/useThemeClassName';

import { mergeRefs } from '@ui-kit/lib/utils';

import { noop } from '@ui-kit/utils';

import { Text } from '@ui-kit/components/Text';

import { SelectProps, SelectType } from './Select.props';
import { DISPLAY_NAME, SelectProvider } from './Select.context';
import { SelectItem } from './Select.types';

import { Button } from './components/Button';
import { Item } from './components/Item';
import { List } from './components/List';

import { Value } from './components/Value/Value';
import { Arrow } from './components/Arrow/Arrow';

import { SelectInvalidTextTheme, SelectRootThemeType } from './Select.theme';

import { Icon } from './components/Icon/Icon';

import Option from './components/Option/Option';

import { Label } from './components/Label';

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
    invalidDescription,
  } = props;

  const isControlled = 'value' in props;
  const isOpenControlled = 'isOpen' in props;

  const themeClassName = useThemeClassName<SelectRootThemeType>(theme);

  const [isOpened, setIsOpened] = useState(isDefaultOpen);
  const [hoveredIndex, setHoveredIndex] = useState(BASE_HOVER_INDEX);
  const [defaultValue, setDefaultValue] = useState(defaultValueProp);
  const [rootElement, setRootElement] = useState<D | null>(null);
  const [buttonElement, setButtonElement] = useState<HTMLButtonElement | null>(
    null
  );

  /**
   * A new merged callback on every render would make React detach
   * and reattach the refs, including the consumer's one.
   */
  const mergedRef = useMemo(() => mergeRefs<D>(setRootElement, ref), [ref]);

  const selected = isControlled ? valueProp : defaultValue;
  const isOpen = isOpenControlled ? isOpenProp : isOpened;

  /**
   * The open state the last request was made for. One click may request
   * the same state twice (the button toggle and the outside click of the list),
   * the ref keeps onOpenChange from being called twice before the rerender.
   */
  const isOpenRef = useRef(isOpen);

  isOpenRef.current = isOpen;

  const handleOpen = useCallback(
    (open: boolean) => {
      if (isDisabled || open === isOpenRef.current) {
        return;
      }

      isOpenRef.current = open;

      if (!isOpenControlled) {
        setIsOpened(open);
      }

      onOpenChange(open);
    },
    [isDisabled, isOpenControlled, onOpenChange]
  );

  const handleChange = useCallback(
    (item: SelectItem) => {
      if (!isControlled) {
        setDefaultValue(item);
      }

      onChange(item);
      handleOpen(false);
    },
    [isControlled, onChange, handleOpen]
  );

  const handleHoveredIndexChange = useCallback((index: number) => {
    setHoveredIndex(index);
  }, []);

  const handleButtonElementChange = useCallback(
    (element: HTMLButtonElement | null) => {
      setButtonElement(element);
    },
    []
  );

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
      anchorElement={buttonElement ?? rootElement}
      onButtonElementChange={handleButtonElementChange}
    >
      <div
        className={cx(s.select, themeClassName, className, {
          [s.opened]: isOpen,
        })}
        ref={mergedRef}
      >
        {children}

        {isInvalid && Boolean(invalidDescription) && (
          <Text
            className={s.invalid_description}
            size="m"
            theme={SelectInvalidTextTheme}
          >
            {invalidDescription}
          </Text>
        )}
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
Select.Label = Label;
