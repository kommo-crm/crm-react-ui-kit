import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useArgs } from 'storybook/internal/preview-api';

import { CanvasCentered } from '@storybook-utils/constants';
import { Text, TextPrimaryTheme } from 'src/components/Text';
import {
  SelectButtonDarkTheme,
  SelectButtonLightTheme,
  SelectButtonThemeType,
} from 'src/components/SelectButton';

import SettingsIcon from 'src/icons/settings.svg';
import CopyIcon from 'src/icons/copy.svg';
import DeleteIcon from 'src/icons/delete.svg';

import { i18n } from '@i18n';

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
  { value: 'Option 4', option: getOptionLabel(4) },
  { value: 'Option 5', option: getOptionLabel(5) },
  { value: 'Option 6', option: getOptionLabel(6) },
  {
    value: 'Option 7',
    option: i18n.t('Really very long option'),
  },
  { value: 'Option 8', option: getOptionLabel(8) },
  { value: 'Option 9', option: getOptionLabel(9) },
];

type SelectStoryProps = SelectProps & {
  description: string;
  placeholder?: string;
  isInvalid?: boolean;
  selectButtonTheme?: SelectButtonThemeType;
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

    if (!('defaultValue' in props)) {
      setValue(item);
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      {renderTextDescription(description)}

      <Select.Root {...restProps} value={value} onChange={handleChange}>
        <Select.Button
          theme={props.selectButtonTheme || SelectButtonLightTheme}
        >
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

const IconsSelect = (props: SelectStoryProps) => {
  const { description, placeholder, value: valueProp, ...restProps } = props;

  const [value, setValue] = useState<SelectProps['value'] | undefined>(
    valueProp
  );
  const selectedIcon = DefaultSelectItems.find(
    (el) => el.value === value?.value
  )?.icon;

  const handleChange = (item: SelectItem) => {
    props.onChange!(item);

    if (!('defaultValue' in props)) {
      setValue(item);
    }
  };

  return (
    <div>
      {renderTextDescription(description)}

      <Select.Root {...restProps} value={value} onChange={handleChange}>
        <Select.Button
          theme={props.selectButtonTheme || SelectButtonLightTheme}
        >
          <Select.Value placeholder={placeholder}>
            <Select.Icon theme={SelectIconTheme}>{selectedIcon}</Select.Icon>

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
              <Select.Icon theme={SelectIconTheme}>{item.icon}</Select.Icon>

              <Select.Option>{item.option}</Select.Option>
            </Select.Item>
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
  SelectButtonLightTheme,
  SelectItem,
  SelectItemTheme,
  SelectListTheme,
  SelectRootTheme,
} from "@kommo-crm/crm-react-ui-kit/Select";

const DefaultSelectItems = [
  { value: "Option 1", option: "${i18n.t('Option')} 1" },
  { value: "Option 2", option: "${i18n.t('Option')} 2" },
  { value: "Option 3", option: "${i18n.t('Option')} 3" },
  { value: "Option 4", option: "${i18n.t('Option')} 4" },
  { value: "Option 5", option: "${i18n.t('Option')} 5" },
  { value: "Option 6", option: "${i18n.t('Option')} 6" },
  {
    value: "Option 7",
    option:
      ${i18n.t('Really very long option')},
  },
  { value: "Option 8", option: "${i18n.t('Option')} 8" },
  { value: "Option 9", option: "${i18n.t('Option')} 9" },
];

function App() {
  const [value, setValue] = useState<SelectItem>(DefaultSelectItems[0]);

  const handleChange = (item: SelectItem) => {
    setValue(item);
  };

  return (
    <Select.Root theme={SelectRootTheme} value={value} onChange={handleChange}>
      <Select.Button theme={SelectButtonLightTheme}>
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
      <div style={{ width: '100%', marginBottom: '200px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    onChange: action('onChange'),
    isDisabled: false,
    children: null,
    isInvalid: false,
    theme: SelectRootTheme,
    defaultValue: DefaultSelectItems[0],
  },
  component: Select,
  render: (props: Omit<SelectStoryProps, 'description'>) => {
    const { placeholder, ...restProps } = props;
    const [, setArgs] = useArgs();

    const handleChange = (item: SelectItem) => {
      props.onChange!(item);

      if (!('defaultValue' in props)) {
        setArgs({ value: item });
      }
    };

    return (
      <div style={{ width: '100%' }}>
        <Select.Root {...restProps} onChange={handleChange}>
          <Select.Button
            theme={props.selectButtonTheme || SelectButtonLightTheme}
          >
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
  },
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
          value={DefaultSelectItems[0]}
        />
      </div>
    );
  },
};

export const WithIcons: StoryObj = {
  render: (props) => {
    return (
      <div style={{ width: '100%' }}>
        <IconsSelect
          {...props}
          theme={SelectRootTheme}
          description={i18n.t('Custom items with icons')}
          value={DefaultSelectItems[0]}
        />
      </div>
    );
  },
};

export const SelectButtonLight: StoryObj = {
  tags: ['!dev'],
  args: {
    selectButtonTheme: SelectButtonLightTheme,
  },
};

export const SelectButtonDark: StoryObj = {
  tags: ['!dev'],
  args: {
    selectButtonTheme: SelectButtonDarkTheme,
  },
};
