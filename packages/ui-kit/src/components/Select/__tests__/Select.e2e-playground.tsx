import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import { SelectButtonLightTheme } from 'src/components/SelectButton';

import { ListTheme } from 'src/components/List';

import {
  Select,
  SelectArrowTheme,
  SelectItemTheme,
  SelectProps,
  SelectRootTheme,
} from '..';
import { SelectItem } from '../Select.types';

export const SelectPlayground = (
  props: ComponentPlaygroundProps<SelectProps>
) => {
  const items: SelectItem[] = [
    { value: 'option1', option: 'Option 1' },
    { value: 'option2', option: 'Option 2' },
    { value: 'option3', option: 'Option 3' },
  ];

  return (
    <ComponentPlayground<SelectProps>
      {...props}
      propSets={[
        {
          children: [
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
            </>,
          ],
          isDisabled: [true, false],
        },

        {
          children: [
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
            </>,
          ],
          isInvalid: [true, false],
        },

        {
          children: [
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
            </>,
          ],
          isDefaultOpen: [false],
        },
        {
          children: [
            <div key={1} style={{ height: '110px' }}>
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
            </div>,
          ],
          isDefaultOpen: [true],
        },

        {
          children: [
            <div key={2} style={{ height: '110px' }}>
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
            </div>,
          ],
          isDefaultOpen: [true],
          defaultValue: [items[0]],
        },
      ]}
    >
      {(itemProps: SelectProps) => (
        <div style={{ margin: '0 20px' }}>
          <Select {...itemProps} theme={SelectRootTheme} />
        </div>
      )}
    </ComponentPlayground>
  );
};
