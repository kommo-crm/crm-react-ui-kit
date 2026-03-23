import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import { SelectButtonLightTheme } from 'src/components/SelectButton';

import { ListTheme } from 'src/components/List';

import { Select, SelectArrowTheme, SelectItemTheme, SelectRootTheme } from '..';
import { SelectItem } from '../Select.types';

const items: SelectItem[] = [
  { value: 'option1', option: 'Option 1' },
  { value: 'option2', option: 'Option 2' },
  { value: 'option3', option: 'Option 3' },
];

export interface SelectTestProps {
  isDisabled?: boolean;
  isInvalid?: boolean;
  isDefaultOpen?: boolean;
  defaultValue?: SelectItem;
  useHeightWrapper?: boolean;
}

export const SelectPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<SelectTestProps>) => (
  <ComponentPlayground<SelectTestProps> appearance={appearance} props={props}>
    {({ useHeightWrapper, ...selectProps }) => {
      const content = (
        <>
          <Select.Button theme={SelectButtonLightTheme} key="button">
            <Select.Value placeholder="Select option" />
            <Select.Arrow theme={SelectArrowTheme} />
          </Select.Button>
          <Select.List key="list" theme={ListTheme}>
            {items.map((item, index) => (
              <Select.Item
                theme={SelectItemTheme}
                key={item.value}
                item={item}
                index={index}
              />
            ))}
          </Select.List>
        </>
      );

      return (
        <div style={{ margin: '0 20px' }}>
          <Select {...selectProps} theme={SelectRootTheme}>
            {useHeightWrapper ? (
              <div style={{ height: '110px' }}>{content}</div>
            ) : (
              content
            )}
          </Select>
        </div>
      );
    }}
  </ComponentPlayground>
);
