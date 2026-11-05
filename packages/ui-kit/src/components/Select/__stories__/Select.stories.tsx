import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { CanvasCentered } from '@storybook-utils/constants';
import { i18n } from '@i18n';

import { Text, TextPrimaryTheme } from '@ui-kit/components/Text';
import { SelectButtonTheme } from '@ui-kit/components/SelectButton';

import SettingsIcon from '@ui-kit/icons/settings.svg';
import CopyIcon from '@ui-kit/icons/copy.svg';
import DeleteIcon from '@ui-kit/icons/delete.svg';
import CalendarIcon from '@ui-kit/icons/calendar.svg';
import InfoIcon from '@ui-kit/icons/info.svg';
import SuccessIcon from '@ui-kit/icons/success.svg';
import WarningIcon from '@ui-kit/icons/warning.svg';
import ErrorIcon from '@ui-kit/icons/error.svg';
import CloseIcon from '@ui-kit/icons/close.svg';
import SpinnerIcon from '@ui-kit/icons/spinner.svg';

import { Badge, BadgeSafetyTheme } from '@ui-kit/components/Badge';
import { Input, InputLightTheme } from '@ui-kit/components/Input';
import { Button, ButtonPrimaryTheme } from '@ui-kit/components/Button';

import { Select } from '../Select';
import { SelectItem } from '../Select.types';
import { SelectProps } from '../Select.props';

import {
  SelectArrowTheme,
  SelectItemTheme,
  SelectListTheme,
  SelectIconTheme,
} from '..';
import { SelectRootTheme } from '../Select.theme';

const getOptionLabel = (index: number) => `${i18n.t('Option')} ${index}`;

const DefaultSelectItems = [
  {
    value: 'Option 1',
    option: getOptionLabel(1),
    icon: <SettingsIcon width={20} height={20} />,
  },
  {
    value: 'Option 2',
    option: getOptionLabel(2),
    icon: <CopyIcon width={20} height={20} />,
  },
  {
    value: 'Option 3',
    option: getOptionLabel(3),
    icon: <DeleteIcon width={20} height={20} />,
  },
  {
    value: 'Option 4',
    option: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {getOptionLabel(4)}{' '}
        <Badge theme={BadgeSafetyTheme} style={{ marginLeft: 8 }}>
          Badge
        </Badge>
      </div>
    ),
    title: getOptionLabel(4),
    icon: <CalendarIcon width={20} height={20} />,
  },
  {
    value: 'Option 5',
    option: getOptionLabel(5),
    icon: <InfoIcon width={20} height={20} />,
  },
  {
    value: 'Option 6',
    option: getOptionLabel(6),
    icon: <SuccessIcon width={20} height={20} />,
  },
  {
    value: 'Option 7',
    option: i18n.t('Really very long option'),
    title: i18n.t('Really very long option'),
    icon: <WarningIcon width={20} height={20} />,
  },
  {
    value: 'Option 8',
    option: getOptionLabel(8),
    icon: <ErrorIcon width={20} height={20} />,
  },
  {
    value: 'Option 9',
    option: getOptionLabel(9),
    icon: <CloseIcon width={20} height={20} />,
  },
  {
    value: 'Option 10',
    option: getOptionLabel(10),
    icon: <SpinnerIcon width={20} height={20} />,
  },
];

type SelectStoryProps = SelectProps & {
  description: string;
  placeholder?: string;
  isInvalid?: boolean;
};

const renderTextDescription = (text: string) => {
  return (
    <Text size="l" theme={TextPrimaryTheme}>
      {i18n.t(text)}
    </Text>
  );
};

const SelectWrapper = (props: SelectStoryProps) => {
  const { description, placeholder, value: valueProp, ...restProps } = props;

  const [value, setValue] = useState<SelectProps['value'] | undefined>(
    valueProp
  );

  const handleChange = (item: SelectItem) => {
    props?.onChange!(item);

    setValue(item);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      {renderTextDescription(description)}

      <Select.Root {...restProps} value={value} onChange={handleChange}>
        <Select.Button theme={SelectButtonTheme}>
          <Select.Value placeholder={placeholder} />
          <Select.Arrow theme={SelectArrowTheme} />
        </Select.Button>

        <Select.List theme={SelectListTheme}>
          {DefaultSelectItems.map((item, index) => (
            <Select.Item
              theme={SelectItemTheme}
              key={item.value}
              item={item}
              index={index}
            />
          ))}
        </Select.List>
      </Select.Root>
    </div>
  );
};

type ValueSelectProps = SelectStoryProps & {
  withIcons?: boolean;
  withLabel?: boolean;
};

const ValueSelect = (props: ValueSelectProps) => {
  const {
    description,
    placeholder,
    value: valueProp,
    withIcons = false,
    withLabel = false,
    ...restProps
  } = props;

  const [value, setValue] = useState<SelectProps['value'] | undefined>(
    valueProp
  );
  const selectedIcon = DefaultSelectItems.find(
    (el) => el.value === value?.value
  )?.icon;

  const handleChange = (item: SelectItem) => {
    props.onChange!(item);

    if ('value' in props) {
      setValue(item);
    }
  };

  return (
    <div>
      {renderTextDescription(description)}

      <Select.Root {...restProps} value={value} onChange={handleChange}>
        <Select.Button theme={SelectButtonTheme}>
          <Select.Value placeholder={placeholder}>
            {withLabel && <Select.Label>{i18n.t('Label text')}:</Select.Label>}

            {withIcons && (
              <Select.Icon theme={SelectIconTheme}>{selectedIcon}</Select.Icon>
            )}

            <Select.Option>{value?.option}</Select.Option>
          </Select.Value>

          <Select.Arrow theme={SelectArrowTheme} />
        </Select.Button>

        <Select.List theme={SelectListTheme}>
          {DefaultSelectItems.map((item, index) => (
            <Select.Item
              theme={SelectItemTheme}
              key={item.value}
              item={item}
              index={index}
            >
              {withIcons && (
                <Select.Icon theme={SelectIconTheme}>{item.icon}</Select.Icon>
              )}

              <Select.Option title={item.title}>{item.option}</Select.Option>
            </Select.Item>
          ))}
        </Select.List>
      </Select.Root>
    </div>
  );
};

const createOptionItems = (from: number, count: number): SelectItem[] =>
  Array.from({ length: count }, (_, index) => ({
    value: `Option ${from + index + 1}`,
    option: getOptionLabel(from + index + 1),
  }));

const CUSTOM_OPTION_VALUE = 'custom';

const PresetItems = createOptionItems(0, 5);

type DurationInputProps = {
  value: string;
  unit: string;
  isInvalid?: boolean;
  onChange: (value: string) => void;
};

const DurationInput = (props: DurationInputProps) => {
  const { value, unit, isInvalid, onChange } = props;

  return (
    <div style={{ width: 80 }}>
      <Input
        theme={InputLightTheme}
        value={value}
        inputMode="numeric"
        after={unit}
        isInvalid={isInvalid}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

const isDuration = (value: string) => /^\d+$/.test(value);

const CustomOptionSelect = (props: Omit<SelectStoryProps, 'description'>) => {
  const [value, setValue] = useState<SelectItem>(PresetItems[0]);
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('0');

  const customItem: SelectItem = {
    value: CUSTOM_OPTION_VALUE,
    option: `${hours} h ${minutes} min`,
  };

  const handleChange = (item: SelectItem) => {
    props.onChange?.(item);

    setValue(item);
  };

  /**
   * The custom value is selected right when it is typed in.
   */
  const handleDurationChange = (nextHours: string, nextMinutes: string) => {
    setHours(nextHours);
    setMinutes(nextMinutes);

    handleChange({
      value: CUSTOM_OPTION_VALUE,
      option: `${nextHours} h ${nextMinutes} min`,
    });
  };

  return (
    <Select.Root {...props} value={value} onChange={handleChange}>
      <Select.Button theme={SelectButtonTheme}>
        <Select.Value />

        <Select.Arrow theme={SelectArrowTheme} />
      </Select.Button>

      <Select.List theme={SelectListTheme}>
        {[
          ...PresetItems.map((item, index) => (
            <Select.Item
              theme={SelectItemTheme}
              key={item.value}
              item={item}
              index={index}
            />
          )),
          <Select.Item
            theme={SelectItemTheme}
            key={CUSTOM_OPTION_VALUE}
            item={customItem}
            index={PresetItems.length}
            isInteractive
          >
            <Select.Option>{i18n.t('Option')}</Select.Option>

            <div style={{ display: 'flex', gap: 6, marginLeft: 8 }}>
              <DurationInput
                value={hours}
                unit="h"
                onChange={(nextHours) =>
                  handleDurationChange(nextHours, minutes)
                }
              />

              <DurationInput
                value={minutes}
                unit="min"
                onChange={(nextMinutes) =>
                  handleDurationChange(hours, nextMinutes)
                }
              />
            </div>
          </Select.Item>,
        ]}
      </Select.List>
    </Select.Root>
  );
};

const CustomOptionConfirmSelect = (
  props: Omit<SelectStoryProps, 'description'>
) => {
  const [value, setValue] = useState<SelectItem>(PresetItems[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('0');
  const [isConfirmTried, setIsConfirmTried] = useState(false);

  const customItem: SelectItem = {
    value: CUSTOM_OPTION_VALUE,
    option: `${hours} h ${minutes} min`,
  };

  const handleChange = (item: SelectItem) => {
    props.onChange?.(item);

    setValue(item);
  };

  /**
   * The custom value is taken by the OK button only, once it is valid.
   */
  const handleConfirm = () => {
    setIsConfirmTried(true);

    if (!isDuration(hours) || !isDuration(minutes)) {
      return;
    }

    handleChange(customItem);
    setIsOpen(false);
  };

  return (
    <Select.Root
      {...props}
      value={value}
      onChange={handleChange}
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <Select.Button theme={SelectButtonTheme}>
        <Select.Value />

        <Select.Arrow theme={SelectArrowTheme} />
      </Select.Button>

      <Select.List theme={SelectListTheme}>
        {[
          ...PresetItems.map((item, index) => (
            <Select.Item
              theme={SelectItemTheme}
              key={item.value}
              item={item}
              index={index}
            />
          )),
          <Select.Item
            theme={SelectItemTheme}
            key={CUSTOM_OPTION_VALUE}
            item={customItem}
            index={PresetItems.length}
            isInteractive
            onSelect={(e) => e.preventDefault()}
          >
            <Select.Option>{i18n.t('Option')}</Select.Option>

            <div style={{ display: 'flex', gap: 6, marginLeft: 8 }}>
              <DurationInput
                value={hours}
                unit="h"
                isInvalid={isConfirmTried && !isDuration(hours)}
                onChange={(nextHours) => setHours(nextHours)}
              />

              <DurationInput
                value={minutes}
                unit="min"
                isInvalid={isConfirmTried && !isDuration(minutes)}
                onChange={(nextMinutes) => setMinutes(nextMinutes)}
              />

              <Button theme={ButtonPrimaryTheme} onClick={handleConfirm}>
                OK
              </Button>
            </div>
          </Select.Item>,
        ]}
      </Select.List>
    </Select.Root>
  );
};

const LOADING_PORTION_SIZE = 20;
const LOADING_TOTAL_COUNT = 100;
const LOADING_DELAY = 1000;

const LoadingSelect = (props: Omit<SelectStoryProps, 'description'>) => {
  const [items, setItems] = useState(() =>
    createOptionItems(0, LOADING_PORTION_SIZE)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState<SelectItem>();

  const handleChange = (item: SelectItem) => {
    props.onChange?.(item);

    setValue(item);
  };

  const handleScrollEnd = () => {
    if (items.length >= LOADING_TOTAL_COUNT) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setItems((prevItems) => [
        ...prevItems,
        ...createOptionItems(prevItems.length, LOADING_PORTION_SIZE),
      ]);
      setIsLoading(false);
    }, LOADING_DELAY);
  };

  return (
    <Select.Root {...props} value={value} onChange={handleChange}>
      <Select.Button theme={SelectButtonTheme}>
        <Select.Value placeholder="Placeholder" />

        <Select.Arrow theme={SelectArrowTheme} />
      </Select.Button>

      <Select.List
        theme={SelectListTheme}
        isLoading={isLoading}
        onScrollEnd={handleScrollEnd}
      >
        {items.map((item, index) => (
          <Select.Item
            theme={SelectItemTheme}
            key={item.value}
            item={item}
            index={index}
          />
        ))}
      </Select.List>
    </Select.Root>
  );
};

type BaseSelectProps = Omit<SelectStoryProps, 'description'> & {
  width?: React.CSSProperties['width'];
};

const BaseSelect = (props: BaseSelectProps) => {
  const { placeholder, value: valueProp, width = '100%', ...restProps } = props;

  const isControlled = 'value' in props;

  const [value, setValue] = useState<SelectProps['value'] | undefined>(
    valueProp
  );

  const handleChange = (item: SelectItem) => {
    props.onChange?.(item);

    if (isControlled) {
      setValue(item);
    }
  };

  const controlledProps = isControlled ? { value } : {};

  return (
    <div style={{ width }}>
      <Select.Root {...restProps} {...controlledProps} onChange={handleChange}>
        <Select.Button theme={SelectButtonTheme}>
          <Select.Value placeholder={placeholder} />
          <Select.Arrow theme={SelectArrowTheme} />
        </Select.Button>

        <Select.List theme={SelectListTheme}>
          {DefaultSelectItems.map((item, index) => (
            <Select.Item
              theme={SelectItemTheme}
              key={item.value}
              item={item}
              index={index}
            />
          ))}
        </Select.List>
      </Select.Root>
    </div>
  );
};

const USAGE = `
import { useState } from "react";
import {
  Select,
  SelectArrowTheme,
  SelectButtonTheme,
  SelectItem,
  SelectItemTheme,
  SelectListTheme,
  SelectRootTheme,
} from "@kommo-crm/crm-react-ui-kit/Select";

const DefaultSelectItems = [
  { value: "Option 1", option: "${i18n.t('Option')} 1" },
  { value: "Option 2", option: "${i18n.t('Option')} 2" },
  { value: "Option 3", option: "${i18n.t('Option')} 3" },
  {
    value: 'Option 4',
    option: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        ${i18n.t('Option')} 4{' '}
        <Badge
          theme={BadgeSafetyTheme}
          style={{ marginLeft: 8 }}
        >
          Badge
        </Badge>
      </div>
    ),
    title: ${i18n.t('Option')} 4,
  },
  { value: "Option 5", option: "${i18n.t('Option')} 5" },
  { value: "Option 6", option: "${i18n.t('Option')} 6" },
  {
    value: "Option 7",
    option:
      ${i18n.t('Really very long option')},
    title:
      ${i18n.t('Really very long option')},
  },
  { value: "Option 8", option: "${i18n.t('Option')} 8" },
  { value: "Option 9", option: "${i18n.t('Option')} 9" },
  { value: "Option 10", option: "${i18n.t('Option')} 10" },
];

function App() {
  const [value, setValue] = useState<SelectItem>(DefaultSelectItems[0]);

  const handleChange = (item: SelectItem) => {
    setValue(item);
  };

  return (
    <Select.Root theme={SelectRootTheme} value={value} onChange={handleChange}>
      <Select.Button theme={SelectButtonTheme}>
        <Select.Value placeholder="Placeholder" />
        <Select.Arrow theme={SelectArrowTheme} />
      </Select.Button>

      <Select.List theme={SelectListTheme}>
        {DefaultSelectItems.map((item, index) => (
          <Select.Item
            theme={SelectItemTheme}
            key={item.value}
            item={item}
            index={index}
          />
        ))}
      </Select.List>
    </Select.Root>
  );
}
`;

const meta = {
  title: 'Components/Select',
  parameters: {
    ...CanvasCentered,
    docs: {
      source: {
        code: USAGE,
        language: 'jsx',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', marginBottom: '264px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    theme: SelectRootTheme,
    isInvalid: false,
    invalidDescription: '',
    isDisabled: false,
    onChange: action('onChange'),
    children: null,
  },
  component: Select,
  render: (props: Omit<SelectStoryProps, 'description'>) => (
    <BaseSelect {...props} />
  ),
} satisfies Meta<typeof Select>;

export default meta;

type SelectStory = StoryObj<Omit<SelectStoryProps, 'description'>>;

export const Default: SelectStory = {
  args: {
    value: DefaultSelectItems[0],
  },
};

export const Uncontrolled: SelectStory = {
  args: {
    defaultValue: DefaultSelectItems[0],
  },
};

export const States: StoryObj = {
  render: (props) => {
    return (
      <div style={{ width: '100%' }}>
        <SelectWrapper
          {...props}
          theme={SelectRootTheme}
          description="Disabled"
          isDisabled={true}
          value={DefaultSelectItems[0]}
        />

        <SelectWrapper
          {...props}
          theme={SelectRootTheme}
          description="With preselected item"
          placeholder="Select with Initial Value"
          value={DefaultSelectItems[2]}
        />

        <SelectWrapper
          {...props}
          theme={SelectRootTheme}
          description="With Placeholder"
          placeholder="Placeholder"
        />

        <SelectWrapper
          {...props}
          theme={SelectRootTheme}
          description="Invalid"
          isInvalid={true}
          invalidDescription={i18n.t('Required field')}
          value={DefaultSelectItems[0]}
        />
      </div>
    );
  },
};

export const Value: StoryObj = {
  render: (props) => {
    return (
      <div style={{ width: '100%' }}>
        <div style={{ marginBottom: '20px' }}>
          <ValueSelect
            {...props}
            theme={SelectRootTheme}
            description="Select.Icon"
            value={DefaultSelectItems[0]}
            withIcons
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <ValueSelect
            {...props}
            theme={SelectRootTheme}
            description="Select.Label"
            value={DefaultSelectItems[0]}
            withLabel
          />
        </div>

        <ValueSelect
          {...props}
          theme={SelectRootTheme}
          description="Select.Label + Select.Icon"
          value={DefaultSelectItems[0]}
          withLabel
          withIcons
        />
      </div>
    );
  },
};

export const CustomOption: StoryObj = {
  render: (props) => <CustomOptionSelect {...props} theme={SelectRootTheme} />,
};

export const CustomOptionConfirm: StoryObj = {
  render: (props) => (
    <CustomOptionConfirmSelect {...props} theme={SelectRootTheme} />
  ),
};

export const Loading: StoryObj = {
  render: (props) => <LoadingSelect {...props} theme={SelectRootTheme} />,
};

export const Directions: StoryObj = {
  render: (props) => (
    <div
      style={{
        position: 'relative',
        boxSizing: 'border-box',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <div style={{ position: 'absolute', top: 24, left: 24 }}>
        <BaseSelect
          {...props}
          width={240}
          theme={SelectRootTheme}
          value={DefaultSelectItems[0]}
        />
      </div>

      <div style={{ position: 'absolute', right: 24, bottom: 24 }}>
        <BaseSelect
          {...props}
          width={240}
          theme={SelectRootTheme}
          value={DefaultSelectItems[0]}
        />
      </div>
    </div>
  ),
};
